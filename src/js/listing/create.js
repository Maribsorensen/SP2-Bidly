import { API_AUCTION_LISTINGS } from "../global/constants";
import { showToast } from "../global/utils/alert";
import { apiRequest } from "../global/utils/apiRequest";

export async function onCreateListing(event) {
  event.preventDefault();

  const form = event.target;

  const title = form.title.value;
  const tags = form.tags.value
    .split(",")
    .map(tag => tag.trim().toLowerCase())
    .filter(tag => tag);
  const endsAt = form.endsAt.value;
  const description = form.description.value;
  const mediaUrl = form.mediaUrl.value;
  const mediaAlt = form.mediaAlt.value;

  const listingData = {
    title,
    tags,
    endsAt,
    description,
    media: mediaUrl ? [{ url: mediaUrl, alt: mediaAlt || "Image" }] : [],
  };

  try {
    const result = await apiRequest(API_AUCTION_LISTINGS, "POST", listingData, true);
    console.log("Listing created:", result);
    showToast({ message: "Listing created successfully!", type: "success" });
    window.location.href = `/profile/`;
  } catch (error) {
    showToast({ message: "Failed to create listing: " + error.message, type: "error" });
  }
};