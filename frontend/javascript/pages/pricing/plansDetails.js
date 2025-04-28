export const init = () => {
  const plansDetails = document.querySelector(".js-plansDetails");
  const isLargeScreen = window.matchMedia("(min-width: 62em)");

  toggleMobileHeaders(plansDetails, isLargeScreen.matches);
  isLargeScreen.addEventListener("change", (e) => {
    toggleMobileHeaders(plansDetails, e.matches);
  });

  fixMobileHeadingRows();
  window.addEventListener("resize", fixMobileHeadingRows);
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

// our usage of actual <table>, display: table and position: sticky makes it hard
// to layout a few things. One trick we have is on mobile, the row headings have an
// overflowing width to take full width (100% doesn't work). But we can't use
// overflow-hidden on parents because it would break the sticky header.
// so here we have a "just fix it in post", but instead of being directors we are
// shitty coders (we = me). Does the job!
const fixMobileHeadingRows = () => {
  document.querySelectorAll(".js-dirtySizing").forEach((element) => {
    const parent = element.closest("tr");
    element.style.width = parent.offsetWidth + "px";
  });
};
