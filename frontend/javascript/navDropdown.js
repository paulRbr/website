export const navDropdown = () => {
  const contents = document.querySelectorAll(".js-nav-dropdown-content");
  const toggles = document.querySelectorAll(".js-nav-dropdown-toggle");

  contents.forEach((content) => {
    content.classList.add("hidden");
  });

  toggles.forEach((toggle) => {
    toggle.addEventListener("mouseenter", () => {
      showDropdown(toggle, contents);
    });
    const onMouseLeave = (event) => {
      if (!toggle.closest("li").contains(event.relatedTarget)) {
        hideDropdown(toggle);
      }
    };
    toggle.addEventListener("mouseleave", onMouseLeave);
    toggle.nextElementSibling.addEventListener("mouseleave", onMouseLeave);
    toggle.addEventListener("click", () => {
      const content = toggle.nextElementSibling;
      if (content.classList.contains("hidden")) {
        showDropdown(toggle, contents);
      } else {
        hideDropdown(toggle);
      }
    });
  });
};

const showDropdown = (toggle, contents) => {
  const content = toggle.nextElementSibling;
  const icon = toggle.querySelector(".js-nav-dropdown-toggle-icon");
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
};

const hideDropdown = (toggle) => {
  const content = toggle.nextElementSibling;
  const icon = toggle.querySelector(".js-nav-dropdown-toggle-icon");
  content.classList.add("hidden");
  content.classList.remove("flex");
  icon.classList.remove("rotate-180");
};
