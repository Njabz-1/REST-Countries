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

// Fetch request of all countries
async function getCountries(){
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching countries:", error);
        return [];
      }
}

async function main() {
    const countries = await getCountries();
    console.log(countries);
    const countriesContainer = document.getElementById('countries');

    countries.forEach(country => {
        const countryCard = createCountryCard(country);
        countriesContainer.appendChild(countryCard);
    });
  }
  
  main();

  function createCountryCard(country) {
    const card = document.createElement('div');
    card.className = 'card';

    const flag = document.createElement('img');
    flag.src = country.flags.png;
    flag.className = 'card-img-top';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const countryName = document.createElement('h5');
    countryName.className = 'card-title';
    countryName.textContent = country.name.common;

    const countryRegion = document.createElement('p');
    countryRegion.className = 'card-text';
    countryRegion.textContent = `Region: ${country.region}`;

    const countryCapital = document.createElement('p');
    countryCapital.className = 'card-text';
    countryCapital.textContent = `Capital: ${country.capital}`;

    const countryPopulation = document.createElement('p');
    countryPopulation.className = 'card-text';
    countryPopulation.textContent = `Population: ${country.population}`;

    cardBody.appendChild(countryName);
    cardBody.appendChild(countryPopulation);
    cardBody.appendChild(countryRegion);
    cardBody.appendChild(countryCapital);


    card.appendChild(flag);
    card.appendChild(cardBody);

    return card;
}