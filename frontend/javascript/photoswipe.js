import PhotoSwipeLightbox from "photoswipe/lightbox";

const loaded = {};

export const init = () => {
  document.querySelectorAll(".photoswipe").forEach((element) => {
    loaded[element] = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !loaded[element]) {
          const lightbox = new PhotoSwipeLightbox({
            gallery: element,
            children: "a[data-index]",
            // @TODO: see why esbuild doesn't dynamically import the module but includes it in the bundle directly
            pswpModule: () => import("photoswipe"),
            arrowPrevSVG: `<svg width="60" height="60" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.75001 12.0408L4.94668 8.23745C4.49751 7.78828 4.49751 7.05328 4.94668 6.60411L8.75001 2.80078" stroke="#f9f9f9" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`,
            arrowNextSVG: `<svg width="60" height="60" viewBox="0 0 14 14" fill="none" version="1.1" id="svg1" xmlns="http://www.w3.org/2000/svg">
  <path d="m4.6125208 2.80078 3.80333 3.80335c.44917.44917.44917 1.18417 0 1.63334l-3.80333 3.80333" stroke="#f9f9f9" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" id="path1"/>
</svg>`,
          });
          lightbox.init();
          loaded[element] = true;
          observer.unobserve(element);
        }
      });
    });
    observer.observe(element);
  });
};
