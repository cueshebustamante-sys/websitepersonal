// ===== Map Modal =====
const mapModal = document.getElementById("map-modal");
const openMap = document.getElementById("open-map");
const closeMap = document.querySelector(".close-map");

openMap.addEventListener("click", function(e) {
    e.preventDefault();
    mapModal.style.display = "flex";
});

closeMap.addEventListener("click", function() {
    mapModal.style.display = "none";
});

window.addEventListener("click", function(e) {
    if (e.target === mapModal) {
        mapModal.style.display = "none";
    }
});

// ===== Scroll-Up Button =====
const scrollBtn = document.querySelector(".scroll-up-btn");

// Show/hide button on scroll
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {  // show after scrolling 300px
        scrollBtn.classList.add("show");
    } else {
        scrollBtn.classList.remove("show");
    }
});

// Scroll to top on button click
scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
