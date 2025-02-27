import { API_AUCTION_LISTINGS, API_AUCTION_PROFILES } from "../global/constants";
import { apiRequest } from "../global/utils/apiRequest";

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

export async function readSingleListing(id) {
  if (!id) throw new Error("Listing ID is required");

  const url = new URL(`${API_AUCTION_LISTINGS}/${id}`);
  url.searchParams.append("_bids", "true");
  url.searchParams.append("_seller", "true");

  return apiRequest(url, "GET", null, true);
}

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