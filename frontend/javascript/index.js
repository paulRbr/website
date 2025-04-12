import "$styles/index.css";

// Import all JavaScript & CSS files from src/_components
import components from "$components/**/*.{js,jsx,js.rb,css}";
import { init as initHeader } from "./header";
import { init as initNav } from "./nav";
import { init as initHeroScreenshots } from "./heroScreenshots";
import { init as initDocPreview } from "./docPreview";

initHeader();
initNav();
initHeroScreenshots();
initDocPreview();
