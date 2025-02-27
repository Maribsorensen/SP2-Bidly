import { API_AUCTION_LISTINGS } from "../global/constants";
import { showToast } from "../global/utils/alert";
import { apiRequest } from "../global/utils/apiRequest";

/**
 * Handles the deletion of a listing.
 * This function is triggered when the user attempts to delete a listing. It ensures that the user is prompted
 * with a confirmation message before proceeding with the deletion. Once confirmed, the listing is deleted both
 * from the server and the DOM.
 *
 * @param {Event} event - The event triggered when the delete action is initiated (e.g., button click).
 * @returns {Promise<void>} - A promise that resolves when the deletion is successful or an error occurs.
 */
export async function deleteListing(event) {
  event.stopPropagation();  // Prevents the event from bubbling up and triggering any other click handlers.

  // Get the closest div element that contains the listing ID.
  const listingElement = event.target.closest("div");
  const listingId = listingElement.getAttribute("data-id");  // Retrieve the listing ID from the data-id attribute.

  // Check if listingId exists
  if (!listingId) {
    showToast({ message: "Listing ID not found, please try again...", type: "error" });
    return;
  }

  // Show a confirmation toast asking if the user is sure about deleting the listing.
  showToast({
    message: "Are you sure you want to delete this listing?",
    type: "confirm",  // Assuming this type shows a confirmation dialog.
    onConfirm: async () => {
      try {
        // Make an API request to delete the listing on the server.
        await apiRequest(`${API_AUCTION_LISTINGS}/${listingId}`, "DELETE", null, true);

        // Remove the listing from the DOM if the deletion was successful.
        listingElement.remove();

        // Show success message.
        showToast({ message: "Listing deleted successfully!", type: "success" });
      } catch (error) {
        // Show an error message if the deletion failed.
        showToast({ message: "Error deleting listing: " + error.message, type: "error" });
      }
    }
  });
}
