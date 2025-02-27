import { onLogin } from "../../auth/login";  // Import the 'onLogin' function from the login module

const form = document.forms.login;  // Get the login form element by its 'name' attribute ('login')

form.addEventListener("submit", onLogin);  // Add an event listener to the form for the 'submit' event, which calls the 'onLogin' function when the form is submitted.
