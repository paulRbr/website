export const init = () => {
  const featuresContainer = document.querySelector(".js-features");
  if (!featuresContainer) {
    return;
  }

  const textAndImages = featuresContainer.querySelectorAll(
    "[data-feature-index]"
  );
  const texts = featuresContainer.querySelectorAll(
    ".js-features-text[data-feature-index]"
  );

  // This threshold makes it so that sometimes there is no current item (when the scroll it kinda between 2 items).
  // You can set it to 0 to always have a current item.
  const ratioThreshold = 0.7;

  const intersectionRatios = new Map();
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        intersectionRatios.set(entry.target, entry.intersectionRatio);
      });

      let maxRatio = 0;
      let mostVisibleText = null;

      intersectionRatios.forEach((ratio, element) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          mostVisibleText = element;
        }
      });

      const featureIndex = mostVisibleText?.getAttribute("data-feature-index");
      textAndImages.forEach((element) => {
        element.setAttribute(
          "data-current",
          element.getAttribute("data-feature-index") === featureIndex &&
            maxRatio > ratioThreshold
            ? "true"
            : "false"
        );
      });

      // handle first and last item specific cases: when scrolling out of the features view, they stay visible
      const ratios = Array.from(intersectionRatios.values());

      const isScrolledBeforeFirstItem = ratios
        .slice(1)
        .every((ratio) => ratio === 0);
      if (isScrolledBeforeFirstItem) {
        featuresContainer
          .querySelectorAll("[data-feature-index='0']")
          .forEach((element) => {
            element.setAttribute("data-current", "true");
          });
      }

      const isScrolledAfterLastItem = ratios
        .slice(0, -1)
        .every((ratio) => ratio === 0);
      if (isScrolledAfterLastItem) {
        featuresContainer
          .querySelectorAll(`[data-feature-index='${ratios.length - 1}']`)
          .forEach((element) => {
            element.setAttribute("data-current", "true");
          });
      }
    },
    {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], // You can play with those values to be more or less precise in the intersection detection
      rootMargin: "-90px 0px 0px 0px", // 90px ~matches the height of the header
    }
  );

  texts.forEach((element) => {
    observer.observe(element);
  });
};
