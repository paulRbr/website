import { init as initSlidingButtons } from "../../slidingButtons";

export const init = () => {
  document.querySelectorAll(".js-heroScreenshots").forEach((container) => {
    initSlidingButtons(container.querySelector("[data-sliding-buttons]"), {
      onClick: (button) => {
        showButtonScreenshot(button);
      },
    });
  });
};

const showButtonScreenshot = (button) => {
  const container = getContainer(button);
  if (!container) {
    return;
  }
  const index = button.getAttribute("data-index");

  const currentImage = container.querySelector('img[data-current="true"]');
  const targetImage = container.querySelector(`img[data-index="${index}"]`);

  if (currentImage === targetImage) {
    return;
  }

  currentImage.removeAttribute("data-current");
  currentImage.setAttribute("aria-hidden", "true");
  targetImage.setAttribute("data-current", "true");
  targetImage.removeAttribute("aria-hidden");
};

const getContainer = (el) => {
  return el.closest(".js-heroScreenshots");
};
