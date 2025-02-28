import { setLogoutListener } from "../../auth/logout";
import { onRegister } from "../../auth/register";
import { setupCategoryDropdown } from "../../global/utils/categoryDropdown";
import { toggleHamburgerMenu } from "../../global/utils/toggleHamburgerMenu";
import { updateNav } from "../../global/utils/updateNav";

/**
 * The registration form element.
 * @type {HTMLFormElement}
 */
const form = document.forms.register;

/**
 * Event listener for the form submit event.
 * Calls the `onRegister` function to handle the form submission.
 * 
 * @param {Event} event - The submit event triggered when the user submits the form.
 */
form.addEventListener("submit", onRegister);

setLogoutListener();
setupCategoryDropdown();
toggleHamburgerMenu();
updateNav();