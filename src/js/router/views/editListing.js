import { API_AUCTION_LISTINGS } from "../../global/constants";
import { apiRequest } from "../../global/utils/apiRequest";
import { authGuard } from "../../global/utils/authGuard";

async function populateForm(listingId) {
  const url = new URL(`${API_AUCTION_LISTINGS}/${listingId}`);
  try {
    const response = await apiRequest(API_AUCTION_LISTINGS, "POST", listingData, true);
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch post");
  }
  const listingResponse = await response.json();
  const listing = listingResponse.data;

  const form = document.forms["editPost"];
  form.title.value = listing.title || "";
}

const form = document.forms[""];
form.addEventListener("submit",);

authGuard();