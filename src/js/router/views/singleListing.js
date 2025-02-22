import { bids, checkUserStatus, handleBidSubmission } from "../../listing/bid";
import { readSingleListing } from "../../listing/read";

async function displayListing() {
  const params = new URLSearchParams(window.location.search);
  const listingId = params.get("id");

  if (!listingId) {
    console.error("No listing ID found in URL");
    return;
  }

  try {
    const response = await readSingleListing(listingId);
    const listing = response.data;

    if (!listing) {
      console.error("Listing not found");
      return;
    }

    const listingContainer = document.getElementById("listing-description");
    if (!listingContainer) {
      console.error("Listing container not found");
      return;
    }

    const imageContainer = listingContainer.querySelector("#image-container");
    const titleElement = listingContainer.querySelector("#listing-title");
    const usernameElement = listingContainer.querySelector("#listing-seller");
    const descriptionElement = listingContainer.querySelector("#listing-description-text");
    const categoryElement = listingContainer.querySelector("#listing-category");

    titleElement.textContent = listing.title || "No title available";
    usernameElement.textContent = listing.seller ? listing.seller.name : "Unknown seller";
    descriptionElement.textContent = listing.description || "No description available";
    categoryElement.textContent = listing.category || "Uncategorized";

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
    console.error("Error fetching listing:", error);
  }
}

const bidForm = document.querySelector("form[name='bid-form']");
if (bidForm) {
  bidForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    await handleBidSubmission();
  });
}

checkUserStatus();
bids();
displayListing();


