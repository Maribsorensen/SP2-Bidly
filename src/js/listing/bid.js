import { API_AUCTION_LISTINGS, API_AUCTION_PROFILES } from "../global/constants";
import { apiRequest } from "../global/utils/apiRequest";
import { readSingleListing } from "./read";

export async function bids() {
  const listingId = new URLSearchParams(window.location.search).get("id");
  if (!listingId) {
    console.error("No listing ID found in URL");
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
    } else {
      console.error("Missing bid-related elements in the HTML.");
    }

  } catch (error) {
    console.error("Error fetching bids:", error);
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
    console.error("Invalid bid amount");
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
      console.error("User not logged in");
      return;
    }

    const userResponse = await apiRequest(`${API_AUCTION_PROFILES}/${user}`, "GET", null, true);
    const userCredits = userResponse?.data?.credits ?? 0;

    if (bidAmount <= highestBid) {
      alert("Your bid must be higher than the current highest bid.");
      return;
    }
    if (bidAmount > userCredits) {
      alert("Insufficient credits to place this bid.");
      return;
    }

    await apiRequest(`${API_AUCTION_LISTINGS}/${listingId}/bids`, "POST", { amount: bidAmount }, true);

    bidInput.value = "";
    await bids();

  } catch (error) {
    console.error("Error placing bid:", error);
  }
}