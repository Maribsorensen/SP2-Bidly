export function updateNav() {
  const username = localStorage.getItem("username");

  const loginLinks = document.querySelectorAll('a[href="/auth/login/"]');
  const registerLinks = document.querySelectorAll('a[href="/auth/register/"]');
  const logoutButtons = document.querySelectorAll("#logoutButton, #logoutButtonMobile");

  if (username) {
    loginLinks.forEach(link => link.style.display = "none");
    registerLinks.forEach(link => link.style.display = "none");
    logoutButtons.forEach(button => button.style.display = "block");
  } else {
    loginLinks.forEach(link => link.style.display = "block");
    registerLinks.forEach(link => link.style.display = "block");
    logoutButtons.forEach(button => button.style.display = "none");
  }
}

export function toggleHamburgerMenu() {
  const hamburgerButton = document.querySelector("#hamburger-button");
  const hamburgerMenu = document.querySelector("#hamburger-menu");

  hamburgerButton.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("hidden");
  });
}

export function setupCategoryDropdown() {
  const categoryButton = document.querySelector(".category-button");
  const categoryMenu = document.querySelector(".category-menu");

  if (!categoryButton || !categoryMenu) return;

  categoryButton.addEventListener("click", (event) => {
    event.preventDefault();
    categoryMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", (event) => {
    if (!categoryButton.contains(event.target) && !categoryMenu.contains(event.target)) {
      categoryMenu.classList.add("hidden");
    }
  });
}


