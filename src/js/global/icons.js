/**
 * Dynamically loads the Font Awesome script by adding it to the document head.
 * This script is required for rendering Font Awesome icons on the page.
 * 
 * The script is loaded asynchronously and includes the Font Awesome kit identified by the provided script URL.
 * 
 */
export function loadFontAwesome() {
  let script = document.createElement('script');
  script.src = 'https://kit.fontawesome.com/2853574374.js';
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
}
