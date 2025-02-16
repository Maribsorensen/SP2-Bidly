import { API_AUTH_LOGIN } from "../global/constants";
import { apiRequest } from "../global/utils/apiRequest";

// Get api from global call, insert needed data
export function login(data) {
  return apiRequest(API_AUTH_LOGIN, "POST", data);
};

// Function when login form is used
export async function onLogin(event) {
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
  button.textContent = "Logging in...";

  try {
    const response = await login(data);

    // Store token and username in localstorage
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("username", response.data.name);

    // Redirect after a delay, add toaster here when function is made
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } catch (error) {
    console.error("Login error:", error.message || "An error occurred during login.");
  } finally {
    // Re-enable form elements
    fieldset.disabled = false;
    button.disabled = false;
    button.textContent = originalButtonText;
  }
}