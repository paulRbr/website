import "$styles/pygment-monokai.css";
import { init as tocTracker } from "./tocTracker";

document.addEventListener("DOMContentLoaded", () => {
  tocTracker();
});
