import "$styles/index.css";

// Import all JavaScript & CSS files from src/_components
import components from "$components/**/*.{js,jsx,js.rb,css}";
import { init as initHeader } from "./header";
import { init as initDesktopNav } from "./desktopNav";
import { init as initMobileNav } from "./mobileNav";
import { init as initCarousels } from "./carousel";

initHeader();
initDesktopNav();
initMobileNav();
initCarousels();
