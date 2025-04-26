export const init = (container, { onClick }) => {
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
  prevButton.removeAttribute("data-current");
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
};
