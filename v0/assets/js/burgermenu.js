document.addEventListener("DOMContentLoaded", function () {
    var navBar = document.querySelector("nav");
    var links = document.querySelectorAll("nav a");
    var viewportWidth = window.innerWidth;
    var burgerSpan = document.createElement("span");
    var burgerClicked = false;

    burgerSpan.textContent = "☰";
    navBar.prepend(burgerSpan);

    function toggleMenu() {
        if (viewportWidth < 480) {
            burgerSpan.style.display = "block";
            for (var i = 0; i < links.length; i++) {
                links[i].style.display = burgerClicked ? "block" : "none";
            }
        } else {
            burgerSpan.style.display = "none";
            for (var i = 0; i < links.length; i++) {
                links[i].style.display = "block";
            }
        }
    }

    toggleMenu();  // Aufruf der Funktion beim Laden der Seite

    window.addEventListener('resize', function () {
        viewportWidth = window.innerWidth;
        toggleMenu();  // Aufruf der Funktion beim Resize-Event
    });

    burgerSpan.addEventListener("click", function() {
        burgerClicked = !burgerClicked;
        toggleMenu();
    });
});
