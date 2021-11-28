/* const allTreatment = {
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
    vaccineList = response.data;
    console.log(vaccineList);
  })
  .then(() => {
    let approvedVaccineList = findFDAApproved(vaccineList);
    console.log(approvedVaccineList);
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

let vaccineList;
axios
  .request(allVaccines)
  .then(function (response) {
    //  console.log(response.data);
    vaccineList = response.data;
    console.log(vaccineList);
  })
  .then(() => {
    let approvedVaccineList = findFDAApproved(vaccineList);
    // console.log(approvedVaccineList);
  })

  .catch(function (error) {
    console.error(error);
  });

function findFDAApproved(arr) {
  return arr.filter((item) => item.FDAApproved !== "undefined");
}
 */

const getApprovedVaccine = {
  method: "GET",
  url: "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/vaccines/get-fda-approved-vaccines",
  headers: {
    "x-rapidapi-host":
      "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
    "x-rapidapi-key": "e8c6051701msh19283f80b63e370p1f39d6jsn62d88c9e7aaf",
  },
};
let approvedVList = [];
let spinner = document.querySelector(".loadingSpinner");
axios
  .request(getApprovedVaccine)
  .then(function (response) {
    console.log(response.data);
    approvedVList = response.data;
    approvedVList.forEach((item) => displayApprovedVaccine(item));
    spinner.style.display = "none";
  })
  .catch(function (error) {
    console.error(error);
  });

//////////////////
class Vaccine {
  constructor(
    category,
    description,
    developerResearcher,
    lastUpdated,
    nextSteps,
    phase
  ) {
    (this.category = category),
      (this.description = description),
      (this.developerResearcher = developerResearcher),
      (this.lastUpdated = lastUpdated),
      (this.nextSteps = nextSteps),
      (this.phase = phase);
  }
  render() {
    return `
     <div class="approvedCard">
          <p class="approvedCard-headline">${this.developerResearcher}</p>
          <p class="approvedCard-info">Category: <span class="approvedCard-content">${this.category}</span></p>
          <p class="approvedCard-info">Description: <span class="approvedCard-content">${this.description}</span></p>
          <p class="approvedCard-info">Phase: <span class="approvedCard-content">${this.phase}</span></p>
          <p class="approvedCard-info">LastUpdated: <span class="approvedCard-content">${this.lastUpdated}</span></p>
          <p class="approvedCard-info">NextSteps: <span class="approvedCard-content">${this.nextSteps}</span></p>
        </div>
    `;
  }
}

function displayApprovedVaccine(obj) {
  const {
    category,
    description,
    developerResearcher,
    lastUpdated,
    nextSteps,
    phase,
  } = obj;
  let approvedData = new Vaccine(
    category,
    description,
    developerResearcher,
    lastUpdated,
    nextSteps,
    phase
  );
  const approvedSection = document.querySelector(".approved");
  approvedSection.innerHTML += approvedData.render();
}
