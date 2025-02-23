import { API_KEY } from "../constants";

export async function apiRequest(endpoint, method = "GET", body = null, requiresAuth = false) {
  const headers = {
    "Content-Type": "application/json",
  };


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
    config.body = JSON.stringify(body);
  }

  const response = await fetch(endpoint, config);

  if (response.status === 204) {
    return null;
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "API request failed");
  }

  return response.json();
}
