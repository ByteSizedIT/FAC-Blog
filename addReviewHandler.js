const movies = require("./movies");

// Movie Review Page Handler
function postReviewHandler(request, response) {
  const movie = request.params.name;
  const newEntry = request.body;
  const newReviewer = newEntry.reviewer;
  const newReview = newEntry.review;
  movies[movie][newReviewer] = newReview;
  response.redirect(`/movies/${movie}`);
}

module.exports = postReviewHandler;
