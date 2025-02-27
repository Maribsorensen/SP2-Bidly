import { API_KEY } from "../constants";
/**
 * Makes an API request to the specified endpoint with the given method, body, and authentication settings.
 * It supports sending data with the request and handles authentication if needed.
 *
 * @param {string} endpoint - The URL to which the request will be sent.
 * @param {string} [method="GET"] - The HTTP method to use for the request. Default is "GET".
 * @param {Object|null} [body=null] - The body data to send with the request (for methods like POST or PUT). Default is `null`.
 * @param {boolean} [requiresAuth=false] - Whether the request requires authentication (if true, it includes the `Authorization` header with the token). Default is `false`.
 *
 * @returns {Promise<Object|null>} The response data from the API as a JSON object, or `null` if the status is 204 (No Content).
 * @throws {Error} Throws an error if the request fails or the API response is not successful.
 */
export async function apiRequest(endpoint, method = "GET", body = null, requiresAuth = false) {
  const headers = {
    "Content-Type": "application/json",
  };

  // If authentication is required, include the token in the Authorization header.
  if (requiresAuth) {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    headers["X-Noroff-API-Key"] = API_KEY;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body); // Add the body to the config if provided
  }

  const response = await fetch(endpoint, config);

  // Return null if the response status is 204 (No Content).
  if (response.status === 204) {
    return null;
  }

  // Throw an error if the response is not OK.
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "API request failed");
  }

  // Return the response data as JSON.
  return response.json();
}
