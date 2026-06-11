const navbar = document.querySelector(".navbar");
const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");

window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
        navbar.classList.add("show");
    } else {
        navbar.classList.remove("show");
    }
});

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
});