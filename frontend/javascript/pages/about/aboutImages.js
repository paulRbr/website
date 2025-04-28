import A11yDialog from "a11y-dialog";
import { initCarousel } from "../../carousel";

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

  const container = document.querySelector(".js-whyJoinUsImagesCarousel");
  const carousel = initCarousel(container, {
    controlled: true,
    screenReaderMode: "current",
  });

  const dialog = new A11yDialog(
    document.getElementById("why-join-us-images-dialog")
  );
  dialog.on("show", function () {
    document.querySelector("body").setAttribute("data-dialog-open", "true");
  });

  dialog.on("hide", function () {
    document.querySelector("body").removeAttribute("data-dialog-open");
  });

  // Dirty fix our css layout issues: when clicking an empty space in the container div,
  // hide the dialog.
  // In a life where I was a better coder and had more time to figure out this issue,
  // we would manage to just not have the container take full height, and clicking an empty
  // space would click the modal backdrop and hide by itself.
  // Our issues are there because we want to be sure on mobile we can scroll the dialog content
  // and the current css is the way I managed to do that
  container.addEventListener("click", (event) => {
    if (event.target.classList.contains("js-whyJoinUsImagesCarousel-wrapper")) {
      dialog.hide();
    }
  });

  document
    .querySelectorAll(".js-openWhyJoinUsImagesDialog")
    .forEach((button) => {
      button.addEventListener("click", () => {
        const index = button.dataset.whyJoinUsImagesIndex;
        dialog.show();
        carousel.goToSlide(Number(index), { animate: false });
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
