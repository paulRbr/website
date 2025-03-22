import "$styles/index.css";

// Import all JavaScript & CSS files from src/_components
import components from "$components/**/*.{js,jsx,js.rb,css}";
import { navDropdown } from "./navDropdown";
import { headerScroll } from "./headerScroll";

navDropdown();
headerScroll();
