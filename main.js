document.addEventListener("DOMContentLoaded", function () {
    const scrollContainer = document.querySelector(".scroll-container");
    const scrollbar = document.createElement("div");
    scrollbar.classList.add("custom-scrollbar");
    document.body.appendChild(scrollbar);

    function updateScrollbar() {
        const containerHeight = scrollContainer.clientHeight;
        const contentHeight = scrollContainer.scrollHeight;
        const scrollbarHeight = (containerHeight / contentHeight) * containerHeight;
        scrollbar.style.height = `${scrollbarHeight}px`;
        scrollbar.style.top = `${(scrollContainer.scrollTop / contentHeight) * containerHeight}px`;
    }

    scrollContainer.addEventListener("scroll", updateScrollbar);

    let isDragging = false;
    let startY, startScrollTop;

    scrollbar.addEventListener("mousedown", (e) => {
        isDragging = true;
        startY = e.clientY;
        startScrollTop = scrollContainer.scrollTop;
        document.body.classList.add("no-select");
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const deltaY = e.clientY - startY;
        const scrollAmount = (deltaY / scrollContainer.clientHeight) * scrollContainer.scrollHeight;
        scrollContainer.scrollTop = startScrollTop + scrollAmount;
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        document.body.classList.remove("no-select");
    });

    updateScrollbar();
});