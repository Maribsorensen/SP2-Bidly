import { API_AUTH_LOGIN } from "../global/constants";
import { showToast } from "../global/utils/alert";
import { apiRequest } from "../global/utils/apiRequest";


/**
 * Handles the login API request.
 * 
 * @param {Object} data - The login data object (typically username and password).
 * @returns {Promise<Object>} - A Promise that resolves to the response from the API.
 */
export function login(data) {
  return apiRequest(API_AUTH_LOGIN, "POST", data);
};

/**
 * Handles the login form submission, manages UI changes, and calls the login function.
 * 
 * @param {Event} event - The submit event triggered by the form submission.
 * @returns {Promise<void>} - A Promise that resolves when the login process is complete.
 */
export async function onLogin(event) {
  event.preventDefault();

  const form = event.target;
  const fieldset = form.querySelector("fieldset");
  const button = form.querySelector("button");
  const originalButtonText = button.textContent;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  fieldset.disabled = true;
  button.disabled = true;
  button.textContent = "Logging in...";

  try {
    // Attempt to log in with provided data
    const response = await login(data);

    // Save the token and username to localStorage on successful login
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("username", response.data.name);

    // Redirect to the home page after a brief delay
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    // Show an error toaster if login fails
    showToast({ message: "Login error: " + error.message, type: "error" });
  } finally {
    // Re-enable the form and button
    fieldset.disabled = false;
    button.disabled = false;
    button.textContent = originalButtonText;
  }
}