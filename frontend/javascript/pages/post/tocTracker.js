export const init = () => {
  document.querySelectorAll(".js-toc").forEach((container) => {
    initToc(container);
  });
};

export const initToc = (container) => {
  const tocLinks = container.querySelectorAll(".js-tocItem");
  if (!tocLinks.length) {
    return;
  }

  const headings = document.querySelectorAll(
    ".cms :where(h1, h2, h3, h4, h5, h6)"
  );
  if (!headings.length) {
    return;
  }

  const tocMap = {};
  tocLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      tocMap[href.slice(1)] = link;
    }
  });

  const clearCurrent = () => {
    tocLinks.forEach((link) => link.removeAttribute("data-current"));
  };

  const setCurrent = (id) => {
    clearCurrent();
    if (tocMap[id]) {
      tocMap[id].setAttribute("data-current", "true");
    }
  };

  const updateCurrentTocItem = () => {
    let found = false;
    headings.forEach((heading) => {
      const rect = heading.getBoundingClientRect();
      if (!found && rect.top > 86) {
        found = heading;
      }
    });
    if (found) {
      const id = found.id;
      setCurrent(id);
    }
  };

  window.addEventListener("scroll", () => {
    updateCurrentTocItem();
  });
  updateCurrentTocItem();
};
