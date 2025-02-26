import { showToast } from "../global/utils/alert";

export function onLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  location.reload();
}

export function setLogoutListener() {
  const logoutDesktop = document.getElementById("logoutButton");
  const logoutMobile = document.getElementById("logoutButtonMobile");

  function handleLogoutClick() {
    showToast({
      message: "Are you sure you want to log out?",
      type: "confirm",
      onConfirm: onLogout,
      onCancel: () => console.log("Logout cancelled"),
    });
  }

  if (logoutDesktop) {
    logoutDesktop.addEventListener("click", handleLogoutClick);
  } else {
    console.error("Desktop Logout button not found");
  }

  if (logoutMobile) {
    logoutMobile.addEventListener("click", handleLogoutClick);
  } else {
    console.error("Mobile Logout button not found");
  }
}
