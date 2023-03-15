// Toggling dark mode

const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeText = document.querySelector('#darkModeToggle h4');
const darkModeClass = 'dark-mode';
const lightModeClass = 'light-mode';

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle(darkModeClass);
    document.body.classList.toggle(lightModeClass);

    if (document.body.classList.contains(darkModeClass)) {
        darkModeText.textContent = 'Light Mode';
    } else {
        darkModeText.textContent = 'Dark Mode';
    }
});