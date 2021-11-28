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
    sortFunc(countryList, "Country");
    sortByName(countryList);
    sortByCases(countryList);
  })
  .then(() => {
    displayGlobal(global);
    //displayAllCountry(countryList);
    formSearch(countryList);
    spinner.style.display = "none";
  })
  .catch(function (error) {
    console.error(error);
  });

// sort data
function sortFunc(arr, key) {
  return arr.sort((a, b) => {
    var x = a[key];
    var y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}
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
  // add datalist
  const formInput = document.querySelector(".form-entry");
  const countryData = document.createElement("datalist");
  countryData.id = "search-country";
  formInput.insertAdjacentElement("afterend", countryData);
  arr.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.Country;
    countryData.append(option);
  });

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
      const countrySection = document.querySelector(".country");
      countrySection.style.display = "block";
      displayCountry(targetCountry);
      getLonLat(targetCountry);
    } else {
      displayErrorMessage();
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

function displayErrorMessage() {
  const countrySection = document.querySelector(".country");
  countrySection.innerHTML =
    "<p>Results Not Found. <br> Please Check If The Spelling Is Correct <br> Or Try Another Name of This Country</p>";
  countrySection.classList.add("error");
  return countrySection;
}

/************** map ****************/
//display map
let map = L.map("map").setView([60, -0.09], 1.2);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
}).addTo(map);
//use the searching name to get the lon and lat of the country from the object
function getLonLat(obj) {
  let selectedCountry = countryLocation.find(
    (item) => item.country.toLowerCase() === obj.Country.toLowerCase()
  );
  displayOnMap(obj, [selectedCountry.latitude, selectedCountry.longitude]);
}
//set the lon and lat in the map to get a marker on that country
function displayOnMap(obj, arr) {
  console.log(obj);
  L.marker([arr[0], arr[1]])
    .addTo(map)
    .bindPopup(`${obj.Country} New Cases: ${obj.NewCases}`)
    .openPopup();
}
/* function onMapClick(e) {
  alert("You clicked the map at " + e.latlng);
}
map.on("click", onMapClick);
 */
/************* sorting countryList **************/
const container = document.querySelector(".rank-container");
const tableBody = document.querySelector(".rank-body");
const sortDescendOrder = document.querySelector(".rank-most");
const sortNameOrder = document.querySelector(".rank-name");

function sortByName(arr) {
  sortNameOrder.addEventListener("click", () => {
    container.style.display = "table";
    const tableBody = document.querySelector(".rank-body");
    tableBody.innerHTML = "";
    sortDescendOrder.classList.remove("rank-most__active");
    sortNameOrder.classList.add("rank-name__active");
    sortFunc(arr, "Country");
    displayAllCountry(arr);
  });
}

function sortByCases(arr) {
  sortDescendOrder.addEventListener("click", () => {
    container.style.display = "table";
    const tableBody = document.querySelector(".rank-body");
    tableBody.innerHTML = "";
    sortNameOrder.classList.remove("rank-name__active");
    sortDescendOrder.classList.add("rank-most__active");
    sortFunc(arr, "rank");
    displayAllCountry(arr);
  });
}

class CountryR {
  constructor(
    country,
    rank,
    active,
    newCases,
    newDeaths,
    totalCases,
    totalDeaths
  ) {
    this.country = country;
    this.rank = rank;
    this.active = active;
    this.newCases = newCases;
    this.newDeaths = newDeaths;
    this.totalCases = totalCases;
    this.totalDeaths = totalDeaths;
  }
  render() {
    return `
          <td>${this.country}</td>
              <td>${this.rank}</td>
              <td>${this.active}</td>
              <td  class="rank-headline__hide">${this.newCases}</td>
              <td  class="rank-headline__hide">${this.newDeaths}</td>
              <td>${this.totalCases}</td>
              <td  class="rank-headline__hide">${this.totalDeaths}</td>
    `;
  }
}

function displayAllCountry(arr) {
  arr.forEach((item) => {
    const {
      Country,
      rank,
      ActiveCases,
      NewCases,
      NewDeaths,
      TotalCases,
      TotalDeaths,
    } = item;
    const itemData = new CountryR(
      Country,
      rank,
      ActiveCases,
      NewCases,
      NewDeaths,
      TotalCases,
      TotalDeaths
    );
    const tableRow = document.createElement("tr");
    tableRow.classList.add("rank-data");
    tableBody.append(tableRow);
    tableRow.innerHTML = itemData.render();
  });
}
