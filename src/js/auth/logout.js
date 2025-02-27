import { showToast } from "../global/utils/alert";

/**
 * Logs out the user by removing their token and username from localStorage,
 * and reloads the page.
 */
export function onLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  location.reload();
}

/**
 * Sets up event listeners for logout buttons (both desktop and mobile).
 * Displays a confirmation toast before logging the user out.
 */
export function setLogoutListener() {
  const logoutDesktop = document.getElementById("logoutButton");
  const logoutMobile = document.getElementById("logoutButtonMobile");

  /**
   * Handles the logout button click event by showing a confirmation toast.
   * If confirmed, the user will be logged out.
   */
  function handleLogoutClick() {
    showToast({
      message: "Are you sure you want to log out?",
      type: "confirm",
      onConfirm: onLogout, // Calls onLogout when the user confirms
    });
  }

  if (logoutDesktop) {
    logoutDesktop.addEventListener("click", handleLogoutClick);
  } else {
    showToast({ message: "Not able to logout, please try again...", type: "error" });
  }

  if (logoutMobile) {
    logoutMobile.addEventListener("click", handleLogoutClick);
  } else {
    showToast({ message: "Not able to logout, please try again...", type: "error" });
  }
}
