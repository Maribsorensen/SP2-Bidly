
// <div class="flex flex-col gap-3 text-center shadow-md">
//   <div class="m-2">
//     <img
//       src="Gavel.png"
//       alt=""
//       class="justify-self-center w-full h-auto rounded-md"
//     />
//   </div>
//   <div>
//     <h3 class="font-paragraph text-2xl">Title</h3>
//     <p class="font-paragraph text-lg text-slate-600">Username</p>
//   </div>
//   <div>
//     <h4 class="font-paragraph text-lg">Latest bid</h4>
//     <p class="font-paragraph text-lg">156€</p>
//   </div>
//   <button
//     class="w-fit font-paragraph text-lg bg-brand-main hover:bg-brand-mainhover transition duration-200 px-2 rounded-md text-white mx-auto"
//   >
//     Bid on object
//   </button>
// </div>

import { readListings } from "../../listing/read";

export function createListingElement(listing) {
  const listingElement = document.createElement("div");
  listingElement.classList.add("flex", "flex-col", "gap-3", "text-center", "shadow-md");

  const listingImageContainer = document.createElement("div");
  listingImageContainer.classList.add("m-2");
  listingElement.appendChild(listingImageContainer);

  if (listing.media && listing.media.url) {
    const listingImage = document.createElement("img");
    listingImage.setAttribute("src", listing.media.url);
    listingImage.setAttribute("alt", listing.media.alt || "Listing image");
    listingImageContainer.appendChild(listingImage);
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
    const listingsData = await readListings();
    const listingsContainer = document.getElementById("listings-container");

    listingsContainer.innerHTML = "";

    listingsData.data.forEach(listing => {
      const listingElement = createListingElement(listing);
      listingsContainer.appendChild(listingElement);
    });
  } catch (error) {
    console.error("error displaying listings:", error);
  }
};

displayListings();