const fixOnScroll = () => {
  const headerOriginalPosition = document.querySelector(
    ".js-headerPositionTracker"
  );
  const header = document.querySelector(".js-header");

  const headerPositionObs = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      const fixedMenu = !entry.isIntersecting;

      if (fixedMenu) {
        header
          .querySelector(".js-headerContent")
          .setAttribute("data-fixed", fixedMenu);
      } else {
        header.querySelector(".js-headerContent").removeAttribute("data-fixed");
      }
    },
    { threshold: 1 }
  );

  if (headerOriginalPosition) {
    headerPositionObs.observe(headerOriginalPosition);
  }
};

export const init = () => {
  fixOnScroll();
};
