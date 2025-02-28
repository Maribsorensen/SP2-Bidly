import { onLogin } from "../../auth/login";  // Import the 'onLogin' function from the login module
import { setLogoutListener } from "../../auth/logout";
import { setupCategoryDropdown } from "../../global/utils/categoryDropdown";
import { toggleHamburgerMenu } from "../../global/utils/toggleHamburgerMenu";
import { updateNav } from "../../global/utils/updateNav";

const form = document.forms.login;  // Get the login form element by its 'name' attribute ('login')

form.addEventListener("submit", onLogin);  // Add an event listener to the form for the 'submit' event, which calls the 'onLogin' function when the form is submitted.

setLogoutListener();
setupCategoryDropdown();
toggleHamburgerMenu();
updateNav();