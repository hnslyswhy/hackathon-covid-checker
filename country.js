const allCountries = {
  method: "GET",
  url: "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/",
  headers: {
    "x-rapidapi-host":
      "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
    "x-rapidapi-key": "e8c6051701msh19283f80b63e370p1f39d6jsn62d88c9e7aaf",
  },
};

axios
  .request(allCountries)
  .then(function (response) {
    console.log(response.data);
    const countryCaseList = response.data;
    displayCountryCase(countryCaseList);
  })
  .catch(function (error) {
    console.error(error);
  });

function displayCountryCase(arr) {}
