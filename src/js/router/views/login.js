import { onLogin } from "../../auth/login";

const form = document.forms.login;

form.addEventListener("submit", onLogin);