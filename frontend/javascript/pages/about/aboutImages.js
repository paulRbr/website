export const init = () => {
  document.querySelectorAll(".js-aboutImages").forEach((container) => {
    container
      .querySelector(".js-aboutImages-prev-button")
      .addEventListener("click", (event) => {
        showSiblingImage(container, -1);
      });

    container
      .querySelector(".js-aboutImages-next-button")
      .addEventListener("click", (event) => {
        showSiblingImage(container, 1);
      });
  });
};

const showSiblingImage = (container, direction) => {
  const images = getImages(container);
  const currentIndex = getCurrentIndex(container);
  const targetIndex =
    (currentIndex + direction + images.length) % images.length;

  console.log({ length: images.length, currentIndex, targetIndex });

  const currentImage = container.querySelector('a[data-current="true"]');
  const targetImage = container.querySelector(`a[data-index="${targetIndex}"]`);

  if (currentImage === targetImage) {
    return;
  }

  currentImage.removeAttribute("data-current");
  targetImage.setAttribute("data-current", "true");
  currentImage.setAttribute("aria-hidden", "true");
  targetImage.removeAttribute("aria-hidden");
  container.setAttribute("data-current-index", targetIndex);
};

const getImages = (container) => {
  return container.querySelectorAll("a[data-index]");
};

const getCurrentIndex = (container) => {
  return Number(container.getAttribute("data-current-index"));
};
