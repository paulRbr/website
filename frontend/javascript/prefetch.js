export const init = () => {
  const prefetchedUrls = new Set();
  const listenedAnchors = new WeakSet();
  const isSlowConnection = () => {
    if ("connection" in navigator) {
      // Untyped Chrome-only feature: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/connection
      const conn = navigator.connection;
      return conn.saveData || /2g/.test(conn.effectiveType);
    }
    return false;
  };
  const canPrefetchUrl = (url, ignoreSlowConnection) => {
    // Skip prefetch if offline
    if (!navigator.onLine) return false;
    // Skip prefetch if using data saver mode or slow connection
    if (!ignoreSlowConnection && isSlowConnection()) return false;
    // Else check if URL is within the same origin, not the current page, and not already prefetched
    try {
      const urlObj = new URL(url, location.href);
      return (
        location.origin === urlObj.origin &&
        (location.pathname !== urlObj.pathname ||
          location.search !== urlObj.search) &&
        !prefetchedUrls.has(url)
      );
    } catch {}
    return false;
  };
  const prefetch = (url, opts) => {
    // Remove url hash to avoid prefetching the same URL multiple times
    url = url.replace(/#.*/, "");

    const ignoreSlowConnection = opts?.ignoreSlowConnection ?? false;
    if (!canPrefetchUrl(url, ignoreSlowConnection)) return;
    prefetchedUrls.add(url);

    // Prefetch with link if supported
    if (
      document.createElement("link").relList?.supports?.("prefetch") &&
      opts?.with !== "fetch"
    ) {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.setAttribute("href", url);
      document.head.append(link);
    }
    // Otherwise, fallback prefetch with fetch
    else {
      fetch(url, { priority: "low" });
    }
  };

  function elMatchesStrategy(el, strategy) {
    if (el?.tagName !== "A") return false;
    const attrValue = el.dataset.prefetch;

    // Else if dataset is explicitly defined, check against it
    if (attrValue === strategy) {
      return true;
    }
    // Else, no match
    return false;
  }

  function initHoverStrategy() {
    let timeout;
    document.body.addEventListener(
      "focusin",
      (e) => {
        if (elMatchesStrategy(e.target, "hover")) {
          handleHoverIn(e);
        }
      },
      { passive: true }
    );
    document.body.addEventListener("focusout", handleHoverOut, {
      passive: true,
    });

    // Handle hover listeners. Re-run each time on page load.
    for (const anchor of document.getElementsByTagName("a")) {
      // Skip if already listening
      if (listenedAnchors.has(anchor)) continue;
      // Add listeners for anchors matching the strategy
      if (elMatchesStrategy(anchor, "hover")) {
        listenedAnchors.add(anchor);
        anchor.addEventListener("mouseenter", handleHoverIn, { passive: true });
        anchor.addEventListener("mouseleave", handleHoverOut, {
          passive: true,
        });
      }
    }

    function handleHoverIn(e) {
      const href = e.target.href;

      // Debounce hover prefetches by 80ms
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        prefetch(href);
      }, 80);
    }

    // Cancel prefetch if the user hovers away
    function handleHoverOut() {
      if (timeout) {
        clearTimeout(timeout);
        timeout = 0;
      }
    }
  }

  initHoverStrategy();
};
