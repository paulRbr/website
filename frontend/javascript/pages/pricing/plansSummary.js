import {
  init as initSlidingButtons,
  setCurrentButton,
} from "../../slidingButtons";
import { initCarousel } from "../../carousel";
import { enableSection } from "../../screenReaderUtils";

export const init = () => {
  const plansSummary = document.querySelector(".js-plansSummary");
  const plansSummaryButtons = plansSummary.querySelector(
    "[data-sliding-buttons]"
  );
  const plansSummaryCarousel = document.querySelector(
    ".js-plansSummary-carousel"
  );

  /*
    mobile plans summary:
    - use a carousel to have the sliding effect between plans, but dont let user interact too much with it
    - sync buttons with the carousel
    - on desktop, make sure the carousel stuff doesn't interfere with the desktop layout that doesn't use it
  */
  const carousel = initCarousel(plansSummaryCarousel, {
    controlled: true,
    screenReaderMode: "current",
    onSlideChange: (_, index) => {
      setCurrentButton(
        plansSummaryButtons.querySelector(`button[data-index="${index}"]`),
        plansSummaryButtons
      );
    },
  });

  initSlidingButtons(plansSummaryButtons, {
    onClick: (_, index) => {
      carousel.goToSlide(index);
    },
  });

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
    enableSection(plansSummary);
  }
  isLargeScreen.addEventListener("change", (e) => {
    if (e.matches) {
      enableSection(plansSummary);
    } else {
      carousel.goToSlide(
        Number(plansSummaryCarousel.getAttribute("data-current-slide"))
      );
    }
  });
};
