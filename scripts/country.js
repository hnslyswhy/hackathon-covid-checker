/************* get data **************/
const allCountries = {
  method: "GET",
  url: "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/",
  headers: {
    "x-rapidapi-host":
      "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
    "x-rapidapi-key": "e8c6051701msh19283f80b63e370p1f39d6jsn62d88c9e7aaf",
  },
};

let global;
let countryList;
const spinner = document.querySelector(".loadingSpinner");

axios
  .request(allCountries)
  .then(function (response) {
    countryList = response.data.slice(2);
    global = response.data[0];
  })
  .then(() => {
    displayGlobal(global);
    formSearch(countryList);
    spinner.style.display = "none";
  })
  .catch(function (error) {
    console.error(error);
  });

/*********** display global data  ****************/
//practice class
class CountryC {
  constructor(
    country,
    active,
    rate,
    newCases,
    newDeaths,
    newRecovered,
    totalCases,
    totalDeaths,
    totalRecovered
  ) {
    this.country = country;
    this.active = active;
    this.rate = rate;
    this.newCases = newCases;
    this.newDeaths = newDeaths;
    this.newRecovered = newRecovered;
    this.totalCases = totalCases;
    this.totalDeaths = totalDeaths;
    this.totalRecovered = totalRecovered;
  }
  render() {
    return `
     <div class="summaryCard">
          <p class="summaryCard-headline">${this.country}</p>
          <p class="summaryCard-info">Active: <span class="summaryCard-mun">${this.active}</span></p>
          <p class="summaryCard-info">Case Fatality Rate: <span class="summaryCard-mun">${this.rate}</span></p>
          <p class="summaryCard-info">New Cases:<span class="summaryCard-mun">${this.newCases}</span></p>
          <p class="summaryCard-info">New Deaths:<span class="summaryCard-mun">${this.newDeaths}</span></p>
          <p class="summaryCard-info">New Recovered:<span class="summaryCard-mun">${this.newRecovered}</span></p>
          <p class="summaryCard-info">Total Cases:<span class="summaryCard-mun">${this.totalCases}</span></p>
          <p class="summaryCard-info">Total Deaths:<span class="summaryCard-mun">${this.totalDeaths}</span></p>
          <p class="summaryCard-info">Total Recovered:<span class="summaryCard-mun">${this.totalRecovered}</span></p>
        </div>
    `;
  }
}

function displayGlobal(obj) {
  const {
    Country,
    ActiveCases,
    Case_Fatality_Rate,
    NewCases,
    NewDeaths,
    NewRecovered,
    TotalCases,
    TotalDeaths,
    TotalRecovered,
  } = obj;
  let worldData = new CountryC(
    Country,
    ActiveCases,
    Case_Fatality_Rate,
    NewCases,
    NewDeaths,
    NewRecovered,
    TotalCases,
    TotalDeaths,
    TotalRecovered
  );
  const overview = document.querySelector(".global");
  overview.innerHTML = worldData.render();
}

/************ search by country **************/
function formSearch(arr) {
  const form = document.querySelector(".form");
  let searchTarget;
  let targetCountry;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    searchTarget = e.target.country.value;
    console.log(searchTarget);
    targetCountry = arr.find(
      (item) => item.Country.toLowerCase() === searchTarget.toLowerCase()
    );
    e.target.reset();
    if (targetCountry) {
      displayCountry(targetCountry);
      getLonLat(targetCountry);
    }
  });
}

function displayCountry(obj) {
  const {
    Country,
    ActiveCases,
    Case_Fatality_Rate,
    NewCases,
    NewDeaths,
    NewRecovered,
    TotalCases,
    TotalDeaths,
    TotalRecovered,
  } = obj;
  let countryData = new CountryC(
    Country,
    ActiveCases,
    Case_Fatality_Rate,
    NewCases,
    NewDeaths,
    NewRecovered,
    TotalCases,
    TotalDeaths,
    TotalRecovered
  );
  const countryView = document.querySelector(".country");
  countryView.innerHTML = countryData.render();
}

/////////////
//use the searching name to get the lon and lat of the country from the object
//set the lon and lat in the map to get a marker on that country
function getLonLat(obj) {
  let selectedCountry = countryLocation.find(
    (item) => item.country.toLowerCase() === obj.Country.toLowerCase()
  );
  console.log(selectedCountry.latitude, selectedCountry.longitude);
  displayOnMap(obj, [selectedCountry.latitude, selectedCountry.longitude]);
}

var map = L.map("map").setView([60, -0.09], 1.2);

L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
  attribution: "Hackathon- Covid Board by Huanyu & John",
}).addTo(map);

function displayOnMap(obj, arr) {
  console.log(obj);
  L.marker([arr[0], arr[1]])
    .addTo(map)
    .bindPopup(`${obj.Country} New Cases: ${obj.NewCases}`)
    .openPopup();
}
