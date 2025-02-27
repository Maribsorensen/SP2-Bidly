import { API_AUCTION_LISTINGS } from "../global/constants";
import { showToast } from "../global/utils/alert";
import { apiRequest } from "../global/utils/apiRequest";

// Add event listener to handle adding media input fields
document.getElementById("addMedia").addEventListener("click", function () {
  const mediaInputs = document.getElementById("mediaInputs");

  // Create new input group for media URL
  const inputGroup = document.createElement("div");
  inputGroup.classList.add("media-input-group");

  const input = document.createElement("input");
  input.type = "text";
  input.name = "mediaUrls[]";
  input.classList.add("shadow-md", "mb-2");

  // Create a remove button for the media URL input
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = "Remove";
  removeButton.classList.add("bg-brand-cta", "text-white", "p-1", "ml-2", "rounded", "font-paragraph");

  // Add event listener to remove the media input when the button is clicked
  removeButton.addEventListener("click", function () {
    mediaInputs.removeChild(inputGroup);
  });

  // Append input and remove button to the input group
  inputGroup.appendChild(input);
  inputGroup.appendChild(removeButton);

  // Append the input group to the media inputs container
  mediaInputs.appendChild(inputGroup);
});

/**
 * Handles the form submission to create a new listing.
 * Validates the form, processes media URLs, and sends the listing data to the server.
 * 
 * @param {Event} event - The form submit event.
 * @returns {Promise<void>} - A promise that resolves when the listing is successfully created or an error occurs.
 */
export async function onCreateListing(event) {
  event.preventDefault();

  const form = event.target;

  // Gather form data
  const title = form.title.value;
  const tags = form.tags.value
    .split(",")
    .map(tag => tag.trim().toLowerCase())
    .filter(tag => tag); // Process tags, split by commas, trim and filter empty tags
  const endsAt = form.endsAt.value;
  const description = form.description.value;

  // Collect media URLs from the input fields
  const mediaInputs = form.querySelectorAll("input[name='mediaUrls[]']");
  const media = Array.from(mediaInputs)
    .map(input => input.value.trim()) // Extract URL from each input field
    .filter(url => url) // Remove empty URLs
    .map(url => ({ url, alt: "Image" })); // Construct media objects

  // Prepare the listing data object
  const listingData = { title, tags, endsAt, description, media };

  try {
    // Send the listing data to the server via an API request
    const result = await apiRequest(API_AUCTION_LISTINGS, "POST", listingData, true);
    console.log("Listing created:", result);

    // Show success message and redirect the user to the profile page after 2 seconds
    showToast({ message: "Listing created successfully!", type: "success" });
    setTimeout(() => {
      window.location.href = `/profile/`;
    }, 2000);
  } catch (error) {
    // Show error message if the request fails
    showToast({ message: "Failed to create listing: " + error.message, type: "error" });
  }
}
