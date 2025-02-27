import { showToast } from "../../global/utils/alert";
import { createLoadingIndicator } from "../../global/utils/loadingIndicator";
import { bids, checkUserStatus, handleBidSubmission } from "../../listing/bid";
import { readSingleListing } from "../../listing/read";

/**
 * Fetches and displays a listing based on the provided listing ID from the URL query parameters.
 * Handles loading, error states, and dynamic content rendering.
 */
async function displayListing() {
  const params = new URLSearchParams(window.location.search);
  const listingId = params.get("id");

  if (!listingId) {
    showToast({ message: "Not able to find listing, please try again...", type: "error" });
    return;
  }

  const listingContainer = document.getElementById("listing-description");
  if (!listingContainer) {
    showToast({ message: "Not able to show listing, please try again...", type: "error" });
    return;
  }

  const loadingIndicator = createLoadingIndicator("Loading listing...", 80);
  listingContainer.appendChild(loadingIndicator);

  try {
    const response = await readSingleListing(listingId);
    const listing = response.data;

    if (!listing) {
      showToast({ message: "Not able to find listing, please try again...", type: "error" });
      return;
    }

    document.title = `${listing.title} | Bidly - Place Your Bid Now`;

    const imageContainer = listingContainer.querySelector("#image-container");
    const titleElement = listingContainer.querySelector("#listing-title");
    const usernameElement = listingContainer.querySelector("#listing-seller");
    const descriptionElement = listingContainer.querySelector("#listing-description-text");
    const categoryElement = listingContainer.querySelector("#listing-category");

    titleElement.textContent = listing.title || "No title available";
    usernameElement.textContent = listing.seller ? listing.seller.name : "Unknown seller";
    descriptionElement.textContent = listing.description || "No description available";
    categoryElement.textContent = `Categories: ${listing.tags}` || "Uncategorized";

    if (listing.media && listing.media.length > 0) {
      imageContainer.innerHTML = "";
      const images = listing.media.map((mediaItem, index) => {
        const img = document.createElement("img");
        img.src = mediaItem.url;
        img.alt = mediaItem.alt || "Listing image";
        img.classList.add("w-full", "h-96", "object-cover", "rounded-lg", "shadow-md", "hidden");

        if (index === 0) img.classList.remove("hidden");

        return img;
      });

      images.forEach((img) => imageContainer.appendChild(img));

      if (listing.media.length > 1) {
        let currentImageIndex = 0;

        const nextButton = document.createElement("button");
        nextButton.textContent = "Next";
        nextButton.classList.add("absolute", "bottom-4", "right-4", "bg-brand-main", "text-white", "font-paragraph", "hover:bg-brand-mainhover", "p-2", "rounded", "w-fit");
        nextButton.onclick = function () {
          images[currentImageIndex].classList.add("hidden");
          currentImageIndex = (currentImageIndex + 1) % images.length;
          images[currentImageIndex].classList.remove("hidden");
        };

        const prevButton = document.createElement("button");
        prevButton.textContent = "Prev";
        prevButton.classList.add("absolute", "bottom-4", "left-4", "bg-brand-main", "text-white", "font-paragraph", "hover:bg-brand-mainhover", "p-2", "rounded", "w-fit");
        prevButton.onclick = function () {
          images[currentImageIndex].classList.add("hidden");
          currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
          images[currentImageIndex].classList.remove("hidden");
        };

        imageContainer.appendChild(prevButton);
        imageContainer.appendChild(nextButton);
      }
    } else {
      const defaultImg = document.createElement("img");
      defaultImg.src = "../../Gavel.png";
      defaultImg.alt = "Default auction image";
      defaultImg.classList.add("w-full", "h-56", "object-cover", "rounded-lg", "shadow-md");
      imageContainer.appendChild(defaultImg);
    }
  } catch (error) {
    showToast({ message: "Not able to find listing, please try again...", type: "error" });
  } finally {
    if (loadingIndicator) {
      loadingIndicator.remove();
    }
  }
}

/**
 * Handles the form submission for placing a bid.
 * Prevents the default form submission and calls `handleBidSubmission`.
 * 
 * @param {Event} event - The form submit event.
 */
const bidForm = document.querySelector("form[name='bid-form']");
if (bidForm) {
  bidForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await handleBidSubmission(event);
  });
}

/**
 * Calls the functions related to bids and user status checks.
 */
bids();
checkUserStatus();
displayListing();
