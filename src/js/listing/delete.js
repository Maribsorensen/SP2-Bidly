import { API_AUCTION_LISTINGS } from "../global/constants";
import { apiRequest } from "../global/utils/apiRequest";

export async function deleteListing(event) {
  event.stopPropagation(); // Prevents the click from triggering other events (like navigating to the listing)

  const listingElement = event.target.closest("div"); // Find the closest listing container
  const listingId = listingElement.getAttribute("data-id"); // Retrieve the listing ID

  if (!listingId) {
    console.error("Listing ID not found.");
    return;
  }

  const confirmDelete = window.confirm("Are you sure you want to delete this listing?");
  if (!confirmDelete) {
    return;
  }

  try {
    await apiRequest(`${API_AUCTION_LISTINGS}/${listingId}`, "DELETE", null, true); // Send delete request
    listingElement.remove(); // Remove element from DOM on success
  } catch (error) {
    console.error("Error deleting listing:", error);
    alert("Failed to delete listing. Please try again.");
  }
}