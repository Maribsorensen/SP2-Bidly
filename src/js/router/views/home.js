import { showToast } from "../../global/utils/alert";
import { readListings } from "../../listing/read";
import { createLoadingIndicator } from "../../global/utils/loadingIndicator";

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

export async function displayListings() {
    try {
        const listingsContainer = document.getElementById("listings-container");
        const loadingIndicator = createLoadingIndicator("Loading listings...", 80);
        listingsContainer.appendChild(loadingIndicator);

        const listingsData = await readListings();
        listingsContainer.innerHTML = "";

        listingsData.data.forEach(listing => {
            const listingElement = createListingElement(listing);
            listingsContainer.appendChild(listingElement);
        });
    } catch (error) {
        showToast({ message: "Error showing listings: " + error.message, type: "error" });
    }
};



displayListings();