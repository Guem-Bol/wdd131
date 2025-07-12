// scripts/getdates.js

document.addEventListener('DOMContentLoaded', function() {
    // --- Get Dates and Last Modified Logic ---
    // (Ensure your previous JavaScript for the footer is here)

    // Last Modified Date
    const lastModifiedElement = document.getElementById("lastModified");
    if (lastModifiedElement) {
        lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
    }

    // Current Year for Copyright
    const currentYearElement = document.getElementById("currentYear");
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // --- Hamburger Menu Logic ---

    // Get references to the button and the navigation menu
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    // Ensure elements exist before adding the event listener
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            // 1. Toggle the 'open' class on the navigation list
            mainNav.classList.toggle('open');
            
            // 2. Toggle the button text (hamburger ☰ vs. 'X' ✕)
            if (mainNav.classList.contains('open')) {
                menuToggle.textContent = '✕'; // 'X' symbol
            } else {
                menuToggle.textContent = '☰'; // Hamburger symbol
            }
        });
    }
});