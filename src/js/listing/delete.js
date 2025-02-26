import { API_AUCTION_LISTINGS } from "../global/constants";
import { showToast } from "../global/utils/alert";
import { apiRequest } from "../global/utils/apiRequest";

export async function deleteListing(event) {
  event.stopPropagation();

  const listingElement = event.target.closest("div");
  const listingId = listingElement.getAttribute("data-id");

  if (!listingId) {
    showToast({ message: "Listing ID not found, please try again...", type: "error" });
    return;
  }

  showToast({
    message: "Are you sure you want to delete this listing?",
    type: "confirm",
    onConfirm: async () => {
      try {
        await apiRequest(`${API_AUCTION_LISTINGS}/${listingId}`, "DELETE", null, true);
        listingElement.remove();
        showToast({ message: "Listing deleted successfully!", type: "success" });
      } catch (error) {
        showToast({ message: "Error deleting listing: " + error.message, type: "error" });
      }
    }
  });
}