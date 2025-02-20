import { onCreateListing } from "../../listing/create";

const form = document.forms.createListing;

form.addEventListener("submit", onCreateListing);