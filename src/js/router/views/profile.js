import { deleteListing } from "../../listing/delete";
import { readListingsByUser } from "../../listing/read";
import { readProfile } from "../../profile/read";

async function displayUserProfile() {
  const username = localStorage.getItem("username");

  try {
    const response = await readProfile(username);
    const profile = response.data;

    if (!profile) {
      console.error("Profile not found");
      return;
    }

    const profileContainer = document.getElementById("profile-information");
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
    console.error("Error fetching profile:", error);
  }
}

async function displayProfileListings() {
  const username = localStorage.getItem("username");
  if (!username) {
    console.error("No username found in localStorage.");
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
    console.error("Error displaying listings by user:", error);
  }
}

export function createProfileListingElement(listing) {
  const listingElement = document.createElement("div");
  listingElement.classList.add("flex", "flex-col", "gap-3", "text-center", "shadow-md", "justify-between");
  listingElement.setAttribute("data-id", listing.id);
  listingElement.addEventListener("click", () => {
    window.location.href = `/listing/singleListing/?id=${listing.id}`;
  });

  const listingImageContainer = document.createElement("div");
  listingImageContainer.classList.add("m-2");
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

  const editListingButton = document.createElement("button");
  editListingButton.textContent = "Edit listing";
  editListingButton.classList.add("w-fit", "font-paragraph", "text-lg", "bg-brand-main", "hover:bg-brand-mainhover", "transition", "duration-200", "px-2", "rounded-md", "text-white", "mx-auto");
  listingElement.appendChild(editListingButton);

  const deleteListingIcon = document.createElement("i");
  deleteListingIcon.className = "fa-regular fa-trash-can text-slate-700 hover:text-red-600 cursor-pointer transition duration-200 text-2xl p-2 w-fit mx-auto";
  deleteListingIcon.setAttribute("aria-label", "Delete Listing");
  deleteListingIcon.addEventListener("click", deleteListing);
  listingElement.appendChild(deleteListingIcon);

  return listingElement;
};

displayProfileListings();
displayUserProfile();
