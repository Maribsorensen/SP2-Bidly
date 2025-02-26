import { showToast } from "../../global/utils/alert";
import { readListings } from "../../listing/read";

export function createListingElement(listing) {
  const listingElement = document.createElement("div");
  listingElement.classList.add("flex", "flex-col", "gap-3", "text-center", "shadow-md", "justify-between", "p-2");

  listingElement.addEventListener("click", () => {
    window.location.href = `/listing/singleListing/?id=${listing.id}`;
  });

  const listingImageContainer = document.createElement("div");
  listingElement.appendChild(listingImageContainer);

  if (listing.media && listing.media.length > 0) {
    const firstImage = listing.media[0];
    const listingImage = document.createElement("img");
    listingImage.setAttribute("src", firstImage.url);
    listingImage.setAttribute("alt", firstImage.alt || "Listing image");
    listingImage.classList.add("w-full", "h-60", "object-cover", "rounded-md");
    listingImageContainer.appendChild(listingImage);
  } else {

    const placeholderImage = document.createElement("img");
    placeholderImage.setAttribute("src", "path_to_placeholder_image.jpg");
    placeholderImage.setAttribute("alt", "No image available");
    listingImageContainer.appendChild(placeholderImage);
  }

  const listingInformation = document.createElement("div");
  listingElement.appendChild(listingInformation);

  const listingTitle = document.createElement("h3");
  listingTitle.textContent = listing.title;
  listingTitle.classList.add("font-paragraph", "text-2xl");
  listingInformation.appendChild(listingTitle);

  if (listing.seller && listing.seller.name) {
    const listingSeller = document.createElement("p");
    listingSeller.textContent = `Sold by: ${listing.seller.name}`;
    listingSeller.classList.add("font-paragraph", "text-lg", "text-slate-600");
    listingInformation.appendChild(listingSeller);
  }

  const listingBidButton = document.createElement("button");
  listingBidButton.textContent = "Bid on item";
  listingBidButton.classList.add("w-fit", "font-paragraph", "text-lg", "bg-brand-main", "hover:bg-brand-mainhover", "transition", "duration-200", "px-2", "rounded-md", "text-white", "mx-auto");
  listingElement.appendChild(listingBidButton);

  return listingElement;
};

export async function displayListings(category = "", page = 1, append = false) {
  try {
    const listingsData = await readListings(12, page, category);
    const listingsContainer = document.getElementById("listings-container");

    if (!append) {
      listingsContainer.innerHTML = "";
    }

    listingsData.data.forEach(listing => {
      const listingElement = createListingElement(listing);
      listingsContainer.appendChild(listingElement);
    });


    const showMoreButton = document.getElementById("show-more-btn");
    if (listingsData.data.length < 12) {
      showMoreButton.style.display = "none";
    } else {
      showMoreButton.style.display = "block";
    }
  } catch (error) {
    showToast({ message: "Error displaying listings: " + error.message, type: "error" });
  }
}

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const urlCategory = getQueryParam("category") ? getQueryParam("category").toLowerCase() : "";

let currentPage = 1;
let currentCategory = urlCategory;

displayListings(currentCategory, currentPage, false);

document.querySelectorAll(".category-menu a").forEach((categoryLink) => {
  categoryLink.addEventListener("click", (event) => {
    event.preventDefault();

    currentPage = 1;
    currentCategory = categoryLink.textContent.trim().toLowerCase();

    const newUrl = `/listing/?category=${encodeURIComponent(currentCategory)}`;
    window.history.pushState({ path: newUrl }, "", newUrl);

    displayListings(currentCategory, currentPage, false);
  });
});

document.getElementById("show-more-btn").addEventListener("click", () => {
  currentPage++;
  displayListings(currentCategory, currentPage, true);
});