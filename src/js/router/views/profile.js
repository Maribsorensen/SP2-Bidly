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

displayUserProfile();
