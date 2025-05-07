export const isMobile = () => {
  return document.documentElement.classList.contains("is-mobile");
};

export const hasReducedMotion = () => {
  return document.documentElement.classList.contains("motion-reduce");
};
