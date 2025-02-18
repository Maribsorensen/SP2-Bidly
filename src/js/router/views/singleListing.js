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

    const imageContainer = listingContainer.querySelector("img");
    const titleElement = listingContainer.querySelector("h2");
    const usernameElement = listingContainer.querySelector("h3");
    const descriptionElement = listingContainer.querySelector("p");
    const categoryElement = listingContainer.querySelector("h4");

    titleElement.textContent = listing.title || "No title available";
    usernameElement.textContent = listing.seller ? listing.seller.name : "Unknown seller";
    descriptionElement.textContent = listing.description ? listing.description : "No description available";
    categoryElement.textContent = listing.category ? listing.category : "Uncategorized";

    if (listing.media > 0 && listing.media[0].url) {
      imageContainer.src = listing.media[0].url;
      imageContainer.alt = listing.media[0].alt || "Listing image";
    } else {
      imageContainer.src = "../../Gavel.png";
      imageContainer.alt = "Default auction image";
    }
  } catch (error) {
    console.error("Error fetching listing:", error);
  }
}

displayListing();

