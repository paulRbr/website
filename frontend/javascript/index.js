import "$styles/index.css";

// Import all JavaScript & CSS files from src/_components
import components from "$components/**/*.{js,jsx,js.rb,css}";
import { initNavDropdowns } from "./nav-dropdown";

initNavDropdowns();
