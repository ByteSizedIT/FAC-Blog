const movies = require("./movies");

// Create html for movie page, plugging in the movies HTML created
function reviewPageHTML(movie, reviews) {
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
                <h1>Reviews Page</h1>
                <section>
                    <h2>Add a review for ${movie}</h2>
                    <form method="POST">
                        <label for="reviewer">Name</label>
                        <input id="reviewer" name="reviewer" placeholder="Your name...">
                        <label for="review">Review</label>
                        <input id="review" name="review" type="text" placeholder="Your thoughts...">
                        <button class="post--btn">Post</button>
                    </form>
                  </section>
                  <section>
                    <h2>Delete a review for ${movie} </h2>
                    <ul>${reviews}</ul>
                    <p>To delete, click the <i class="fas fa-trash-alt"></i> next to each review</p>
                </section>
                <section>
                  <h2>Links</h2>
                  <p><a href="../../" title="Return to Movie page"><i class="fas fa-hand-point-left"></i></a>Return to Home Page</p>
                  <p><a href="../${movie}" title="Return to Home page"><i class="fas fa-hand-point-left"></i></a>Return to ${movie} movie page</p>
                </section>
            </body>
        </html>
        `;
  return pageHTML;
}

// Movie Review Page Handler
function reviewPageHandler(request, response) {
  const movie = request.params.name;
  const reviews = movies[movie];
  console.log({ movie });
  let reviewsHTML = "";
  // iterate through reviews. Note Key = Reviewer; Value = Review;
  for (const [key, value] of Object.entries(reviews)) {
    reviewsHTML += `
    <li class="reviewsEntry"">
     <form action="/movies/${movie}/delete-review" method="POST">
        <button name="name" value="${key}" aria-label="Delete ${movie} review by ${key}">
          <i class="fas fa-trash-alt"></i> 
        </button>
      </form>
      <span class = "reviewer">${key}:</span> 
      <span class="review">${value}</span>
    </li>`;
  }
  //return moviePageHTML
  response.end(reviewPageHTML(movie, reviewsHTML));
}

module.exports = reviewPageHandler;
