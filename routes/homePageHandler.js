const movies = require("./movies");

// Create html for home page, plugging in the movies HTML created
function homePageHTML(moviesHTML) {
  const pageHTML = `
    <!doctype html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content="Movie blog">
            <link rel="stylesheet" type="text/css" href="/style.css">
            <title>Movie Review Blog!</title>
        </head>
        <body>
                <h1>Movie Review Blog!!</h1>
                <p>Click a movie title to select from the list below, or use 'Search' to filter the list</p>
                <form>
                  <label id="searchMovies">Search movies</label>
                  <input id="searchMovies-input" type="search" name="searchMovies" placeholder="E.g. superman">
                  <button>Search</button>
                </form>
                <ul>${moviesHTML}</ul>
                <p>Can't find your movie? Add a new movie title below</p>
                <form method="POST" action="/movies/{value}/">
                  <label id="addMovie">Add movie</label>
                  <input id="add-input" type="search" name="addMovie" placeholder="E.g. superman">
                  <button>Add</button>
                </form>
            </body>
        </html>
    `;
  return pageHTML;
}

function sortMovies(moviesObj) {
  return Object.keys(moviesObj)
    .sort()
    .reduce((obj, key) => {
      obj[key] = movies[key];
      return obj;
    }, {});
}

// Home page handler
function homepageHandler(request, response) {
  // Create variable to hold a search value if a search query has been made, or an empty string if not
  const search = request.query.searchMovies || "";
  let totalMatches = 0;
  let latestMatch = "";
  let moviesHTML = "";

  const sortedMovies = sortMovies(movies);

  // Iterate through the full movies object (key = movies title, value = array of reviewer/reviews objects)
  for (const [key, value] of Object.entries(sortedMovies)) {
    // Create a binary variable that identifies whether the search field matches movie
    const matched = key.toLowerCase().includes(search.toLowerCase());
    // If matched, or if no search was carried out, append movie to moviesHTML
    if (matched) {
      totalMatches += 1;
      latestMatch = `${key}`;
    }
    if (matched || !search) {
      // For current movie(represented by key), open an li tag, then open a ul tag(ready to list each of it's reviewers/reviews)
      moviesHTML += `<li class="movie"> <a href="/movies/${key}">${key}</a> </li>`;
    }
  }
  if (totalMatches === 1) {
    response.redirect(`/movies/${latestMatch}`);
  }
  //return homePageHTML
  else {
    response.end(homePageHTML(moviesHTML));
  }
}

module.exports = homepageHandler;
