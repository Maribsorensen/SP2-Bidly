import { API_AUCTION_PROFILES } from "../global/constants";
import { showToast } from "../global/utils/alert";
import { apiRequest } from "../global/utils/apiRequest";

/**
 * Loads the profile data of the currently logged-in user and populates the edit profile form.
 * This function retrieves the user's profile from the API based on the username stored in localStorage.
 * It then fills the form fields with the user's existing profile data, such as bio and avatar information.
 * 
 * @returns {Promise<void>} - A promise that resolves once the profile data is loaded and the form is populated.
 * If the user is not logged in or if there is an error fetching the profile data, an error message is shown.
 */
export async function loadProfileData() {
  const username = localStorage.getItem("username");

  if (!username) {
    showToast({ message: "Profile not found, please try again...", type: "error" });
    return;
  }

  try {
    const response = await apiRequest(`${API_AUCTION_PROFILES}/${username}`, "GET", null, true);

    if (!response || !response.data) {
      showToast({ message: "Failed to fetch profile data", type: "error" });
      return;
    }

    const profile = response.data;

    const form = document.forms.editProfile;
    if (!form) {
      showToast({ message: "Edit profile form not found on the page", type: "error" });
      return;
    }

    form.bio.value = profile.bio || "";
    form.avatarUrl.value = profile.avatar && profile.avatar.url ? profile.avatar.url : "";
    form.avatarAlt.value = profile.avatar && profile.avatar.alt ? profile.avatar.alt : "";

  } catch (error) {
    showToast({ message: "Error loading profile: " + error.message, type: "error" });
  }
}

/**
 * Handles the form submission for updating a user's profile.
 * This function retrieves the updated profile data from the form (bio, avatar URL, and avatar alt text) 
 * and sends a PUT request to the API to update the user's profile information.
 * 
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} - A promise that resolves when the profile is successfully updated.
 * If the update fails, an error message is shown.
 */
export async function onEditProfile(event) {
  event.preventDefault();
  const form = event.target;
  const username = localStorage.getItem("username");

  if (!username) {
    showToast({ message: "Profile not found, please try again...", type: "error" });
    return;
  }

  const bio = form.bio.value;
  const avatarUrl = form.avatarUrl.value;
  const avatarAlt = form.avatarAlt.value;

  const updatedProfileData = {
    bio,
    avatar: avatarUrl ? { url: avatarUrl, alt: avatarAlt || "Image" } : undefined,
  };

  try {
    await apiRequest(`${API_AUCTION_PROFILES}/${username}`, "PUT", updatedProfileData, true);
    showToast({ message: "Profile updated successfully!", type: "success" });
    window.location.href = `/profile/`;
  } catch (error) {
    showToast({ message: "Failed to update profile: " + error.message, type: "error" });
  }
}
