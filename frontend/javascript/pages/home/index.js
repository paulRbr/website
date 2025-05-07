import { initCarousel } from "../../carousel";
import { initImagesFadeshow } from "../../imagesFadeshow";
import { init as initDocPreview } from "./docPreview";

document.addEventListener("DOMContentLoaded", () => {
  initImagesFadeshow("fadeshow-hero");
  initDocPreview();
  initCarousel("carousel-testimonials");
});
