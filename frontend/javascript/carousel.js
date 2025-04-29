import {
  enableSectionForScreenReaders,
  disableSectionForScreenReaders,
} from "./screenReaderUtils";
import {
  initSlidingButtons,
  getSlidingButtons,
  setCurrentButton,
} from "./slidingButtons";

/**
 * Initialize a very simple carousel
 *
 * By default, user can touch-grab and swipe to change slides,
 * current slide changes when tabbing to focusable items in next/prev slides,
 * and user can click on the next/prev buttons to change slides.
 *
 * By default, all slides are exposed to screen reader users linearly.
 *
 * @param {HTMLElement} carousel
 * @param {Object} options
 * @param {boolean} options.controlled - (default false) if true, you must manually call goToSlide to change slides (no user touch-grab, no tab-to-focus, etc.). (in that case you might need to handle window resize yourself depending on your carousel layout)
 * @param {boolean} options.screenReaderMode - (default 'all') if 'all', all slides are exposed to screen reader users linearly. If 'current', only the current slide is exposed.
 * @param {Function} options.onSlideChange - a function that will be called when the slide changes with the slide dom el and its index as arguments
 * @returns an object with a goToSlide function tied to the initialized carousel and a reset function to disable all carousel behavior
 */
export const initCarousel = (carouselId, options = {}) => {
  const carousel = document.getElementById(carouselId);
  if (!carousel) {
    return;
  }

  carousel.setAttribute("data-carousel", "");
  const slides = getSlides(carousel);

  handleNavigationClicks(carousel, options);
  handleSlidingButtonsClicks(carousel, options);
  handleSlideClicks(carousel, options);
  handleFocusInSlides(carousel, options);
  handleWindowResize(carousel, options);
  handleTouchEvents(carousel, options);

  if (carousel.querySelector("[data-current-slide]") === null) {
    goToSlide(carousel, Math.floor(slides.length / 2), {
      animate: false,
      ...options,
    });
  } else {
    goToSlide(
      carousel,
      slides.indexOf(carousel.querySelector("[data-current-slide]")),
      { animate: false, ...options }
    );
  }

  carousel.setAttribute("data-initialized", "true");

  const originalGoToSlide = goToSlide;
  return {
    goToSlide: (index, newOptions) => {
      originalGoToSlide(carousel, index, { ...options, ...newOptions });
    },
  };
};

export const goToSlide = (
  carousel,
  targetIndex,
  { animate = true, ...options } = {}
) => {
  const track = getTrack(carousel);
  const slides = getSlides(track);
  const slideWidth = slides[0].offsetWidth;
  const viewportWidth = carousel.offsetWidth;

  const centerOffset = (viewportWidth - slideWidth) / 2;
  const position = -targetIndex * slideWidth + centerOffset;
  if (!animate) {
    disableAnimation(track);
  }
  track.style.transform = `translateX(${position}px)`;
  carousel.setAttribute("data-current-slide", targetIndex);
  if (!animate) {
    // re-enable animation just a few ms after to prevent browser from doing it all together and animating anyway
    setTimeout(() => {
      enableAnimation(track);
    }, 100);
  }
  slides.forEach((slide, index) => {
    if (Number(index) === Number(targetIndex)) {
      enableSlide(slide, index, { ...options, animate });
    } else {
      disableSlide(slide, index, options);
    }
  });
};

const enableSlide = (
  slide,
  index,
  { onSlideChange, screenReaderMode, animate }
) => {
  slide.removeAttribute("aria-hidden");
  slide.setAttribute("data-current-slide", "true");
  onSlideChange?.(slide, index);
  updateSlidingButtons(slide.closest("[data-carousel]"), index, { animate });
  if (screenReaderMode === "current") {
    enableSectionForScreenReaders(slide);
  }
};

const disableSlide = (slide, index, { screenReaderMode }) => {
  slide.removeAttribute("data-current-slide");
  if (screenReaderMode === "current") {
    disableSectionForScreenReaders(slide);
  }
};

const handleNavigationClicks = (carousel, options) => {
  const slides = getSlides(carousel);
  const navContainer = document.querySelector(
    `.items-nav[data-items-id="${carousel.id}"]`
  );
  if (!navContainer) {
    return;
  }
  navContainer
    .querySelector("[data-prev-button]")
    ?.addEventListener("click", () => {
      goToSlide(
        carousel,
        (Number(carousel.getAttribute("data-current-slide")) -
          1 +
          slides.length) %
          slides.length,
        options
      );
    });

  navContainer
    .querySelector("[data-next-button]")
    ?.addEventListener("click", () => {
      goToSlide(
        carousel,
        (Number(carousel.getAttribute("data-current-slide")) + 1) %
          slides.length,
        options
      );
    });
};

const handleSlidingButtonsClicks = (carousel, options) => {
  const slidingButtonsContainer = getSlidingButtons(carousel);
  if (slidingButtonsContainer) {
    initSlidingButtons(slidingButtonsContainer, {
      onClick: (button, index) => {
        goToSlide(carousel, index, options);
      },
    });
  }
};

const updateSlidingButtons = (carousel, index, { animate }) => {
  const slidingButtonsContainer = getSlidingButtons(carousel);
  if (slidingButtonsContainer) {
    setCurrentButton(
      slidingButtonsContainer.querySelector(`button[data-index="${index}"]`),
      slidingButtonsContainer,
      { animate }
    );
  }
};

/**
 * When clicking a slide that is not the current one, go to it
 */
const handleSlideClicks = (carousel, options) => {
  if (options.controlled) {
    return;
  }
  const slides = getSlides(carousel);
  slides.forEach((slide, index) => {
    slide.addEventListener("click", (event) => {
      const currentIndex = Number(carousel.getAttribute("data-current-slide"));
      if (currentIndex !== index) {
        event.preventDefault();
        goToSlide(carousel, index, options);
      }
    });
  });
};

/**
 * When focusing an element inside a slide, go to it
 */
const handleFocusInSlides = (carousel, options) => {
  if (options.controlled) {
    return;
  }
  getSlides(carousel).forEach((slide, index) => {
    // find common focusable elements
    const focusableElements = slide.querySelectorAll("a, button, input");
    focusableElements.forEach((element) => {
      element.addEventListener("focus", () => {
        goToSlide(carousel, index, options);
      });
    });
  });
};

const handleWindowResize = (carousel, options) => {
  if (options.controlled) {
    return;
  }
  window.addEventListener("resize", () => {
    const slides = getSlides(carousel);
    const currentIndex = Number(carousel.getAttribute("data-current-slide"));

    goToSlide(
      carousel,
      currentIndex !== undefined ? currentIndex : Math.floor(slides.length / 2),
      options
    );
  });
};

const handleTouchEvents = (carousel, options) => {
  if (options.controlled) {
    return;
  }
  const track = getTrack(carousel);
  let startX = 0;
  let currentTranslate = 0;
  let isDragging = false;
  let startPosition = 0;

  track.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    startPosition = getCurrentTranslateX(track);
    disableAnimation(track);
  });

  track.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;

      // Prevent page scrolling while dragging
      e.preventDefault();
      e.stopPropagation();

      const currentX = e.touches[0].clientX;
      const diff = currentX - startX;
      currentTranslate = startPosition + diff;

      track.style.transform = `translateX(${currentTranslate}px)`;
    },
    { passive: false }
  ); // Need to set passive: false to allow preventDefault

  track.addEventListener("touchend", () => {
    if (!isDragging) return;
    isDragging = false;

    enableAnimation(track);

    const slides = getSlides(carousel);
    const slideWidth = slides[0].offsetWidth;
    const currentIndex = Number(carousel.getAttribute("data-current-slide"));

    // Determine if swipe was significant enough to change slides
    const movement = currentTranslate - startPosition;
    const threshold = slideWidth * 0.2; // 20% of slide width

    if (Math.abs(movement) > threshold) {
      const newIndex =
        movement > 0
          ? Math.max(0, currentIndex - 1)
          : Math.min(slides.length - 1, currentIndex + 1);
      goToSlide(carousel, newIndex, options);
    } else {
      // If not swiped far enough, return to current slide
      goToSlide(carousel, currentIndex, options);
    }
  });
};

const getTrack = (carousel) => {
  return carousel.querySelector("[data-carousel-track]");
};

const getSlides = (carousel) => {
  return Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
};

const disableAnimation = (track) => {
  track.classList.remove("transition-transform", "duration-500", "ease-in-out");
};

const enableAnimation = (track) => {
  track.classList.add("transition-transform", "duration-500", "ease-in-out");
};

const getCurrentTranslateX = (element) => {
  const style = window.getComputedStyle(element);
  const matrix = new DOMMatrix(style.transform);
  return matrix.m41;
};
