import { API_AUCTION_PROFILES } from "../global/constants";
import { apiRequest } from "../global/utils/apiRequest";

export async function readProfile(username) {
    const url = new URL(`${API_AUCTION_PROFILES}/${username}`);
    url.searchParams.append("_listings", "true");
    url.searchParams.append("_wins", "true");

    return apiRequest(url, "GET", null, true);
}