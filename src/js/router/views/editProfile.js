import { authGuard } from "../../global/utils/authGuard";
import { loadProfileData, onEditProfile } from "../../profile/update";

/**
 * Loads the data for the user's profile when the page is loaded.
 * This function fetches the user's profile information and populates the form with existing details 
 * so the user can edit their profile.
 */
loadProfileData();

/**
 * Event listener for submitting the 'edit profile' form.
 * When the form is submitted, the onEditProfile function is called to handle the profile update.
 * It prevents the default form submission and calls the onEditProfile method to handle the form data submission.
 * 
 * @type {HTMLFormElement} form - The 'editProfile' form element.
 */
const form = document.forms.editProfile;

/**
 * Binds the 'submit' event to the edit profile form.
 * When the form is submitted, the onEditProfile function is called to handle the profile update.
 */
form.addEventListener("submit", onEditProfile);

/**
 * Calls the authGuard function to ensure that the user is authenticated before proceeding with any action.
 * If the user is not authenticated, they may be redirected to the login page or denied access.
 */
authGuard();
