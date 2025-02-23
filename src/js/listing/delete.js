import { API_AUCTION_LISTINGS } from "../global/constants";
import { apiRequest } from "../global/utils/apiRequest";

export async function deleteListing(event) {
  event.stopPropagation();

  const listingElement = event.target.closest("div");
  const listingId = listingElement.getAttribute("data-id");

  if (!listingId) {
    console.error("Listing ID not found.");
    return;
  }

  const confirmDelete = window.confirm("Are you sure you want to delete this listing?");
  if (!confirmDelete) {
    return;
  }

  try {
    await apiRequest(`${API_AUCTION_LISTINGS}/${listingId}`, "DELETE", null, true);
    listingElement.remove();
  } catch (error) {
    console.error("Error deleting listing:", error);
    alert("Failed to delete listing. Please try again.");
  }
}