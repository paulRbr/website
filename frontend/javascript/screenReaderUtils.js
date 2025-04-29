const tabbableElementsSelector =
  "a, button, input, select, textarea, iframe, [controls], [tabindex='0']";

export const enableSectionForScreenReaders = (container) => {
  container.removeAttribute("aria-hidden");
  container.querySelectorAll("[data-sr-util-disabled]").forEach((element) => {
    element.removeAttribute("data-sr-util-disabled");
    element.removeAttribute("aria-hidden");
  });
  container.querySelectorAll(tabbableElementsSelector).forEach((element) => {
    if (!element.hasAttribute("[data-sr-util-ignore]")) {
      element.removeAttribute("tabindex");
    }
  });
};

export const disableSectionForScreenReaders = (container) => {
  container.setAttribute("aria-hidden", "true");
  container.setAttribute("data-sr-util-disabled", "");
  container.querySelectorAll(tabbableElementsSelector).forEach((element) => {
    if (!element.hasAttribute("[data-sr-util-ignore]")) {
      element.setAttribute("tabindex", "-1");
    }
  });
};
