export const init = () => {
  navDropdowns();
};

const navDropdowns = () => {
  const contents = document.querySelectorAll(
    ".js-desktopNav .js-navDropdownContent"
  );
  const toggles = document.querySelectorAll(".js-desktopNav .js-navToggle");

  // make sure all dropdowns are hidden at load
  contents.forEach((content) => {
    content.classList.add("hidden");
  });

  // initiate all dropdown items
  toggles.forEach((toggle) => {
    // on hover: show/hide dropdowns
    toggle.addEventListener("mouseenter", () => {
      showDropdown(toggle, contents);
    });
    /**
     * @param {MouseEvent} event
     */
    const onMouseLeave = (event) => {
      if (document.activeElement.closest(".js-navToggle")) {
        return;
      }
      if (!toggle.closest("li").contains(event.relatedTarget)) {
        hideDropdown(toggle);
      }
    };
    toggle.addEventListener("mouseleave", onMouseLeave);
    toggle.nextElementSibling.addEventListener("mouseleave", onMouseLeave);

    // on click: show/hide dropdowns
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

/**
 * Shows the dropdown menu and hides other open dropdowns
 * @param {HTMLButtonElement} toggle - The dropdown toggle button element
 * @param {NodeList} contents - NodeList of all dropdown content elements
 * @returns {void}
 */
const showDropdown = (toggle, contents) => {
  const content = toggle.nextElementSibling;
  const icon = toggle.querySelector(".js-navToggleIcon");
  content.closest("li").setAttribute("data-open", "true");
  content.classList.add("flex", "animate-slide-fade-in");
  content.classList.remove("hidden");
  icon.classList.add("rotate-180");
  contents.forEach((otherContent) => {
    if (otherContent !== content) {
      otherContent.classList.add("hidden");
      otherContent.classList.remove("flex");
      otherContent.previousElementSibling
        .querySelector(".js-navToggleIcon")
        .classList.remove("rotate-180");
    }
  });
};

/**
 * Hides the specified dropdown menu
 * @param {HTMLButtonElement} toggle - The dropdown toggle button element
 * @returns {void}
 */
const hideDropdown = (toggle) => {
  const content = toggle.nextElementSibling;
  const icon = toggle.querySelector(".js-navToggleIcon");
  content.classList.add("hidden");
  content.closest("li").removeAttribute("data-open");
  content.classList.remove("flex", "animate-slide-fade-in");
  icon.classList.remove("rotate-180");
};
