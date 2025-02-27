import { setLogoutListener } from "../auth/logout.js";
import { setupCategoryDropdown } from "../global/utils/categoryDropdown.js";
import { toggleHamburgerMenu } from "../global/utils/toggleHamburgeMenu.js";
import { updateNav } from "../global/utils/updateNav.js";

export default async function router(pathname = window.location.href) {
  switch (pathname) {
    case "/SP2-Bidly/":
      await import("./views/home.js");
      break;
    case "/SP2-Bidly/auth/login/":
      await import("./views/login.js");
      break;
    case "/SP2-Bidly/auth/register/":
      await import("./views/register.js");
      break;
    case "/SP2-Bidly/listing/":
      await import("./views/listings.js");
      break;
    case "/SP2-Bidly/listing/singleListing/":
      await import("./views/singleListing.js");
      break;
    case "/SP2-Bidly/profile/":
      await import("./views/profile.js");
      break;
    case "/SP2-Bidly/profile/edit/":
      await import("./views/editProfile.js");
      break;
    case "/SP2-Bidly/listing/create/":
      await import("./views/createListing.js");
      break;
    case "/SP2-Bidly/listing/edit/":
      await import("./views/editListing.js");
      break;
    default:
      await import("./views/notFound.js");
  }
};

updateNav();
toggleHamburgerMenu();
setupCategoryDropdown();
setLogoutListener();