export function loadFontAwesome() {
  let script = document.createElement('script');
  script.src = 'https://kit.fontawesome.com/2853574374.js';
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
}
