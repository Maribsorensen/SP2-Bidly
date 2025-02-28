import { showToast } from "../../global/utils/alert";
import { readListings } from "../../listing/read";
import { createLoadingIndicator } from "../../global/utils/loadingIndicator";
import { setLogoutListener } from "../../auth/logout";
import { setupCategoryDropdown } from "../../global/utils/categoryDropdown";
import { toggleHamburgerMenu } from "../../global/utils/toggleHamburgerMenu";
import { updateNav } from "../../global/utils/updateNav";

/**
 * Creates a listing element for the user interface.
 * This function builds a `div` element representing an auction listing, including the image, title, seller, 
 * and a button to place a bid.
 * 
 * @param {Object} listing - The listing data object.
 * @param {string} listing.id - The unique identifier for the listing.
 * @param {string} listing.title - The title of the listing.
 * @param {Object[]} listing.media - Array of media objects related to the listing.
 * @param {Object} listing.seller - The seller information.
 * @param {string} listing.seller.name - The name of the seller.
 * @returns {HTMLElement} The `div` element representing the listing.
 */
export function createListingElement(listing) {
  const listingElement = document.createElement("div");
  listingElement.classList.add("flex", "flex-col", "gap-3", "text-center", "shadow-md", "justify-between", "p-2");

  // Redirects user to the listing details page when clicked
  listingElement.addEventListener("click", () => {
    window.location.href = `/listing/singlelisting/?id=${listing.id}`;
  });

  const listingImageContainer = document.createElement("div");
  listingElement.appendChild(listingImageContainer);

  // Check if the listing has media, otherwise add a placeholder image
  if (listing.media && listing.media.length > 0) {
    const firstImage = listing.media[0];
    const listingImage = document.createElement("img");
    listingImage.setAttribute("src", firstImage.url);
    listingImage.setAttribute("alt", firstImage.alt || "Listing image");
    listingImage.classList.add("w-full", "h-60", "object-cover", "rounded-md");
    listingImageContainer.appendChild(listingImage);
  } else {
    const placeholderImage = document.createElement("img");
    placeholderImage.setAttribute("src", "placeholder_image.jpg");
    placeholderImage.setAttribute("alt", "No image available");
    listingImageContainer.appendChild(placeholderImage);
  }

  const listingInformation = document.createElement("div");
  listingElement.appendChild(listingInformation);

  // Add the title of the listing
  const listingTitle = document.createElement("h3");
  listingTitle.textContent = listing.title;
  listingTitle.classList.add("font-paragraph", "text-2xl");
  listingInformation.appendChild(listingTitle);

  // Add the seller's name if available
  if (listing.seller && listing.seller.name) {
    const listingSeller = document.createElement("p");
    listingSeller.textContent = `Sold by: ${listing.seller.name}`;
    listingSeller.classList.add("font-paragraph", "text-lg", "text-slate-600");
    listingInformation.appendChild(listingSeller);
  }

  // Add a button for bidding
  const listingBidButton = document.createElement("button");
  listingBidButton.textContent = "Bid on item";
  listingBidButton.classList.add("w-fit", "font-paragraph", "text-lg", "bg-brand-main", "hover:bg-brand-mainhover", "transition", "duration-200", "px-2", "rounded-md", "text-white", "mx-auto");
  listingElement.appendChild(listingBidButton);

  return listingElement;
};

/**
 * Displays a list of listings by calling the API and rendering each listing.
 * The function fetches listings, clears the listings container, and appends 
 * each listing element created by the `createListingElement` function.
 */
export async function displayListings() {
  try {
    const listingsContainer = document.getElementById("listings-container");

    // Show a loading indicator while fetching listings
    const loadingIndicator = createLoadingIndicator("Loading listings...", 80);
    listingsContainer.appendChild(loadingIndicator);

    // Fetch listings data from the API
    const listingsData = await readListings();

    // Clear the container once listings are fetched
    listingsContainer.innerHTML = "";

    // Create and append listing elements for each listing
    listingsData.data.forEach(listing => {
      const listingElement = createListingElement(listing);
      listingsContainer.appendChild(listingElement);
    });
  } catch (error) {
    // Show a toast message if there was an error fetching the listings
    showToast({ message: "Error showing listings: " + error.message, type: "error" });
  }
};

displayListings();
setLogoutListener();
setupCategoryDropdown();
toggleHamburgerMenu();
updateNav();