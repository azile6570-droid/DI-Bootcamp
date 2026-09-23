INSERT INTO actors (first_name, last_name, age, number_oscars) VALUES
    ('Matt', 'Damon', '1970-10-08', 1),
    ('George', 'Clooney', '1961-05-06', 2),
    ('Brad', 'Pitt', '1963-12-18', 1),
    ('Jennifer', 'Aniston', '1969-02-11', 0);

SELECT COUNT(*) FROM actors;

INSERT INTO actors (first_name, last_name, age, number_oscars) 
VALUES (NULL, 'Smith', '1990-01-01', 2);

INSERT INTO actors (first_name, last_name, age, number_oscars) 
VALUES ('', '', '1990-01-01', 0);


	