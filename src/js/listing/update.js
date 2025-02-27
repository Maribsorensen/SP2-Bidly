import { API_AUCTION_LISTINGS } from "../global/constants";
import { showToast } from "../global/utils/alert";
import { apiRequest } from "../global/utils/apiRequest";

/**
 * Loads the data of a specific auction listing and populates the edit form with it.
 * This function retrieves the listing data by its ID from the URL query parameters, 
 * and populates the edit form fields with the listing's existing details.
 * It also handles cases where the data is unavailable or the listing ID is missing.
 * 
 * @returns {Promise<void>} - A promise that resolves when the listing data has been loaded and the form has been populated.
 */
export async function loadListingData() {
  const urlParams = new URLSearchParams(window.location.search);
  const listingId = urlParams.get("id");

  if (!listingId) {
    showToast({ message: "Listing ID not found, please try again...", type: "error" });
    return;
  }

  try {
    const response = await apiRequest(`${API_AUCTION_LISTINGS}/${listingId}`, "GET", null, true);

    if (!response || !response.data) {
      showToast({ message: "Failed to fetch listing data", type: "error" });
      return;
    }

    const listing = response.data;
    const form = document.forms.editListing;
    if (!form) {
      showToast({ message: "Edit form not found on the page", type: "error" });
      return;
    }

    form.title.value = listing.title || "";
    form.tags.value = listing.tags ? listing.tags.join(", ") : "";
    form.endsAt.value = listing.endsAt ? listing.endsAt.slice(0, 16) : "";
    form.description.value = listing.description || "";

    const mediaInputsContainer = document.getElementById("mediaInputs");
    mediaInputsContainer.innerHTML = "";

    if (listing.media && listing.media.length > 0) {
      listing.media.forEach((media) => {
        const input = document.createElement("input");
        input.type = "text";
        input.name = "mediaUrls[]";
        input.classList.add("shadow-md", "m-2");
        input.value = media.url || "";
        mediaInputsContainer.appendChild(input);
      });
    } else {
      const input = document.createElement("input");
      input.type = "text";
      input.name = "mediaUrls[]";
      input.classList.add("shadow-md", "mb-2");
      mediaInputsContainer.appendChild(input);
    }

  } catch (error) {
    showToast({ message: "Error loading listing: " + error.message, type: "error" });
  }
}

/**
 * Handles the form submission to update an auction listing.
 * This function is triggered when the edit form is submitted. It collects the 
 * updated values from the form, including the title, tags, end date, description, 
 * and media URLs, and sends them to the server to update the listing.
 * 
 * @param {Event} event - The submit event triggered by the form submission.
 * @returns {Promise<void>} - A promise that resolves when the listing has been updated successfully.
 */
export async function onEditListing(event) {
  event.preventDefault();
  const form = event.target;
  const urlParams = new URLSearchParams(window.location.search);
  const listingId = urlParams.get("id");

  if (!listingId) {
    showToast({ message: "Listing ID not found, please try again...", type: "error" });
    return;
  }

  const title = form.title.value;
  const tags = form.tags.value
    .split(",")
    .map(tag => tag.trim().toLowerCase())
    .filter(tag => tag); // Filter out empty tags
  const endsAt = form.endsAt.value;
  const description = form.description.value;

  const mediaInputs = document.querySelectorAll("input[name='mediaUrls[]']");
  const media = Array.from(mediaInputs)
    .map(input => input.value.trim())
    .filter(url => url)
    .map(url => ({ url, alt: "Image" })); // Prepare media URL objects

  const updatedListingData = {
    title,
    tags,
    endsAt,
    description,
    media,
  };

  try {
    await apiRequest(`${API_AUCTION_LISTINGS}/${listingId}`, "PUT", updatedListingData, true);
    showToast({ message: "Listing updated successfully!", type: "success" });
    setTimeout(() => {
      window.location.href = `/profile/`; // Redirect to profile page after success
    }, 2000);
  } catch (error) {
    showToast({ message: "Failed to update listing: " + error.message, type: "error" });
  }
}
