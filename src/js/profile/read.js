import { API_AUCTION_PROFILES } from "../global/constants";
import { apiRequest } from "../global/utils/apiRequest";

/**
 * Fetches the profile data for a specific user, including their listings and wins.
 * This function sends a GET request to the API to retrieve the profile details 
 * of the user specified by the `username`. It also fetches the user's auction listings 
 * and wins by including the appropriate query parameters.
 * 
 * @param {string} username - The username of the user whose profile is to be fetched.
 * @returns {Promise<Object>} - A promise that resolves with the profile data of the user.
 * The returned data includes information about the user's listings and auction wins.
 */
export async function readProfile(username) {
  const url = new URL(`${API_AUCTION_PROFILES}/${username}`);
  url.searchParams.append("_listings", "true");
  url.searchParams.append("_wins", "true");

  return apiRequest(url, "GET", null, true);
}
