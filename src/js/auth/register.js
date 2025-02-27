import { API_AUTH_REGISTER } from "../global/constants";
import { showToast } from "../global/utils/alert";
import { apiRequest } from "../global/utils/apiRequest";

export function register(data) {
    return apiRequest(API_AUTH_REGISTER, "POST", data);
};

export async function onRegister(event) {
    event.preventDefault();

    const form = event.target;
    const fieldset = form.querySelector("fieldset");
    const button = form.querySelector("button");
    const originalButtonText = button.textContent;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    fieldset.disabled = true;
    button.disabled = true;
    button.textContent = "Registering...";

    try {
        const response = await register(data);

        setTimeout(() => {
            window.location.href = "/auth/login/";
        }, 1000);
    } catch (error) {
        showToast({ message: "Registration error: " + error.message, type: "error" });
    } finally {
        fieldset.disabled = false;
        button.disabled = false;
        button.textContent = originalButtonText;
    }
}