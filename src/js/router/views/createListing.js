import { authGuard } from "../../global/utils/authGuard";
import { onCreateListing } from "../../listing/create";

/**
 * Event listener for submitting the 'create listing' form.
 * This listener triggers the onCreateListing function when the form is submitted.
 * It prevents the default form submission and calls the onCreateListing method to handle listing creation.
 * 
 * @type {HTMLFormElement} form - The 'createListing' form element.
 */
const form = document.forms.createListing;

/**
 * Binds the 'submit' event to the create listing form.
 * When the form is submitted, the onCreateListing function is called to handle the listing creation.
 */
form.addEventListener("submit", onCreateListing);

/**
 * Calls the authGuard function to ensure that the user is authenticated before proceeding with any action.
 * If the user is not authenticated, they may be redirected to the login page or denied access.
 */
authGuard();
