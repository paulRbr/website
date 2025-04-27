export const init = () => {
  const plansDetails = document.querySelector(".js-plansDetails");
  const isLargeScreen = window.matchMedia("(min-width: 62em)");

  toggleMobileHeaders(plansDetails, isLargeScreen.matches);
  isLargeScreen.addEventListener("change", (e) => {
    toggleMobileHeaders(plansDetails, e.matches);
  });
};

const toggleMobileHeaders = (plansDetails, isEnabled) => {
  if (isEnabled) {
    disableMobileHeaders(plansDetails);
  } else {
    enableMobileHeaders(plansDetails);
  }
};

const disableMobileHeaders = (plansDetails) => {
  plansDetails.querySelectorAll("[data-mobile-headers]").forEach((element) => {
    element.removeAttribute("headers");
  });
};

const enableMobileHeaders = (plansDetails) => {
  plansDetails.querySelectorAll("[data-mobile-headers]").forEach((element) => {
    element.setAttribute(
      "headers",
      element.getAttribute("data-mobile-headers")
    );
  });
};
