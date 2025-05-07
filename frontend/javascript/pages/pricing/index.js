import { init as initPlansSummary } from "./plansSummary";
import { init as initPlansDetails } from "./plansDetails";

document.addEventListener("DOMContentLoaded", () => {
  initPlansSummary();
  initPlansDetails();
});
