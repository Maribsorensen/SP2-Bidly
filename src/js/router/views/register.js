import { onRegister } from "../../auth/register";

const form = document.forms.register;

form.addEventListener("submit", onRegister);