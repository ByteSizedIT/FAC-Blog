const movies = require("./movies");

// Create html for movie page, plugging in the movies HTML created
function moviePageHTML(movie, reviews) {
  const pageHTML = `
        <!doctype html>
        <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="Movie blog">
                <link rel="stylesheet" type="text/css" href="/style.css">
                <script src="https://kit.fontawesome.com/7f8028ce21.js" crossorigin="anonymous"></script>
                <title>Movie Review Blog!</title>
            </head>
            <body>
                <h1>${movie}</h1>
                <section>
                    <h2>Storyline<h2>
                </section>
                <section>
                    <h2>Cast</h2>
                </section>
                <section>
                    <h2>Reviews</h2>
                    <ul>${reviews}</ul>
                    <p><a href="/movies/${movie}/add-review"><i class="fas fa-plus"></i></a>Add/Delete a review for ${movie}</p>
                </section>
                <section>
                    <h2>Links</h2>
                    <p><a href="../" title="Return to Home page"><i class="fas fa-hand-point-left"></i></a> Still looking for insipration? Return to the home page to find another movie</p>
                </section>  
            </body>
        </html>
        `;
  return pageHTML;
}

// Movie Review Page Handler
function moviePageHandler(request, response) {
  const movie = request.params.name;
  const reviews = movies[movie];
  let reviewsHTML = "";
  // iterate through reviews. Note Key = Reviewer; Value = Review;
  for (const [key, value] of Object.entries(reviews)) {
    reviewsHTML += `
    <ul class="reviewsEntry"">
        <li class = "reviewer">${key}:</li>
        <li class="review">${value}</li>
    </ul>`;
  }
  //return moviePageHTML
  response.end(moviePageHTML(movie, reviewsHTML));
}

module.exports = moviePageHandler;
