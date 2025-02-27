import { API_AUCTION_LISTINGS, API_AUCTION_PROFILES } from "../global/constants";
import { apiRequest } from "../global/utils/apiRequest";

/**
 * Fetches a list of auction listings with optional filters for pagination and tags.
 * This function is used to retrieve a paginated list of auction listings. It supports filtering by tag
 * and allows the limiting of the number of listings returned per request.
 *
 * @param {number} [limit=12] - The maximum number of listings to return.
 * @param {number} [page=1] - The page number to fetch.
 * @param {string} [tag=""] - Optional tag to filter listings by.
 * @returns {Promise<Object>} - A promise that resolves to the data of the listings.
 */

export async function readListings(limit = 12, page = 1, tag = "") {
  const url = new URL(API_AUCTION_LISTINGS);
  url.searchParams.append("limit", limit);
  url.searchParams.append("page", page);
  url.searchParams.append("_seller", "true");
  url.searchParams.append("sort", "created");
  url.searchParams.append("order", "desc");
  if (tag) {
    url.searchParams.append("_tag", tag);
  }
  const response = await apiRequest(url, "GET", null, true);
  response.data = response.data.filter((listing) => listing._active === true);

  return apiRequest(url, "GET", null, true);
};

/**
 * Fetches details of a single listing by its ID.
 * This function retrieves the information for a single auction listing, including bids and seller details.
 *
 * @param {string} id - The ID of the listing to retrieve.
 * @throws {Error} If the ID is not provided.
 * @returns {Promise<Object>} - A promise that resolves to the listing data.
 */

export async function readSingleListing(id) {
  if (!id) throw new Error("Listing ID is required");

  const url = new URL(`${API_AUCTION_LISTINGS}/${id}`);
  url.searchParams.append("_bids", "true");
  url.searchParams.append("_seller", "true");

  return apiRequest(url, "GET", null, true);
}

/**
 * Fetches listings of a specific user.
 * This function retrieves a paginated list of auction listings created by a specific user, with optional tag filtering.
 *
 * @param {string} username - The username of the user whose listings to retrieve.
 * @param {number} [limit=12] - The maximum number of listings to return.
 * @param {number} [page=1] - The page number to fetch.
 * @param {string} [tag=""] - Optional tag to filter listings by.
 * @returns {Promise<Object>} - A promise that resolves to the user's listing data.
 */

export async function readListingsByUser(username, limit = 12, page = 1, tag = "") {
  const url = new URL(`${API_AUCTION_PROFILES}/${username}/listings`);

  url.searchParams.append("limit", limit);
  url.searchParams.append("page", page);
  url.searchParams.append("_seller", "true");
  url.searchParams.append("seller", username);
  if (tag) {
    url.searchParams.append("tag", tag);
  }

  return apiRequest(url, "GET", null, true);
}