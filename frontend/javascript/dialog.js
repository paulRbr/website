import A11yDialog from "a11y-dialog";

export const initDialog = (id, { onUserOpen, carousel }) => {
  const dialog = new A11yDialog(document.getElementById(id));
  const body = document.querySelector("body");
  dialog.on("show", function () {
    body.setAttribute("data-dialog-open", "true");
    if (dialog.$el.querySelector("[data-default-dialog-focus]")) {
      setTimeout(() => {
        dialog.$el.querySelector("[data-default-dialog-focus]").focus();
      }, 0);
    }
  });

  dialog.on("hide", function () {
    body.removeAttribute("data-dialog-open");
  });

  // Dirty fix our css layout issues: when clicking an empty space in the container div,
  // hide the dialog.
  // In a life where I was a better coder and had more time to figure out this issue,
  // we would manage to just not have the container take full height, and clicking an empty
  // space would click the modal backdrop and hide by itself.
  // Our issues are there because we want to be sure on mobile we can scroll the dialog content
  // and the current css is the way I managed to do that
  dialog.$el.addEventListener("click", (event) => {
    if (event.target.hasAttribute("data-dialog-dirty-height-fix")) {
      dialog.hide();
    }
  });

  document.querySelectorAll(`[data-dialog-open="${id}"]`).forEach((button) => {
    button.addEventListener("click", () => {
      dialog.show();
      const index = button.dataset.dialogCarouselIndex;
      if (index !== undefined && carousel && carousel.goToSlide) {
        carousel.goToSlide(Number(index), { animate: false });
      }
      onUserOpen?.(button, dialog);
    });
  });

  return dialog;
};
