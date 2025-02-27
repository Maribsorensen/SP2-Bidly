/**
 * Sets up the category dropdown functionality, including toggling the visibility of the dropdown,
 * handling clicks outside to hide the dropdown, and navigating to a new page when a category is selected.
 */
export function setupCategoryDropdown() {
  const categoryButton = document.querySelector(".category-button");
  const categoryMenu = document.querySelector(".category-menu");

  // Return if the category button or menu doesn't exist
  if (!categoryButton || !categoryMenu) return;

  /**
   * Toggles the visibility of the category menu when the category button is clicked.
   * 
   * @param {Event} event - The click event.
   */
  categoryButton.addEventListener("click", (event) => {
    event.preventDefault();
    categoryMenu.classList.toggle("hidden");
  });

  /**
   * Closes the category menu if the user clicks outside of the category button or menu.
   * 
   * @param {Event} event - The click event.
   */
  document.addEventListener("click", (event) => {
    if (!categoryButton.contains(event.target) && !categoryMenu.contains(event.target)) {
      categoryMenu.classList.add("hidden");
    }
  });

  /**
   * Navigates to a new URL based on the selected category.
   * If the category is "all", redirects to the main listing page.
   * Otherwise, appends the selected category as a query parameter to the URL.
   * 
   * @param {Event} event - The click event triggered when a category link is clicked.
   */
  document.querySelectorAll(".category-menu a").forEach((categoryLink) => {
    categoryLink.addEventListener("click", (event) => {
      event.preventDefault();

      const selectedCategory = categoryLink.textContent.trim();

      if (selectedCategory.toLowerCase() === "all") {
        window.location.href = "/listing/";
      } else {
        window.location.href = `/listing/?category=${encodeURIComponent(selectedCategory)}`;
      }
    });
  });
}
