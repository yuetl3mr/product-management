// Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination) {
    const url = new URL(window.location.href);
    buttonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            if (page) {
                url.searchParams.set("page", page);
            } else {
                url.searchParams.delete("page");
            }
            window.location.href = url.href;
        });
    });
}
// End Pagination

// Search
const searchButton = document.getElementById('searchButton');
if (searchButton) {
    const url = new URL('/search' ,window.location.origin);
    searchButton.addEventListener('click', function() {
        var keyword = document.getElementById('searchInput').value;
        if (keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    });
}
// End Search

// Single product slider
const MainImg = document.getElementById("MainImg");
const smallImgs = document.querySelectorAll(".small-img");

smallImgs.forEach(img => {
    img.addEventListener("click", () => {
        MainImg.src = img.src;
    });
});
// End Single product slider
