const popularUrl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=625e1a866d0f7ad42fefa918d84f3531";

async function getData(url) {
  const mainPage = document.querySelector(".main");
  mainPage.innerHTML = "";
  const res = await fetch(url);
  const data = await res.json();
  let howMuchFilms = data.results.length;
  for (let i = 0; i < howMuchFilms; i++) {
    createFilmCard(data, i);
  }
}

function showData(data) {
  let howMuchFilms = data.results.length;
  console.log(howMuchFilms);
  for (let i = 0; i < howMuchFilms; i++) {
    createFilmCard(data, i);
  }
}

function createFilmCard(data, i) {
  let main = document.querySelector(".main");
  let film = document.createElement("div");
  film.classList.add("film");
  let img = document.createElement("img");
  let filmAbout = document.createElement("div");
  filmAbout.classList.add("film__about");
  let filmTitle = document.createElement("h3");
  let rating = document.createElement("span");
  if (data.results[i]["vote_average"] >= 8.0) {
    rating.classList.add("green");
  } else if (data.results[i]["vote_average"] >= 6.0) {
    rating.classList.add("orange");
  } else {
    rating.classList.add("red");
  }
  rating.classList.add("green");
  let filmOverview = document.createElement("div");
  filmOverview.classList.add("overview");
  let overviewTitle = document.createElement("h3");
  main.append(film);
  film.append(img, filmAbout, filmOverview);
  filmAbout.append(filmTitle, rating);
  filmOverview.append(overviewTitle);
  img.src =
    "https://image.tmdb.org/t/p/w1280/" + `${data.results[i]["poster_path"]}`;
  filmTitle.textContent = `${data.results[i]["original_title"]}`;
  rating.textContent = `${data.results[i]["vote_average"]}`;
  filmOverview.innerHTML = `<h3>Overview</h3> ${data.results[i]["overview"]}`;
}

function urlHandler() {
  let searchText = document.querySelector(".search");
  let url = `https://api.themoviedb.org/3/search/movie?api_key=625e1a866d0f7ad42fefa918d84f3531&query=${searchText.value}&page=1`;
  searchText.value = "";
  return url;
}

let search = document.querySelector(".search");
search.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) e.preventDefault();
});

search.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    getData(urlHandler());
  }
});

window.onload = getData(popularUrl);
