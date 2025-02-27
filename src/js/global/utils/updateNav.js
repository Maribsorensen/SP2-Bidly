/**
 * Updates the navigation links based on the user's login status.
 * - If the user is logged in (i.e., `username` exists in localStorage), it shows the profile and logout links, and hides the login and register links.
 * - If the user is not logged in, it shows the login and register links and hides the profile and logout links.
 * 
 * This function checks the localStorage for a `username` key to determine whether the user is logged in.
 * 
 */
export function updateNav() {
  const username = localStorage.getItem("username");

  const loginLinks = document.querySelectorAll('a[href="/auth/login/"]');
  const registerLinks = document.querySelectorAll('a[href="/auth/register/"]');
  const profileLinks = document.querySelectorAll('a[href="/profile/"]');
  const logoutButtons = document.querySelectorAll("#logoutButton, #logoutButtonMobile");

  if (username) {
    loginLinks.forEach(link => link.style.display = "none");
    registerLinks.forEach(link => link.style.display = "none");
    profileLinks.forEach(link => link.style.display = "block");
    logoutButtons.forEach(button => button.style.display = "block");
  } else {
    loginLinks.forEach(link => link.style.display = "block");
    registerLinks.forEach(link => link.style.display = "block");
    profileLinks.forEach(link => link.style.display = "none");
    logoutButtons.forEach(button => button.style.display = "none");
  }
}




