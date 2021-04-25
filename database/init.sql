begin; 

drop table if exists users, movies, reviews cascade;

CREATE table users (
    id SERIAL PRIMARY KEY, 
    firstName VARCHAR(20),
    secondName VARCHAR(20),
    username VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL, 
    age INTEGER, 
    location VARCHAR(20));

CREATE table movies (
    id SERIAL PRIMARY KEY, 
    users_id INTEGER REFERENCES users(id), 
    movieTitle VARCHAR(255) NOT NULL);

CREATE reviews (
    id SERIAL PRIMARY KEY, 
    users_id INTEGER REFERENCES users(id),
    movies_id INTEGER REFERENCES movies(id), 
    review TEXT NOT NULL);


INSERT into users (id, firstName, secondName, username, email, age, location) VALUES (1, "Safia", "Ali", "fi-ya", "x@y.com", 21, "London");
INSERT into (id, username, email, location) VALUES (2, "byteSizedIT", "Z@y.com", "London");

INSERT into movies (id, users_id, movieTitle) VALUES (1, 1, "sing"), (2,2,"Harry Potter");


INSERT into reviews (id, users_id, movies_id, review) VALUES (1, 1, 1, "There's all these little piglets"), (2, 1, 2, "You're a wizard Harry"), (3, 2, 2, "Bloody brilliant");


commit;