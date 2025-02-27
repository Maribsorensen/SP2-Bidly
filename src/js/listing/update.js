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
        form.mediaUrl.value = listing.media && listing.media.length > 0 ? listing.media[0].url : "";
        form.mediaAlt.value = listing.media && listing.media.length > 0 ? listing.media[0].alt : "";

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
        .filter(tag => tag);
    const endsAt = form.endsAt.value;
    const description = form.description.value;
    const mediaUrl = form.mediaUrl.value;
    const mediaAlt = form.mediaAlt.value;

    const updatedListingData = {
        title,
        tags,
        endsAt,
        description,
        media: mediaUrl ? [{ url: mediaUrl, alt: mediaAlt || "Image" }] : [],
    };

    try {
        await apiRequest(`${API_AUCTION_LISTINGS}/${listingId}`, "PUT", updatedListingData, true);
        showToast({ message: "Listing updated successfully!", type: "success" });
        window.location.href = `/profile/`;
    } catch (error) {
        showToast({ message: "Failed to update listing: " + error.message, type: "error" });
    }
}