import { API_AUCTION_PROFILES } from "../global/constants";
import { showToast } from "../global/utils/alert";
import { apiRequest } from "../global/utils/apiRequest";

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
        showToast({ message: "Error loading listing: " + error.message, type: "error" });
    }
}

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
        showToast({ message: "Failed to update Profile: " + error.message, type: "error" });
    }
}