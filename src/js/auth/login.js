import { API_AUTH_LOGIN } from "../global/constants";
import { showToast } from "../global/utils/alert";
import { apiRequest } from "../global/utils/apiRequest";


export function login(data) {
    return apiRequest(API_AUTH_LOGIN, "POST", data);
};

export async function onLogin(event) {
    event.preventDefault();

    const form = event.target;
    const fieldset = form.querySelector("fieldset");
    const button = form.querySelector("button");
    const originalButtonText = button.textContent;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    fieldset.disabled = true;
    button.disabled = true;
    button.textContent = "Logging in...";

    try {
        const response = await login(data);

        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("username", response.data.name);

        setTimeout(() => {
            window.location.href = "/";
        }, 1000);
    } catch (error) {
        showToast({ message: "Login error: " + error.message, type: "error" });
    } finally {
        fieldset.disabled = false;
        button.disabled = false;
        button.textContent = originalButtonText;
    }
}