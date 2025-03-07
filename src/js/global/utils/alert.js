/**
 * Displays a toast message on the screen. The toast can be of different types (success, error, warning, info),
 * and it can also display a confirmation dialog.
 *
 * @param {Object} options - The configuration object for the toast.
 * @param {string} options.message - The message to display in the toast.
 * @param {("success" | "error" | "warning" | "info" | "confirm")} [options.type="info"] - The type of the toast (success, error, warning, info, or confirm). Default is "info".
 * @param {number} [options.duration=3000] - The duration (in milliseconds) for which the toast will be displayed. Default is 3000 ms (3 seconds).
 * @param {function} [options.onConfirm] - The callback function to be executed when the user confirms a "confirm" type toast.
 * @param {function} [options.onCancel] - The callback function to be executed when the user cancels a "confirm" type toast.
 * 
 */
export function showToast({ message, type = "info", duration = 3000, onConfirm, onCancel }) {
  const typeStyles = {
    success: "bg-green-200 text-green-800 font-paragraph",
    error: "bg-red-200 text-red-800 font-paragraph",
    warning: "bg-orange-200 text-yellow-800 font-paragraph",
    info: "bg-blue-200 text-blue-800 font-paragraph",
  };

  const iconPaths = {
    success: "M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z",
    error: "M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z",
    warning: "M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z",
    info: "M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z",
  };

  let toastContainer = document.querySelector("#toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "fixed top-10 left-1/2 transform -translate-x-1/2 space-y-2 z-50 flex flex-col items-center";
    document.body.appendChild(toastContainer);
  }

  if (type === "confirm") {
    const overlay = document.createElement("div");
    overlay.className = "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50";

    const dialog = document.createElement("div");
    dialog.className = "bg-white p-5 rounded-lg shadow-lg w-80 text-center";

    const text = document.createElement("p");
    text.className = "text-lg font-paragraph";
    text.textContent = message;

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "mt-4 flex justify-center space-x-4";

    const yesButton = document.createElement("button");
    yesButton.className = "px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 font-paragraph";
    yesButton.textContent = "Yes";
    yesButton.addEventListener("click", () => {
      if (onConfirm) onConfirm();
      document.body.removeChild(overlay);
    });

    const noButton = document.createElement("button");
    noButton.className = "px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 font-paragraph";
    noButton.textContent = "No";
    noButton.addEventListener("click", () => {
      if (onCancel) onCancel();
      document.body.removeChild(overlay);
    });

    buttonContainer.appendChild(yesButton);
    buttonContainer.appendChild(noButton);
    dialog.appendChild(text);
    dialog.appendChild(buttonContainer);
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    return;
  }

  const toast = document.createElement("div");
  toast.className = `flex items-center p-4 rounded-md shadow-md ${typeStyles[type]} transition-all transform scale-95 opacity-0 max-w-md w-full justify-center`;

  const icon = document.createElement("svg");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.className = "w-6 h-6 mr-3 fill-current";
  const path = document.createElement("path");
  path.setAttribute("d", iconPaths[type]);
  icon.appendChild(path);

  const text = document.createElement("span");
  text.className = "text-lg font-paragraph";
  text.textContent = message;

  const closeButton = document.createElement("button");
  closeButton.className = "ml-4 text-gray-600 hover:text-gray-800 focus:outline-none font-paragraph";
  closeButton.textContent = "✕";
  closeButton.onclick = () => {
    toast.classList.remove("opacity-100", "scale-100");
    setTimeout(() => toast.remove(), 300);
  };

  toast.appendChild(icon);
  toast.appendChild(text);
  toast.appendChild(closeButton);
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("opacity-100", "scale-100");
  }, 10);

  setTimeout(() => {
    toast.classList.remove("opacity-100", "scale-100");
    setTimeout(() => {
      toast.remove();
      if (toastContainer.childElementCount === 0) {
        toastContainer.remove();
      }
    }, 300);
  }, duration);
}
