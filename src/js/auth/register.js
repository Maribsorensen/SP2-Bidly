import { API_AUTH_REGISTER } from "../global/constants";
import { showToast } from "../global/utils/alert";
import { apiRequest } from "../global/utils/apiRequest";

/**
 * Sends a registration request to the server.
 * 
 * @param {Object} data - The registration data (e.g., username, password, email).
 * @returns {Promise<Object>} - A Promise that resolves to the API response.
 */
export function register(data) {
  return apiRequest(API_AUTH_REGISTER, "POST", data);
};

/**
 * Handles the registration form submission, manages UI changes, and calls the register function.
 * 
 * @param {Event} event - The submit event triggered by the form submission.
 * @returns {Promise<void>} - A Promise that resolves when the registration process is complete.
 */
export async function onRegister(event) {
  event.preventDefault();

  const form = event.target;
  const fieldset = form.querySelector("fieldset");
  const button = form.querySelector("button");
  const originalButtonText = button.textContent;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  fieldset.disabled = true;
  button.disabled = true;
  button.textContent = "Registering...";

  try {
    // Attempt to register with provided data
    const response = await register(data);

    // Redirect to the login page after a brief delay on successful registration
    setTimeout(() => {
      window.location.href = "/auth/login/";
    }, 1000);
  } catch (error) {
    // Show an error message if registration fails
    showToast({ message: "Registration error: " + error.message, type: "error" });
  } finally {
    // Re-enable the form and button
    fieldset.disabled = false;
    button.disabled = false;
    button.textContent = originalButtonText;
  }
}
