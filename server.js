const homePageHandler = require("./routes/homePageHandler.js");
const addMovieHandler = require("./routes/addMovieHandler.js");
const moviePageHandler = require("./routes/moviePageHandler.js");
const reviewPageHandler = require("./routes/reviewPageHandler.js");
const postReviewHandler = require("./routes/addReviewHandler.js");
const deleteReviewHandler = require("./routes/deleteReviewHandler.js");

const express = require("express");
const server = express();

let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
  PORT = 3000;
}
//const PORT = 3000;
server.listen(PORT, () => console.log("listening on http://localhost:${PORT}"));

const staticHandler = express.static("public");
server.use(staticHandler);

//
function logger(request, response, next) {
  console.log(request.method + " " + request.url);
  next();
}
server.use(logger);

/* This middleware will wait until all the submitted data has been received,
then add a body property to the request object. We can then read this property in our handler. */
const bodyParser = express.urlencoded();

// Homepage route
server.get("/", homePageHandler);

// Add movie route
server.post("/movies/:name/", bodyParser, addMovieHandler);

// Movie page route
server.get("/movies/:name", moviePageHandler);

// Add review route
server.get("/movies/:name/add-review", reviewPageHandler);

// Post review route
server.post("/movies/:name/add-review", bodyParser, postReviewHandler);

// Post delete review route
server.post("/movies/:name/delete-review", bodyParser, deleteReviewHandler);
