import { setLogoutListener } from "../../auth/logout";
import { showToast } from "../../global/utils/alert";
import { authGuard } from "../../global/utils/authGuard";
import { setupCategoryDropdown } from "../../global/utils/categoryDropdown";
import { createLoadingIndicator } from "../../global/utils/loadingIndicator";
import { toggleHamburgerMenu } from "../../global/utils/toggleHamburgerMenu";
import { updateNav } from "../../global/utils/updateNav";
import { deleteListing } from "../../listing/delete";
import { readListingsByUser } from "../../listing/read";
import { readProfile } from "../../profile/read";

/**
 * Displays the user profile information by fetching data from the backend.
 * It also handles loading, error, and missing profile cases.
 */
async function displayUserProfile() {
  const username = localStorage.getItem("username");
  const profileContainer = document.getElementById("profile-information");

  if (!profileContainer) {
    showToast({ message: "Profile container not found", type: "error" });
    return;
  }

  const loadingIndicator = createLoadingIndicator("Loading profile...", 80);
  profileContainer.appendChild(loadingIndicator);

  try {
    const response = await readProfile(username);
    const profile = response.data;

    if (!profile) {
      showToast({ message: "Profile not found", type: "error" });
      return;
    }

    const profileUsername = profileContainer.querySelector("#profile-username");
    const profileAvatar = profileContainer.querySelector("#profile-avatar");
    const profileBio = profileContainer.querySelector("#profile-bio");
    const profileCredits = profileContainer.querySelector("#profile-credits");
    const profileTotalListings = profileContainer.querySelector("#profile-total-listings");
    const profileTotalWins = profileContainer.querySelector("#profile-total-wins");

    profileUsername.textContent = `${profile.name}'s Profile`;

    if (profile.avatar) {
      profileAvatar.src = profile.avatar.url || profile.avatar;
      profileAvatar.alt = profile.avatar.alt || "User Avatar";
    } else {
      profileAvatar.src = "../Gavel.png";
      profileAvatar.alt = "Default Avatar";
    }

    profileBio.textContent = profile.bio || "No bio available";
    profileCredits.textContent = `Credits: ${profile.credits ?? 0}`;
    profileTotalListings.textContent = `Total listings: ${profile._count?.listings ?? 0}`;
    profileTotalWins.textContent = `Total wins: ${profile._count?.wins ?? 0}`;

  } catch (error) {
    showToast({ message: "Error fetching profile: " + error.message, type: "error" });
  } finally {
    loadingIndicator.remove();
  }
}

/**
 * Displays a list of the user's listings.
 * It fetches the listings from the backend and renders them dynamically on the page.
 * If no username is found, an error message is shown.
 */
async function displayProfileListings() {
  const username = localStorage.getItem("username");
  if (!username) {
    showToast({ message: "No username found", type: "error" });
    return;
  }

  try {
    const listingData = await readListingsByUser(username);

    const listingContainer = document.getElementById("profile-listings");
    listingContainer.innerHTML = "";

    listingData.data.forEach(listing => {
      const listingElement = createProfileListingElement(listing);
      listingContainer.appendChild(listingElement);
    });
  } catch (error) {
    showToast({ message: "Error displaying listings: " + error.message, type: "error" });
  }
}

/**
 * Creates a DOM element for a listing with information like image, title, seller, and buttons for editing or deleting.
 * 
 * @param {Object} listing - The listing data object to be displayed.
 * @param {string} listing.id - The ID of the listing.
 * @param {string} listing.title - The title of the listing.
 * @param {Object[]} listing.media - An array of media objects for the listing.
 * @param {Object} listing.seller - The seller of the listing.
 * @param {string} listing.seller.name - The seller's name.
 * 
 * @returns {HTMLElement} The HTML element representing the listing.
 */
export function createProfileListingElement(listing) {
  const listingElement = document.createElement("div");
  listingElement.classList.add("flex", "flex-col", "gap-3", "text-center", "shadow-md", "justify-between", "p-2");
  listingElement.setAttribute("data-id", listing.id);
  listingElement.addEventListener("click", () => {
    window.location.href = `/listing/singlelisting/?id=${listing.id}`;
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

  const username = localStorage.getItem("username");
  if (username && listing.seller && listing.seller.name === username) {
    const editListingButton = document.createElement("button");
    editListingButton.textContent = "Edit listing";
    editListingButton.classList.add("w-fit", "font-paragraph", "text-lg", "bg-brand-main", "hover:bg-brand-mainhover", "transition", "duration-200", "px-2", "rounded-md", "mx-auto");
    editListingButton.addEventListener("click", (event) => {
      event.stopPropagation();
      window.location.href = `/listing/edit/?id=${listing.id}`;
    });
    listingElement.appendChild(editListingButton);

    const deleteListingIcon = document.createElement("i");
    deleteListingIcon.className = "fa-regular fa-trash-can text-slate-700 hover:text-red-600 cursor-pointer transition duration-200 text-2xl p-2 w-fit mx-auto";
    deleteListingIcon.setAttribute("aria-label", "Delete Listing");
    deleteListingIcon.addEventListener("click", deleteListing);
    listingElement.appendChild(deleteListingIcon);
  }

  return listingElement;
};

displayProfileListings();
displayUserProfile();
authGuard();
setLogoutListener();
setupCategoryDropdown();
toggleHamburgerMenu();
updateNav();