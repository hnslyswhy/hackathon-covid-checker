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
let container = document.querySelector(".approved-container");
axios
  .request(getApprovedVaccine)
  .then(function (response) {
    console.log(response.data);
    approvedVList = response.data;
    container.classList.remove("approved-container__hide");
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
     <div class="approved-card">
          <p class="approved-card-headline">${this.developerResearcher}</p>
          <p class="approved-card-info"><span class="approved-card-content">Category:</span> ${this.category}</p>
          <p class="approved-card-info"><span class="approved-card-content">Description:</span> ${this.description}</p>
          <p class="approved-card-info"><span class="approved-card-content">Phase:</span> ${this.phase}</p>
          <p class="approved-card-info"><span class="approved-card-content">LastUpdated:</span> ${this.lastUpdated}</p>
          <p class="approved-card-info"><span class="approved-card-content">NextSteps:</span> ${this.nextSteps}</p>
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
  const approvedSection = document.querySelector(".approved-container");
  approvedSection.innerHTML += approvedData.render();
}
