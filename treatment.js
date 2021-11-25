const allTreatment = {
  method: "GET",
  url: "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/vaccines/get-all-treatment",
  headers: {
    "x-rapidapi-host":
      "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
    "x-rapidapi-key": "e8c6051701msh19283f80b63e370p1f39d6jsn62d88c9e7aaf",
  },
};

axios
  .request(allTreatment)
  .then(function (response) {
    //   console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

const allVaccines = {
  method: "GET",
  url: "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/vaccines/get-all-vaccines",
  headers: {
    "x-rapidapi-host":
      "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
    "x-rapidapi-key": "e8c6051701msh19283f80b63e370p1f39d6jsn62d88c9e7aaf",
  },
};

axios
  .request(allVaccines)
  .then(function (response) {
    //  console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
