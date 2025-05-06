export const initSlidingButtons = (container, { onClick }) => {
  container.querySelectorAll("button").forEach((button, index) => {
    if (!button.getAttribute("data-index")) {
      button.setAttribute("data-index", index);
    }
  });
  const firstButton = container.querySelector('button[data-current="true"]');
  if (firstButton) {
    setCurrentButton(firstButton, container, { animate: false });
  }

  container.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-index]");
    if (!button) {
      return;
    }
    setCurrentButton(button, container);
    onClick?.(button, Number(button.getAttribute("data-index")));
  });

  handleKeyboard(container, { onClick });

  window.addEventListener("resize", () => {
    const currentButton = container.querySelector(
      'button[data-current="true"]'
    );
    if (currentButton) {
      setCurrentButton(currentButton, container);
    }
  });
};

export const setCurrentButton = (
  button,
  container,
  { animate = true } = {}
) => {
  const slidingBackground = container.querySelector(
    "[data-sliding-buttons-bg]"
  );
  if (!slidingBackground) {
    return;
  }

  const prevButton = container.querySelector('button[data-current="true"]');
  prevButton?.removeAttribute("data-current");
  prevButton?.setAttribute("aria-selected", "false");
  prevButton?.setAttribute("tabindex", "-1");
  if (!animate) {
    slidingBackground.classList.remove("transition-all", "duration-300");
  }
  slidingBackground.style.left = `${button.offsetLeft}px`;
  slidingBackground.style.top = `${button.offsetTop}px`;
  slidingBackground.style.width = `${button.offsetWidth}px`;
  slidingBackground.style.height = `${button.offsetHeight}px`;
  if (!animate) {
    setTimeout(() => {
      slidingBackground.classList.add("transition-all", "duration-300");
    }, 100);
  }
  button.setAttribute("data-current", "true");
  button.setAttribute("tabindex", "0");
  button.setAttribute("aria-selected", "true");
};

export const getSlidingButtons = (container) => {
  return document.querySelector(
    `.items-slidingButtons[data-items-id="${container.id}"]`
  );
};

const handleKeyboard = (container, { onClick }) => {
  container.addEventListener("keyup", (event) => {
    if (!event.target.closest("button[data-index]")) {
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      return onArrowKey(event.key, container, { onClick });
    }
  });
};

const onArrowKey = (key, container, { onClick }) => {
  const currentButton = container.querySelector('button[data-current="true"]');
  const currentIndex = Number(currentButton.getAttribute("data-index"));
  const newIndex =
    key === "ArrowLeft"
      ? currentIndex - 1
      : key === "ArrowRight"
      ? currentIndex + 1
      : null;
  if (newIndex === null) {
    return;
  }
  const newButton = container.querySelector(`button[data-index="${newIndex}"]`);
  if (newButton) {
    setCurrentButton(newButton, container);
    newButton.focus();
    onClick?.(newButton, newIndex);
  }
};
