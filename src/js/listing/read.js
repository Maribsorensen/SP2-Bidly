import { API_AUCTION_LISTINGS } from "../global/constants";
import { apiRequest } from "../global/utils/apiRequest";

export async function readListings(limit = 12, page = 1, tag = "") {
  const url = new URL(API_AUCTION_LISTINGS);
  url.searchParams.append("limit", limit);
  url.searchParams.append("page", page);
  url.searchParams.append("_seller", "true");
  if (tag) {
    url.searchParams.append("tag", tag);
  }
  return apiRequest(url, "GET", null, true);
};

export async function readSingleListing(id) {
  if (!id) throw new Error("Listing ID is required");

  const url = new URL(`${API_AUCTION_LISTINGS}/${id}`);
  url.searchParams.append("_seller", "true");

  return apiRequest(url, "GET", null, true);
}