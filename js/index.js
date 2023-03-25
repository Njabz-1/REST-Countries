// Toggling dark mode
const darkModeToggle = document.getElementById("darkModeToggle");
const darkModeText = document.querySelector("#darkModeToggle h4");
const darkModeClass = "dark-mode";
const lightModeClass = "light-mode";
const modeIcon = document.getElementById("modeIcon");
const sunIconSrc = "./assets/images/icons/icons8-light-mode-78.png";
const moonIconSrc = "./assets/images/icons/icons8-crescent-moon-64.png";

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle(darkModeClass);
  document.body.classList.toggle(lightModeClass);

  if (document.body.classList.contains(darkModeClass)) {
    modeIcon.src = sunIconSrc;
    darkModeText.textContent = "Light Mode";
    localStorage.setItem("mode", darkModeClass);
  } else {
    modeIcon.src = moonIconSrc;
    darkModeText.textContent = "Dark Mode";
    localStorage.setItem("mode", lightModeClass);
  }
});

// Storing what mode the user has selected
function applySavedMode(){
const savedMode = localStorage.getItem("mode");

document.body.className = savedMode;

if (savedMode === darkModeClass) {
  modeIcon.src = sunIconSrc;
  darkModeText.textContent = "Light Mode";
} else {
  modeIcon.src = moonIconSrc;
  darkModeText.textContent = "Dark Mode";
}
}
applySavedMode();


// Search functionality
const searchInput = document.querySelector(".form-control");

searchInput.addEventListener("input", handleSearch);

// handleSearch function
function handleSearch(event) {
  const searchTerm = event.target.value.trim().toLowerCase();
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().startsWith(searchTerm)
  );

  displayCountries(filteredCountries);
}

// Displaying countries function
function displayCountries(filteredCountries) {
  const countriesContainer = document.getElementById("countries");
  countriesContainer.innerHTML = ""; // Clear the previous displayed countries

  const container = document.createElement("div");
  container.className = "custom-container px-4";
  const row = document.createElement("div");
  row.className = "row g-5";
  container.appendChild(row);

  countriesContainer.appendChild(container);

  filteredCountries.forEach((country) => {
    // Create country card and add it to the countries container
    const countryCard = createCountryCard(country);
    row.appendChild(countryCard);
  });

  // Show "No countries found..." if the filtered list is empty
  if (filteredCountries.length === 0) {
    const noResultsMessage = document.createElement("p");
    noResultsMessage.textContent = "No countries found...";
    noResultsMessage.className = "text-center mt-5";
    countriesContainer.appendChild(noResultsMessage);
  }
}


// Fetch request of all countries
async function getCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
}
let currentPage = 1;
const countriesPerPage = 8;

let countries = [];
async function main() {
countries = await getCountries();
  countries
    .sort((a, b) => {
      if (a.name.common < b.name.common) {
        return 1;
      }
      if (a.name.common > b.name.common) {
        return -1;
      }
      return 0;
    })
    .reverse();
  console.log(countries);
  const countriesContainer = document.getElementById("countries");
  const container = document.createElement("div");
  container.className = "custom-container px-4";
  const row = document.createElement("div");
  row.className = "row g-5";
  container.appendChild(row);

  countriesContainer.appendChild(container);

  loadMoreCountries(countries, row);

  // Add the scroll event listener
  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.scrollY >=
      document.documentElement.offsetHeight - 1
    ) {
      currentPage++;
      loadMoreCountries(countries, row);
    }
  });
}

main();

//   Creating country card
function createCountryCard(country) {
  // Create a column element
  const col = document.createElement("div");
  col.className = "col-md-3";

  const card = document.createElement("div");
  card.className = "card";

  const flag = document.createElement("img");
  flag.src = country.flags ? country.flags.png : "";
  flag.className = "card-img-top";
  flag.style.width = "100%"; // Adjust the width as needed
  flag.style.height = "200px"; // Adjust the height as needed
  flag.style.objectFit = "cover";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const countryName = document.createElement("h5");
  countryName.className = "card-title";
  countryName.textContent = country.name.common;

  const countryRegion = document.createElement("p");
  countryRegion.className = "card-text";
  countryRegion.textContent = `Region: ${country.region}`;

  const countryCapital = document.createElement("p");
  countryCapital.className = "card-text";
  countryCapital.textContent = `Capital: ${country.capital}`;

  const countryPopulation = document.createElement("p");
  countryPopulation.className = "card-text";
  countryPopulation.textContent = `Population: ${country.population}`;

  cardBody.appendChild(countryName);
  cardBody.appendChild(countryPopulation);
  cardBody.appendChild(countryRegion);
  cardBody.appendChild(countryCapital);

  card.appendChild(flag);
  card.appendChild(cardBody);

  // Append the card to the column element
  col.appendChild(card);

  // Add click event listener to card element
  card.addEventListener("click", () => {
    // Save the selected country data in the local storage
    localStorage.setItem("selectedCountry", JSON.stringify(country));
    // Redirect to the country.html page
    window.location.href = "country.html";
  });
  console.log(localStorage.getItem("selectedCountry"));
  return col;
}

function loadMoreCountries(countries, row) {
  const startIndex = (currentPage - 1) * countriesPerPage;
  const endIndex = startIndex + countriesPerPage;

  for (let i = startIndex; i < endIndex && i < countries.length; i++) {
    const countryCard = createCountryCard(countries[i]);
    row.appendChild(countryCard);
  }
}
