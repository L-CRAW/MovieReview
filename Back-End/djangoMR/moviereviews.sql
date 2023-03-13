CREATE DATABASE IF NOT EXISTS djangoMovieReview;

USE djangoMovieReview;

SET SQL_SAFE_UPDATES = 0;

CREATE TABLE IF NOT EXISTS Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Movies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    release_date CHAR(4) NOT NULL,
    synopsis TEXT NOT NULL,
    director VARCHAR(200) NOT NULL,
    main_cast VARCHAR(500) NOT NULL,
    avg_rating FLOAT DEFAULT 0,
    num_reviews INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS Reviews (
    id INT PRIMARY KEY AUTO_INCREMENT,
    movie_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT NOT NULL,
    review_text TEXT NOT NULL,
    FOREIGN KEY (movie_id) REFERENCES Movies(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

INSERT INTO Movies (title, release_date, synopsis, director, main_cast, avg_rating, num_reviews) VALUES 
('The Shawshank Redemption', '1994', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 'Frank Darabont', 'Tim Robbins, Morgan Freeman, Bob Gunton', 0, 0),
('The Godfather', '1972', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 'Francis Ford Coppola', 'Marlon Brando, Al Pacino, James Caan', 0, 0),
('The Dark Knight', '2008', 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.', 'Christopher Nolan', 'Christian Bale, Heath Ledger, Aaron Eckhart', 0, 0),
('The Godfather: Part II', '1974', 'The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.', 'Francis Ford Coppola', 'Al Pacino, Robert De Niro, Robert Duvall', 0, 0),
('12 Angry Men', '1957', 'A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider the evidence.', 'Sidney Lumet', 'Henry Fonda, Lee J. Cobb, Martin Balsam', 0, 0),
('Schindler''s List', '1993', 'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.', 'Steven Spielberg', 'Liam Neeson, Ralph Fiennes, Ben Kingsley', 0, 0),
('The Lord of the Rings: The Return of the King', '2003', 'Gandalf and Aragorn lead the World of Men against Sauron''s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.', 'Peter Jackson', 'Elijah Wood, Viggo Mortensen, Ian McKellen', 0, 0),
('Pulp Fiction', '1994', 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', 'Quentin Tarantino', 'John Travolta, Uma Thurman, Samuel L. Jackson', 0, 0),
('The Lord of the Rings: The Fellowship of the Ring', '2001', 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.', 'Peter Jackson', 'Elijah Wood, Ian McKellen, Orlando Bloom', 0, 0),
('Fight Club', '1999', 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.', 'David Fincher', 'Brad Pitt, Edward Norton, Helena Bonham Carter', 0, 0),
('The Lord of the Rings: The Two Towers', '2002', 'While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron''s new ally, Saruman, and his hordes of Isengard.', 'Peter Jackson', 'Elijah Wood, Ian McKellen, Viggo Mortensen', 0.0, 0),
('The Good, the Bad and the Ugly', '1966', 'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.', 'Sergio Leone', 'Clint Eastwood, Eli Wallach, Lee Van Cleef', 0.0, 0),
('Forrest Gump', '1994', 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.', 'Robert Zemeckis', 'Tom Hanks, Robin Wright, Gary Sinise', 0.0, 0),
('Inception', '2010', 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', 'Christopher Nolan', 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page', 0.0, 0),
('Star Wars: Episode V - The Empire Strikes Back', '1980', 'After the Rebels are brutally overpowered by the Empire on the ice planet Hoth, Luke Skywalker begins Jedi training with Yoda, while his friends are pursued by Darth Vader and a bounty hunter named Boba Fett all over the galaxy.', 'Irvin Kershner', 'Mark Hamill, Harrison Ford, Carrie Fisher', 0.0, 0),
('The Matrix', '1999', 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.', 'Lana Wachowski, Lilly Wachowski', 'Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss', 0.0, 0);