import { authGuard } from "../../global/utils/authGuard";
import { loadProfileData, onEditProfile } from "../../profile/update";

loadProfileData();

const form = document.forms.editProfile;
form.addEventListener("submit", onEditProfile);
authGuard();