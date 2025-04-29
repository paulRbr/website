import { initCarousel } from "../../carousel";
import { enableSectionForScreenReaders } from "../../screenReaderUtils";

export const init = () => {
  /*
    mobile plans summary:
    - use a carousel to have the sliding effect between plans, but dont let user interact too much with it
    - the carousel auto-detects our sliding buttons and syncs buttons with the carousel
    - on desktop, make sure the carousel stuff doesn't interfere with the desktop layout that doesn't use it
  */
  const carousel = initCarousel("carousel-plans-summary", {
    controlled: true,
    screenReaderMode: "current",
  });

  // we use the same markup for mobile and desktop, but the carousel is only enabled on mobile
  // that means we need to handle by hand when we switch from mobile to desktop
  const plansSummary = document.querySelector(".js-plansSummary");
  const plansSummaryCarousel = document.getElementById(
    "carousel-plans-summary"
  );
  const isLargeScreen = window.matchMedia("(min-width: 62em)");
  window.addEventListener("resize", () => {
    if (isLargeScreen.matches) {
      return;
    }
    carousel.goToSlide(
      Number(plansSummaryCarousel.getAttribute("data-current-slide"))
    );
  });

  if (isLargeScreen.matches) {
    enableSectionForScreenReaders(plansSummary);
  }
  isLargeScreen.addEventListener("change", (e) => {
    if (e.matches) {
      enableSectionForScreenReaders(plansSummary);
    } else {
      carousel.goToSlide(
        Number(plansSummaryCarousel.getAttribute("data-current-slide"))
      );
    }
  });
};
