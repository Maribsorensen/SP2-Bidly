import { setLogoutListener } from "../auth/logout.js";
import { setupCategoryDropdown } from "../global/utils/categoryDropdown.js";
import { toggleHamburgerMenu } from "../global/utils/toggleHamburgeMenu.js";
import { updateNav } from "../global/utils/updateNav.js";

export default async function router(pathname = window.location.href) {
    switch (pathname) {
        case "/":
            await import("./views/home.js");
            break;
        case "/auth/login/":
            await import("./views/login.js");
            break;
        case "/auth/register/":
            await import("./views/register.js");
            break;
        case "/listing/":
            await import("./views/listings.js");
            break;
        case "/listing/singleListing/":
            await import("./views/singleListing.js");
            break;
        case "/profile/":
            await import("./views/profile.js");
            break;
        case "/profile/edit/":
            await import("./views/editProfile.js");
            break;
        case "/listing/create/":
            await import("./views/createListing.js");
            break;
        case "/listing/edit/":
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