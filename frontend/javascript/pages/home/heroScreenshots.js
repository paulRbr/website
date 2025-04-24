export const init = () => {
  document.querySelectorAll(".js-heroScreenshots").forEach((container) => {
    const firstButton = container.querySelector('button[data-current="true"]');
    if (firstButton) {
      slideBackgroundTo(firstButton, container);
    }

    container.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-index]");
      if (!button) {
        return;
      }
      showButtonScreenshot(button);
    });

    window.addEventListener("resize", () => {
      const currentButton = container.querySelector(
        'button[data-current="true"]'
      );
      if (currentButton) {
        slideBackgroundTo(currentButton, container);
      }
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

  const currentButton = container.querySelector('button[data-current="true"]');
  const targetButton = container.querySelector(`button[data-index="${index}"]`);

  slideBackgroundTo(targetButton, container);
  currentButton.removeAttribute("data-current");
  targetButton.setAttribute("data-current", "true");

  currentImage.removeAttribute("data-current");
  currentImage.setAttribute("aria-hidden", "true");
  targetImage.setAttribute("data-current", "true");
  targetImage.removeAttribute("aria-hidden");
};

const slideBackgroundTo = (button, container) => {
  const slidingBackground = container.querySelector(
    ".js-heroScreenshots-slidingBackground"
  );
  if (!slidingBackground) {
    return;
  }
  slidingBackground.style.left = `${button.offsetLeft}px`;
  slidingBackground.style.top = `${button.offsetTop}px`;
  slidingBackground.style.width = `${button.offsetWidth}px`;
  slidingBackground.style.height = `${button.offsetHeight}px`;
};

const getContainer = (el) => {
  return el.closest(".js-heroScreenshots");
};
