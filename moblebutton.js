// Select the button and the menu container
const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

// Add click event to toggle the 'open' class
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});