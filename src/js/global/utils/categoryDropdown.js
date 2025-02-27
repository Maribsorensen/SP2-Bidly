
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

  document.querySelectorAll(".category-menu a").forEach((categoryLink) => {
    categoryLink.addEventListener("click", (event) => {
      event.preventDefault();
      const selectedCategory = categoryLink.textContent.trim();
      window.location.href = `/listing/?category=${encodeURIComponent(selectedCategory)}`;
    });
  });
}
