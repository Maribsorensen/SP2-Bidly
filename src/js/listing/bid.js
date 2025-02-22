import { API_AUCTION_LISTINGS } from "../global/constants";
import { apiRequest } from "../global/utils/apiRequest";
import { readSingleListing } from "./read";

export async function bids() {
  const params = new URLSearchParams(window.location.search);
  const listingId = params.get("id");

  if (!listingId) {
    console.error("No listing ID found in URL");
    return;
  }

  try {
    const response = await readSingleListing(listingId);
    const listing = response?.data ?? {};

    const latestBid = document.getElementById("latest-bid");
    const endsAt = document.getElementById("ends-at");

    const highestBid = listing.bids && listing.bids.length > 0
      ? Math.max(...listing.bids.map(bid => bid.amount))
      : 0;

    latestBid.innerHTML = `Latest bid: <strong>${highestBid} Credits</strong>`;
    endsAt.innerHTML = `Bidding ends at: <span>${new Date(listing.endsAt).toLocaleString()}</span>`;
  } catch (error) {
    console.error("Error fetching listing:", error);
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
  const bidAmount = Number(bidInput.value);

  if (!listingId || !bidAmount) return;

  try {
    await apiRequest(`${API_AUCTION_LISTINGS}/${listingId}/bids`, "POST", { amount: bidAmount }, true);
    displayListing();
    bidInput.value = "";
  } catch (error) {
    console.error("Error placing bid:", error);
  }
}