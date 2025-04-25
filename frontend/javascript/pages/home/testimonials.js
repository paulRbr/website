export const init = () => {
  const carousels = document.querySelectorAll(".js-testimonials");
  carousels.forEach((carousel) => {
    initCarousel(carousel);
  });
};

const initCarousel = (carousel) => {
  if (!carousel) {
    return;
  }

  const slides = getSlides(carousel);

  goToSlide(carousel, Math.floor(slides.length / 2));

  handleNavigationClicks(carousel);
  handleSlideClicks(carousel);
  handleFocusInSlides(carousel);
  handleWindowResize(carousel);
  handleTouchEvents(carousel);
};

const goToSlide = (carousel, targetIndex) => {
  const track = getTrack(carousel);
  const slides = getSlides(track);
  const slideWidth = slides[0].offsetWidth;
  const viewportWidth = carousel.offsetWidth;

  const centerOffset = (viewportWidth - slideWidth) / 2;
  const position = -targetIndex * slideWidth + centerOffset;
  track.style.transform = `translateX(${position}px)`;
  carousel.setAttribute("data-current-slide", targetIndex);
  slides.forEach((slide, index) => {
    if (index === targetIndex) {
      slide.setAttribute("data-current-slide", "true");
    } else {
      slide.removeAttribute("data-current-slide");
    }
  });
};

const handleNavigationClicks = (carousel) => {
  const slides = getSlides(carousel);
  carousel
    .querySelector(".js-testimonials-prev-button")
    .addEventListener("click", () => {
      goToSlide(
        carousel,
        (Number(carousel.getAttribute("data-current-slide")) -
          1 +
          slides.length) %
          slides.length
      );
    });

  carousel
    .querySelector(".js-testimonials-next-button")
    .addEventListener("click", () => {
      goToSlide(
        carousel,
        (Number(carousel.getAttribute("data-current-slide")) + 1) %
          slides.length
      );
    });
};

/**
 * When clicking a slide that is not the current one, go to it
 */
const handleSlideClicks = (carousel) => {
  const slides = getSlides(carousel);
  slides.forEach((slide, index) => {
    slide.addEventListener("click", (event) => {
      const currentIndex = Number(carousel.getAttribute("data-current-slide"));
      if (currentIndex !== index) {
        event.preventDefault();
        goToSlide(carousel, index);
      }
    });
  });
};

/**
 * When focusing an element inside a slide, go to it
 */
const handleFocusInSlides = (carousel) => {
  getSlides(carousel).forEach((slide, index) => {
    // find common focusable elements
    const focusableElements = slide.querySelectorAll("a, button, input");
    focusableElements.forEach((element) => {
      element.addEventListener("focus", () => {
        goToSlide(carousel, index);
      });
    });
  });
};

const handleWindowResize = (carousel) => {
  window.addEventListener("resize", () => {
    const slides = getSlides(carousel);
    const currentIndex = Number(carousel.getAttribute("data-current-slide"));
    goToSlide(
      carousel,
      currentIndex !== undefined ? currentIndex : Math.floor(slides.length / 2)
    );
  });
};

const getTrack = (carousel) => {
  return carousel.querySelector(".js-testimonials-track");
};

const getSlides = (carousel) => {
  return Array.from(carousel.querySelectorAll(".js-testimonials-slide"));
};

const handleTouchEvents = (carousel) => {
  const track = getTrack(carousel);
  let startX = 0;
  let currentTranslate = 0;
  let isDragging = false;
  let startPosition = 0;

  track.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    startPosition = getCurrentTranslateX(track);
    track.style.transition = "none"; // Disable transition during drag
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

    track.style.transition = "transform 500ms ease-in-out"; // Restore transition

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
      goToSlide(carousel, newIndex);
    } else {
      // If not swiped far enough, return to current slide
      goToSlide(carousel, currentIndex);
    }
  });
};

const getCurrentTranslateX = (element) => {
  const style = window.getComputedStyle(element);
  const matrix = new DOMMatrix(style.transform);
  return matrix.m41;
};
