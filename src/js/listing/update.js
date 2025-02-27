import { API_AUCTION_LISTINGS } from "../global/constants";
import { showToast } from "../global/utils/alert";
import { apiRequest } from "../global/utils/apiRequest";

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
    .filter(tag => "");
  const endsAt = form.endsAt.value;
  const description = form.description.value;

  const mediaInputs = document.querySelectorAll("input[name='mediaUrls[]']");
  const media = Array.from(mediaInputs)
    .map(input => input.value.trim())
    .filter(url => url)
    .map(url => ({ url, alt: "Image" }));

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
      window.location.href = `/profile/`;
    }, 2000);
  } catch (error) {
    showToast({ message: "Failed to update listing: " + error.message, type: "error" });
  }
}
