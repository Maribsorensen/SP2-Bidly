import { API_AUTH_REGISTER } from "../global/constants";
import { apiRequest } from "../global/utils/apiRequest";

// Get api from global call, insert needed data
export function register(data) {
  return apiRequest(API_AUTH_REGISTER, "POST", data);
};

// Function when login form is used
export async function onRegister(event) {
  event.preventDefault();

  const form = event.target;
  const fieldset = form.querySelector("fieldset");
  const button = form.querySelector("button");
  const originalButtonText = button.textContent;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Disable form elements to prevent multiple calls
  fieldset.disabled = true;
  button.disabled = true;
  button.textContent = "Registering...";

  try {
    const response = await register(data);

    // Redirect after a delay, add toaster here when function is made
    setTimeout(() => {
      window.location.href = "/auth/login/";
    }, 1000);
  } catch (error) {
    console.error("Registration error:", error.message || "An error occurred during registration.");
  } finally {
    // Re-enable form elements
    fieldset.disabled = false;
    button.disabled = false;
    button.textContent = originalButtonText;
  }
}