export function createLoadingIndicator(text = "Loading...", size = 80) {

    const container = document.createElement("div");
    container.setAttribute("aria-label", "Loading...");
    container.setAttribute("role", "status");
    container.className = "absolute inset-10 flex items-center justify-center space-x-2";

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 256 256");
    svg.setAttribute("class", "animate-spin stroke-brand-main");
    svg.style.width = `${size}px`;
    svg.style.height = `${size}px`;

    const lines = [
        [128, 32, 128, 64],
        [195.9, 60.1, 173.3, 82.7],
        [224, 128, 192, 128],
        [195.9, 195.9, 173.3, 173.3],
        [128, 224, 128, 192],
        [60.1, 195.9, 82.7, 173.3],
        [32, 128, 64, 128],
        [60.1, 60.1, 82.7, 82.7]
    ];

    lines.forEach(([x1, y1, x2, y2]) => {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("stroke-linecap", "round");
        line.setAttribute("stroke-linejoin", "round");
        line.setAttribute("stroke-width", "24");
        svg.appendChild(line);
    });

    const span = document.createElement("span");
    span.className = "text-4xl font-medium text-brand-main";
    span.textContent = text;

    container.appendChild(svg);
    container.appendChild(span);

    return container;
}