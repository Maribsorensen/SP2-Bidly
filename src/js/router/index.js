import { toggleHamburgerMenu, updateNav } from "../global/utils/updateNav.js";

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
    case "/listing/singleListing/":
      await import("./views/singleListing");
      break;
    default:
      await import("./views/notFound.js");
  }
};

updateNav();
toggleHamburgerMenu();