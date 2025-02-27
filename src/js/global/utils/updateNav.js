export function updateNav() {
    const username = localStorage.getItem("username");

    const loginLinks = document.querySelectorAll('a[href="/auth/login/"]');
    const registerLinks = document.querySelectorAll('a[href="/auth/register/"]');
    const profileLinks = document.querySelectorAll('a[href="/profile/"]');
    const logoutButtons = document.querySelectorAll("#logoutButton, #logoutButtonMobile");

    if (username) {
        loginLinks.forEach(link => link.style.display = "none");
        registerLinks.forEach(link => link.style.display = "none");
        profileLinks.forEach(link => link.style.display = "block");
        logoutButtons.forEach(button => button.style.display = "block");
    } else {
        loginLinks.forEach(link => link.style.display = "block");
        registerLinks.forEach(link => link.style.display = "block");
        profileLinks.forEach(link => link.style.display = "none");
        logoutButtons.forEach(button => button.style.display = "none");
    }
}




