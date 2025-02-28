export default async function router(pathname = window.location.pathname) {
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
    case "/listing/singlelisting/":
      await import("./views/singleListing.js");
      break;
    case "/listing/":
      await import("./views/listings.js");
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
