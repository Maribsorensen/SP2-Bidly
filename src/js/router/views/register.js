import { onRegister } from "../../auth/register";

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
