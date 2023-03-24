// Toggling dark mode
const darkModeToggle = document.getElementById('darkModeToggle');
const darkModeText = document.querySelector('#darkModeToggle h4');
const darkModeClass = 'dark-mode';
const lightModeClass = 'light-mode';
const modeIcon = document.getElementById('modeIcon');
const sunIconSrc = './assets/images/icons/icons8-light-mode-78.png'; 
const moonIconSrc = './assets/images/icons/icons8-crescent-moon-64.png';

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle(darkModeClass);
    document.body.classList.toggle(lightModeClass);

    if (document.body.classList.contains(darkModeClass)) {
        modeIcon.src = sunIconSrc;
        darkModeText.textContent = 'Light Mode';
    } else {
        modeIcon.src = moonIconSrc;
        darkModeText.textContent = 'Dark Mode';
    }
});

// Back to home page
document.getElementById('back-button').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
// getting selected country via local storage
const selectedCountry = JSON.parse(localStorage.getItem('selectedCountry'));

// Update the DOM with the country data
const countryNameEl = document.getElementById('country-name');
const nativeNameEl = document.getElementById('native-name');
const populationEl = document.getElementById('population');
const region = document.getElementById('region');
const subregion = document.getElementById('sub-region');
const capital = document.getElementById('capital');
const topLevelDomain = document.getElementById('tld');
const currency = document.getElementById('currency');
const languages = document.getElementById('languages');

countryNameEl.textContent = selectedCountry.name.common;
nativeNameEl.textContent = Object.values(selectedCountry.name.nativeName)[0].common;
populationEl.textContent = selectedCountry.population;
region.textContent = selectedCountry.region;
subregion.textContent = selectedCountry.subregion;
capital.textContent = selectedCountry.capital[0];
topLevelDomain.textContent = selectedCountry.tld.join(", ");
// Currency is more complicated 
const currencyCode = Object.keys(selectedCountry.currencies)[0]; // assumes there is only one currency
const currencyName = selectedCountry.currencies[currencyCode].name;
currency.textContent = currencyName;
languages.textContent = Object.values(selectedCountry.languages).join(", ");
console.log(selectedCountry.name);