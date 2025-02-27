import { API_AUCTION_LISTINGS, API_AUCTION_PROFILES } from "../global/constants";
import { showToast } from "../global/utils/alert";
import { apiRequest } from "../global/utils/apiRequest";
import { readSingleListing } from "./read";

export async function bids() {
    const listingId = new URLSearchParams(window.location.search).get("id");
    if (!listingId) {
        showToast({ message: "Listing ID not found", type: "error" });
        return;
    }

    try {
        const response = await readSingleListing(listingId);
        const listing = response?.data ?? {};

        const highestBid = listing.bids?.length
            ? Math.max(...listing.bids.map(bid => bid.amount))
            : 0;

        const endDate = new Date(listing.endsAt);
        const formattedEndDate = endDate.toLocaleString();

        const latestBidElement = document.getElementById("latest-bid");
        const endsAtElement = document.getElementById("ends-at");

        if (latestBidElement && endsAtElement) {
            latestBidElement.innerHTML = `Latest bid: <strong>${highestBid} Credits</strong>`;
            endsAtElement.innerHTML = `Bidding ends at: <span>${formattedEndDate}</span>`;
        }
    } catch (error) {
        showToast({ message: "Error fetching bids: " + error.message, type: "error" });
    }
}

export function checkUserStatus() {
    const user = localStorage.getItem("username");
    const noUserMessage = document.getElementById("no-user");
    const bidForm = document.querySelector("form[name='bid-form']");

    if (user) {
        noUserMessage.classList.add("hidden");
        bidForm.classList.remove("hidden");
    } else {
        noUserMessage.classList.remove("hidden");
        bidForm.classList.add("hidden");
    }
}

export async function handleBidSubmission(event) {
    event.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const listingId = params.get("id");
    const bidInput = document.getElementById("bid-amount");
    const bidAmount = Number(bidInput?.value);

    if (!listingId || !bidAmount || bidAmount <= 0) {
        showToast({ message: "Invalid bid amount", type: "warning" });
        return;
    }

    try {

        const response = await readSingleListing(listingId);
        const listing = response?.data ?? {};


        const highestBid = listing.bids?.length
            ? Math.max(...listing.bids.map(bid => bid.amount))
            : 0;

        const user = localStorage.getItem("username");
        if (!user) {
            showToast({ message: "You must be logged in to bid on this listing", type: "error" });
            return;
        }

        const userResponse = await apiRequest(`${API_AUCTION_PROFILES}/${user}`, "GET", null, true);
        const userCredits = userResponse?.data?.credits ?? 0;

        if (bidAmount <= highestBid) {
            showToast({ message: "You bid must be higher than the current bid", type: "warning" });
            return;
        }
        if (bidAmount > userCredits) {
            showToast({ message: "Insufficient credits to place this bid", type: "error" });
            return;
        }

        await apiRequest(`${API_AUCTION_LISTINGS}/${listingId}/bids`, "POST", { amount: bidAmount }, true);
        showToast({ message: "Bid placed successfully!", type: "success" });

        bidInput.value = "";
        await bids();

    } catch (error) {
        showToast({ message: "Error placing bid: " + error.message, type: "error" });
    }
}