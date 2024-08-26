// Sidebar Expand
const sidebar = document.querySelector('.sidebar');
const toggle = document.querySelector('.toggle');
const content = document.querySelector('.content');

toggle.addEventListener('click', () => {
    sidebar.classList.toggle('close');
    if (sidebar.classList.contains('close')) {
        content.style.marginLeft = '20px'; 
    } else {
        content.style.marginLeft = '200px'; 
    }
});

// Button Status
const buttonsStatus = document.querySelectorAll("[button-status]");
if(buttonsStatus.length > 0) {
    let url = new URL(window.location.href);

    buttonsStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");

            if(status) {
                url.searchParams.set("status", status);
            } else {
                url.searchParams.delete("status");
            }

            window.location.href = url.href;
        });
    });
}
// End Button Status 

// Form search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
    let url = new URL(window.location.href) ;

    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();  
        const keyword = e.target.elements.keyword.value;

        if (keyword) {
            url.searchParams.set("keyword", keyword);   
        } else {
            url.searchParams.delete("keyword");
        }

        window.location.href = url.href;
    });
}
// End Form search


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

// Show Alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {  
    const time = parseInt(showAlert.getAttribute("data-time"));
    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time);
}
// End Show Alert 