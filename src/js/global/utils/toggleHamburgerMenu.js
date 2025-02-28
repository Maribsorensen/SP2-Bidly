/**
 * Toggles the visibility of the hamburger menu when the hamburger button is clicked.
 * It adds or removes the "hidden" class from the hamburger menu, showing or hiding it.
 * 
 */
export function toggleHamburgerMenu() {
  const hamburgerButton = document.querySelector("#hamburger-button");
  const hamburgerMenu = document.querySelector("#hamburger-menu");

  hamburgerButton.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("hidden");
  });
}