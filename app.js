const allNews = {
  method: "GET",
  url: "https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/news/get-coronavirus-news/0",
  headers: {
    "x-rapidapi-host":
      "vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
    "x-rapidapi-key": "e8c6051701msh19283f80b63e370p1f39d6jsn62d88c9e7aaf",
  },
};

let newsList;
axios
  .request(allNews)
  .then(function (response) {
    newsList = response.data.news;
    console.log(newsList);
    display(newsList);
  })
  .catch(function (error) {
    console.error(error);
  });

////////////////
const newsCollection = document.querySelector(".news-collection");
function display(newsArr) {
  newsArr.forEach((aNews) => {
    const card = document.createElement("a");
    card.href = aNews.link;
    card.classList.add("news-card");
    newsCollection.append(card);

    const headlineIcon = document.createElement("span");
    headlineIcon.classList.add("news-icon");
    headlineIcon.innerText = "🗞️";

    const heading = document.createElement("p");
    heading.innerText = aNews.title;
    heading.classList.add("news-title");
    card.append(headlineIcon, heading);
  });
}
