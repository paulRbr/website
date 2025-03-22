export const headerScroll = () => {
  const headerOriginalPosition = document.querySelector(
    ".js-header-position-tracker"
  );
  const header = document.querySelector(".js-header");

  const headerPositionObs = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      const fixedMenu = !entry.isIntersecting;

      if (fixedMenu) {
        header.setAttribute("data-fixed", fixedMenu);
      } else {
        header.removeAttribute("data-fixed");
      }
      document.body.classList.toggle("body--withFixedHeader", fixedMenu);
    },
    { threshold: 1 }
  );

  if (headerOriginalPosition) {
    headerPositionObs.observe(headerOriginalPosition);
  }
};
