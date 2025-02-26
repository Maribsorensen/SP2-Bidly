import { authGuard } from "../../global/utils/authGuard";
import { loadListingData, onEditListing } from "../../listing/update";

loadListingData();

const form = document.forms.editListing;
form.addEventListener("submit", onEditListing);
authGuard();