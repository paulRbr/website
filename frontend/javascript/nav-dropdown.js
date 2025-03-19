export const initNavDropdowns = () => {
  const contents = document.querySelectorAll(".js-nav-dropdown-content");
  const toggles = document.querySelectorAll(".js-nav-dropdown-toggle");

  contents.forEach((content) => {
    content.classList.add("hidden");
  });

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const content = toggle.nextElementSibling;
      const icon = toggle.querySelector(".js-nav-dropdown-toggle-icon");
      if (content.classList.contains("hidden")) {
        content.classList.remove("hidden");
        content.classList.add("flex");
        icon.classList.add("rotate-180");
        contents.forEach((otherContent) => {
          if (otherContent !== content) {
            otherContent.classList.add("hidden");
            otherContent.classList.remove("flex");
            otherContent.previousElementSibling
              .querySelector(".js-nav-dropdown-toggle-icon")
              .classList.remove("rotate-180");
          }
        });
      } else {
        content.classList.add("hidden");
        content.classList.remove("flex");
        icon.classList.remove("rotate-180");
      }
    });
  });
};
