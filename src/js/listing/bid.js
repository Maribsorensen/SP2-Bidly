import { API_AUCTION_LISTINGS, API_AUCTION_PROFILES } from "../global/constants";
import { showToast } from "../global/utils/alert";
import { apiRequest } from "../global/utils/apiRequest";
import { readSingleListing } from "./read";

/**
 * Fetches the current bid details of a listing and updates the UI.
 * It displays the highest bid and the end date of the auction.
 * If the auction has ended, it hides the bid form and displays an "Auction Ended" message.
 * 
 * @returns {Promise<void>} - Returns a promise that resolves once the bid details have been updated.
 */
export async function bids() {
  const listingId = new URLSearchParams(window.location.search).get("id");
  if (!listingId) {
    showToast({ message: "Listing ID not found", type: "error" });
    return;
  }

  try {
    const response = await readSingleListing(listingId);
    const listing = response?.data ?? {};

    const currentTime = new Date();
    const endDate = new Date(listing.endsAt);

    if (currentTime > endDate) {
      const bidForm = document.querySelector("form[name='bid-form']");
      const expiredMessage = document.createElement("p");
      expiredMessage.classList.add("text-center", "text-brand-cta", "font-paragraph", "text-lg");
      expiredMessage.innerText = "The auction has ended. No more bids can be placed on this item.";

      if (bidForm) {
        bidForm.classList.add("hidden");
        bidForm.parentElement.appendChild(expiredMessage);
      }
      return;
    }

    const highestBid = listing.bids?.length
      ? Math.max(...listing.bids.map(bid => bid.amount))
      : 0;

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

/**
 * Checks whether a user is logged in and adjusts the visibility of the bid form accordingly.
 * If the user is logged in, the bid form is shown, and the "no user" message is hidden.
 * 
 * @returns {void} - This function does not return anything; it only adjusts the UI based on the user's login status.
 */
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

/**
 * Handles the bid submission process. It validates the bid amount, checks if the user has enough credits,
 * and submits the bid if all conditions are met.
 * 
 * @param {Event} event - The submit event from the bid form.
 * 
 * @returns {Promise<void>} - A promise that resolves once the bid submission process is complete.
 */
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
