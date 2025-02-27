import { API_AUCTION_LISTINGS } from "../global/constants";
import { showToast } from "../global/utils/alert";
import { apiRequest } from "../global/utils/apiRequest";

document.getElementById("addMedia").addEventListener("click", function () {
    const mediaInputs = document.getElementById("mediaInputs");

    const inputGroup = document.createElement("div");
    inputGroup.classList.add("media-input-group");

    const input = document.createElement("input");
    input.type = "text";
    input.name = "mediaUrls[]";
    input.classList.add("shadow-md", "mb-2");

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove";
    removeButton.classList.add("bg-brand-cta", "text-white", "p-1", "ml-2", "rounded");

    removeButton.addEventListener("click", function () {
        mediaInputs.removeChild(inputGroup);
    });

    inputGroup.appendChild(input);
    inputGroup.appendChild(removeButton);
    mediaInputs.appendChild(inputGroup);
});

export async function onCreateListing(event) {
    event.preventDefault();

    const form = event.target;

    const title = form.title.value;
    const tags = form.tags.value
        .split(",")
        .map(tag => tag.trim().toLowerCase())
        .filter(tag => tag);
    const endsAt = form.endsAt.value;
    const description = form.description.value;

    const mediaInputs = form.querySelectorAll("input[name='mediaUrls[]']");
    const media = Array.from(mediaInputs)
        .map(input => input.value.trim())
        .filter(url => url)
        .map(url => ({ url, alt: "Image" }));

    const listingData = { title, tags, endsAt, description, media };

    try {
        const result = await apiRequest(API_AUCTION_LISTINGS, "POST", listingData, true);
        console.log("Listing created:", result);
        showToast({ message: "Listing created successfully!", type: "success" });
        setTimeout(() => {
            window.location.href = `/profile/`;
        }, 2000);
    } catch (error) {
        showToast({ message: "Failed to create listing: " + error.message, type: "error" });
    }
};
