const movies = require("./movies");

// Movie Review Page Handler
function deleteReviewHandler(request, response) {
  const movie = request.params.name;
  const reviewToDelete = request.body.name;
  delete movies[movie][reviewToDelete];
  response.redirect(`/movies/${movie}`);
}

module.exports = deleteReviewHandler;
