const movies = require("./movies");

// Movie Review Page Handler
function addMovieHandler(request, response) {
  const newMovie = request.body.addMovie.toLowerCase();
  if (!movies[newMovie]) {
    movies[newMovie] = {};
  }
  response.redirect(`/movies/${newMovie}`);
}

module.exports = addMovieHandler;
