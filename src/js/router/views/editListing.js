import { authGuard } from "../../global/utils/authGuard";
import { loadListingData, onEditListing } from "../../listing/update";

/**
 * Loads the data for the listing that needs to be edited.
 * This function fetches the listing data and populates the form with existing details so the user can update them.
 */
loadListingData();

/**
 * Event listener for submitting the 'edit listing' form.
 * When the form is submitted, the onEditListing function is called to handle the listing update.
 * It prevents the default form submission and calls the onEditListing method to handle the form data submission.
 * 
 * @type {HTMLFormElement} form - The 'editListing' form element.
 */
const form = document.forms.editListing;

/**
 * Binds the 'submit' event to the edit listing form.
 * When the form is submitted, the onEditListing function is called to handle the listing update.
 */
form.addEventListener("submit", onEditListing);

/**
 * Calls the authGuard function to ensure that the user is authenticated before proceeding with any action.
 * If the user is not authenticated, they may be redirected to the login page or denied access.
 */
authGuard();
