import A11yDialog from "a11y-dialog";
import { initCarousel } from "../../carousel";

export const init = () => {
  const container = document.querySelector(".js-teamMembersCarousel");
  const carousel = initCarousel(container, {
    controlled: true,
    screenReaderMode: "current",
  });

  const dialog = new A11yDialog(document.getElementById("team-members-dialog"));
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
    if (event.target.classList.contains("js-teamMembersCarousel-wrapper")) {
      dialog.hide();
    }
  });

  document.querySelectorAll(".js-openTeamMemberDialog").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.teamMemberIndex;
      dialog.show();
      carousel.goToSlide(Number(index), { animate: false });
    });
  });
};
