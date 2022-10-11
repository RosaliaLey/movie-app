const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=561a7a57f9104e8b27760f4a751eea15&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=561a7a57f9104e8b27760f4a751eea15&query="';

const form = document.querySelector("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

//obtain movies
getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieElement = document.createElement("div");
    movieElement.classList.add("movie");

    movieElement.innerHTML = `
        <img
          src="${IMG_PATH + poster_path}"
          alt="${title}" />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
    `;

    main.appendChild(movieElement);
  });
}

//utility function
function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "yellow";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
});

//for :focus outline:none accessibility purposes
(function (document, window) {
  if (!document || !window) {
    return;
  }

  var styleText =
    "::-moz-focus-inner{border:0 !important;}:focus{outline: none !important;";
  var unfocus_style = document.createElement("STYLE");

  window.unfocus = function () {
    document.getElementsByTagName("HEAD")[0].appendChild(unfocus_style);

    document.addEventListener("mousedown", function () {
      unfocus_style.innerHTML = styleText + "}";
    });
    document.addEventListener("keydown", function () {
      unfocus_style.innerHTML = "";
    });
  };

  unfocus.style = function (style) {
    styleText += style;
  };

  unfocus();
})(document, window);
