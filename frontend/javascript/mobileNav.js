export const init = () => {
  burger();
  navDropdowns();
};

const burger = () => {
  const toggle = document.querySelector(".js-mobileNavBurger");
  if (!toggle) {
    return;
  }
  const closeOnBlur = (event) => {
    if (!event.target.closest(".js-header")) {
      close();
    }
  };

  const open = () => {
    toggleBackdrop(true);
    /* timeout a tiny bit to let the browser time to maybe show its own navbar, reducing the actual height we'll want to take */
    setTimeout(() => {
      updateNavHeight();
      updateNavPosition();
    }, 100);
    document.addEventListener("focusin", closeOnBlur);
    openSlideDown(toggle, "header");
  };
  const close = () => {
    toggleBackdrop(false);
    document.removeEventListener("focusin", closeOnBlur);
    closeSlideUp(toggle, "header");
    closeAllDropdowns();
  };

  toggle.addEventListener("click", () => {
    if (toggle.getAttribute("aria-expanded") === "true") {
      close();
    } else {
      open();
    }
  });

  document
    .querySelector(".js-headerMobileBlurBackdrop")
    ?.addEventListener("click", () => close());
};

const navDropdowns = () => {
  const toggles = document.querySelectorAll(".js-mobileNav .js-navToggle");

  toggles.forEach((toggle) => {
    initToggle(toggle, "nav_item");
  });
};

const closeAllDropdowns = () => {
  const toggles = document.querySelectorAll(".js-mobileNav .js-navToggle");
  toggles.forEach((toggle) => {
    closeSlideUp(toggle, "nav_item");
  });
};

const toggleBackdrop = (open) => {
  if (open) {
    document
      .querySelector(".js-headerMobileBlurBackdrop")
      .setAttribute("data-open", open);
  } else {
    document
      .querySelector(".js-headerMobileBlurBackdrop")
      .removeAttribute("data-open");
  }
  document.body.classList[open ? "add" : "remove"]("overflow-hidden");
};

const updateNavHeight = () => {
  const header = document.querySelector(".js-headerContent");
  const nav = document.querySelector(".js-mobileNav").querySelector("ul");
  if (!header || !nav) {
    return;
  }
  const isMobile = document.documentElement.classList.contains("is-mobile");
  if (!isMobile) {
    return;
  }
  const headerRect = header.getBoundingClientRect();
  const yStart = headerRect.top + headerRect.height;
  const yEnd = window.innerHeight - 16;
  // remove extra space, meaning currently the login button and the hr. Magic numbers are magic
  const navBottomSibling = 60;
  nav.style.height = `${yEnd - yStart - navBottomSibling}px`;
};

const updateNavPosition = () => {
  const isFixed =
    document.querySelector(".js-headerContent").getAttribute("data-fixed") ===
    "true";
  const nav = document.querySelector(".js-mobileNav");
  if (!nav) {
    return;
  }
  if (isFixed) {
    nav.setAttribute("data-fixed", "true");
  } else {
    nav.removeAttribute("data-fixed");
  }
};

// In case you want to reuse this behavior, these dropdown toggles require a bunch of specific css classes and html attributes to work:
// - a parent item having a `group/xxx` class (like `group/nav_item`)
// - on the toggle button: `peer` class + aria-controls attribute + aria-expanded attribute
// - on the content right next to it: `transition-all duration-300 hidden grid-rows-[0fr] data-closing:grid-rows-[0fr] peer-aria-expanded:grid data-opening:grid-rows-[1fr]`
//   and a class matching the group name like that: group-data-open/nav_item:grid-rows-[1fr]
// - the content wraps an inner element having a `overflow-hidden` class
//
// This certainly can be simplified and improved. For now: it's rush mode and current situation is considered acceptable. By me. Sorry.
const initToggle = (toggle, group, options = {}) => {
  toggle.addEventListener("click", () => {
    if (toggle.getAttribute("aria-expanded") === "true") {
      options.onClose?.();
      closeSlideUp(toggle, group);
    } else {
      options.onOpen?.();
      openSlideDown(toggle, group);
    }
  });
};

const closeSlideUp = (toggle, groupSelector) => {
  const content = document.getElementById(toggle.getAttribute("aria-controls"));
  const group = toggle.closest(`.group\\/${groupSelector}`);
  content.addEventListener(
    "transitionend",
    () => {
      content.removeAttribute("data-closing");
      group.removeAttribute("data-open");
      toggle.setAttribute("aria-expanded", "false");
    },
    { once: true }
  );
  content.setAttribute("data-closing", "true");
};

const openSlideDown = (toggle, groupSelector) => {
  const content = document.getElementById(toggle.getAttribute("aria-controls"));
  const group = toggle.closest(`.group\\/${groupSelector}`);
  content.addEventListener(
    "transitionend",
    () => {
      content.removeAttribute("data-opening");
      group.removeAttribute("data-opening");
      group.setAttribute("data-open", "true");
    },
    { once: true }
  );
  // this triggers the removal of "hidden" class, but the menu is still at height 0
  group.setAttribute("data-opening", "true");
  toggle.setAttribute("aria-expanded", "true");
  // delay the opening state after the removal of "hidden" class, to ensure there is a transition effect
  setTimeout(() => {
    content.setAttribute("data-opening", "true");
  }, 20);
};
