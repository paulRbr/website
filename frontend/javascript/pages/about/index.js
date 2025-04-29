import { initCarousel } from "../../carousel";
import { initDialog } from "../../dialog";
import { initImagesFadeshow } from "../../imagesFadeshow";

/**
 * images in the why join us section:
 *
 * - we have a "fadeshow" below the bento items, where you can go next/prev a slideshow that fades between images
 * - when we click an image in the fadeshow, it opens a dialog
 * - the dialog contains a carousel of the images in bigger sizes
 * - the carousel in the dialog opens on the image that was clicked
 */
const initWhyJoinUsImages = () => {
  initImagesFadeshow("fadeshow-why-join-us");

  const carousel = initCarousel("carousel-why-join-us");

  initDialog("dialog-why-join-us", { carousel });
};

/**
 * team members dialog
 * - when we click on a team member, it opens a dialog
 * - the dialog contains a carousel of the team members informations
 * - the carousel in the dialog opens on the team member that was clicked
 */
const initTeamMembersDialog = () => {
  const carousel = initCarousel("carousel-team-members", {
    controlled: true,
    screenReaderMode: "current",
  });

  initDialog("dialog-team-members", { carousel });
};

initWhyJoinUsImages();
initTeamMembersDialog();
