import { setLogoutListener } from "../../auth/logout";
import { showToast } from "../../global/utils/alert";
import { setupCategoryDropdown } from "../../global/utils/categoryDropdown";
import { createLoadingIndicator } from "../../global/utils/loadingIndicator";
import { toggleHamburgerMenu } from "../../global/utils/toggleHamburgerMenu";
import { updateNav } from "../../global/utils/updateNav";
import { readListings } from "../../listing/read";

/**
 * Creates an HTML element representing a listing.
 * The element includes the listing's image, title, seller information, and a button to bid on the item.
 * 
 * @param {Object} listing - The listing data object.
 * @param {string} listing.id - The unique identifier for the listing.
 * @param {string} listing.title - The title of the listing.
 * @param {Array} listing.media - Array of media (images/videos) associated with the listing.
 * @param {Object} listing.seller - The seller information object.
 * @param {string} listing.seller.name - The name of the seller.
 * @returns {HTMLElement} - The created listing element.
 */
export function createListingElement(listing) {
  const listingElement = document.createElement("div");
  listingElement.classList.add("flex", "flex-col", "gap-3", "text-center", "shadow-md", "justify-between", "p-2");

  // Redirects to the detailed listing page when clicked
  listingElement.addEventListener("click", () => {
    window.location.href = `/listing/singlelisting/?id=${listing.id}`;
  });

  const listingImageContainer = document.createElement("div");
  listingElement.appendChild(listingImageContainer);

  // Check if the listing has images, otherwise add a placeholder image
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

  // Add listing title
  const listingTitle = document.createElement("h3");
  listingTitle.textContent = listing.title;
  listingTitle.classList.add("font-paragraph", "text-2xl");
  listingInformation.appendChild(listingTitle);

  // Add seller's name if available
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
 * Displays listings for a given category and page.
 * It appends the listings to the container and handles the "Show More" button visibility.
 * 
 * @param {string} category - The category of listings to display (optional).
 * @param {number} page - The current page number for pagination (default is 1).
 * @param {boolean} append - Whether to append new listings or replace the old ones (default is false).
 */
export async function displayListings(category = "", page = 1, append = false) {
  const listingsContainer = document.getElementById("listings-container");

  if (!listingsContainer) {
    showToast({ message: "Listings container not found.", type: "error" });
    return;
  }

  const loadingIndicator = createLoadingIndicator("Loading listings...", 80);
  listingsContainer.appendChild(loadingIndicator);

  try {
    // Fetch the listings based on category, page, and page size (12 per page)
    const listingsData = await readListings(12, page, category);

    if (!append) {
      listingsContainer.innerHTML = "";
    }

    // If no listings are available for this category, show a message
    if (listingsData.data.length === 0) {
      const noListingsMessage = document.createElement("p");
      noListingsMessage.textContent = "No listings available for this category.";
      noListingsMessage.classList.add("text-center", "font-paragraph", "text-xl", "text-red-500", "mt-5");
      listingsContainer.appendChild(noListingsMessage);
    } else {
      // Create and append the listings to the container
      listingsData.data.forEach(listing => {
        const listingElement = createListingElement(listing);
        listingsContainer.appendChild(listingElement);
      });
    }

    // Handle the visibility of the "Show More" button
    const showMoreButton = document.getElementById("show-more-btn");
    if (listingsData.data.length < 12) {
      showMoreButton.style.display = "none";
    } else {
      showMoreButton.style.display = "block";
    }
  } catch (error) {
    showToast({ message: "Error displaying listings: " + error.message, type: "error" });
  } finally {
    if (loadingIndicator) {
      loadingIndicator.remove();
    }
  }
}

/**
 * Retrieves a query parameter value from the URL.
 * 
 * @param {string} param - The name of the query parameter to retrieve.
 * @returns {string|null} - The value of the query parameter, or null if not found.
 */
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Get the "category" query parameter from the URL
const urlCategory = getQueryParam("category") ? getQueryParam("category").toLowerCase() : "";

// Capitalize the first letter of the category name
const categoryName = urlCategory ? urlCategory.charAt(0).toUpperCase() + urlCategory.slice(1) : "All";
const h1Element = document.querySelector("h1");
if (h1Element) {
  h1Element.textContent = `${categoryName} Listings`;
}

// Initialize the current page and category for display
let currentPage = 1;
let currentCategory = urlCategory;

// Display listings based on the current category and page
displayListings(currentCategory, currentPage, false);

// Handle category changes when a category is clicked from the menu
document.querySelectorAll(".category-menu a").forEach((categoryLink) => {
  categoryLink.addEventListener("click", (event) => {
    event.preventDefault();

    // Reset to page 1 and update category
    currentPage = 1;
    currentCategory = categoryLink.textContent.trim().toLowerCase();

    // Update the URL to reflect the new category
    const newUrl = `/listing/?category=${encodeURIComponent(currentCategory)}`;
    window.history.pushState({ path: newUrl }, "", newUrl);

    // Update the category heading
    const newCategoryName = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1);
    h1Element.textContent = `${newCategoryName} Listings`;

    // Display listings for the new category
    displayListings(currentCategory, currentPage, false);
  });
});

// Load more listings when the "Show More" button is clicked
document.getElementById("show-more-btn").addEventListener("click", () => {
  currentPage++;
  displayListings(currentCategory, currentPage, true);
});

setLogoutListener();
setupCategoryDropdown();
toggleHamburgerMenu();
updateNav();
