import "$styles/index.css";

// Import all JavaScript & CSS files from src/_components
import components from "$components/**/*.{js,jsx,js.rb,css}";
import { init as initHeader } from "./header";
import { init as initNav } from "./nav";
import { init as initFeatureScreenshots } from "./featuresScreenshots";

initHeader();
initNav();
initFeatureScreenshots();
