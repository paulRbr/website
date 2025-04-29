import {
  initSlidingButtons,
  getSlidingButtons,
  setCurrentButton,
} from "./slidingButtons";

/**
 * an "images fade show" (great name coined by me)
 *
 * is kind-of a carousel, except:
 *   - items are only decorative images,
 *   - the images transition with a fadein/out effect,
 *
 * it's used on the homepage hero and on the about pages.
 */
export const initImagesFadeshow = (containerId, { onChange = null } = {}) => {
  const container = document.getElementById(containerId);
  handleNavClicks(container, { onChange });
  handleSlidingButtonsClicks(container, { onChange });
};

const handleNavClicks = (container, { onChange }) => {
  const navContainer = document.querySelector(
    `.items-nav[data-items-id="${container.id}"]`
  );
  if (!navContainer) {
    return;
  }

  navContainer
    .querySelector("[data-prev-button]")
    .addEventListener("click", () => {
      const image = showSiblingImage(container, -1);
      onChange?.({ direction: "prev", image });
    });

  navContainer
    .querySelector("[data-next-button]")
    .addEventListener("click", () => {
      const image = showSiblingImage(container, 1);
      onChange?.({ direction: "next", image });
    });
};

const handleSlidingButtonsClicks = (container, options) => {
  const slidingButtonsContainer = getSlidingButtons(container);
  if (!slidingButtonsContainer) {
    return;
  }
  initSlidingButtons(slidingButtonsContainer, {
    onClick: (button, index) => {
      showImage(container, index);
    },
  });
};

const updateSlidingButtons = (container, index) => {
  const slidingButtonsContainer = getSlidingButtons(container);
  if (slidingButtonsContainer) {
    setCurrentButton(
      slidingButtonsContainer.querySelector(`button[data-index="${index}"]`),
      slidingButtonsContainer
    );
  }
};

const showSiblingImage = (container, direction) => {
  const images = getImages(container);
  const currentIndex = getCurrentIndex(container);
  const targetIndex =
    (currentIndex + direction + images.length) % images.length;
  return showImage(container, targetIndex);
};

const showImage = (container, targetIndex) => {
  const currentImage = container.querySelector('[data-current-image="true"]');
  const targetImage = container.querySelector(
    `[data-image-index="${targetIndex}"]`
  );

  currentImage.removeAttribute("data-current-image");
  targetImage.setAttribute("data-current-image", "true");
  currentImage.setAttribute("aria-hidden", "true");
  targetImage.removeAttribute("aria-hidden");
  container.setAttribute("data-current-index", targetIndex);
  updateSlidingButtons(container, targetIndex);
  return {
    index: targetIndex,
    image: targetImage,
  };
};

const getImages = (container) => {
  return container.querySelectorAll("[data-image-index]");
};

const getCurrentIndex = (container) => {
  return Number(container.getAttribute("data-current-index"));
};
