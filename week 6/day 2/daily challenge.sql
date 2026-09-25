-- 1. Setup the Schema and Data
CREATE TABLE FirstTab (
     id integer, 
     name VARCHAR(10)
);

INSERT INTO FirstTab (id, name) VALUES
(5, 'Pawan'),
(6, 'Sharlee'),
(7, 'Krish'),
(NULL, 'Avtaar');

CREATE TABLE SecondTab (
    id integer 
);

INSERT INTO SecondTab (id) VALUES
(5),
(NULL);


SELECT COUNT(*) 
FROM FirstTab AS ft 
WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id IS NULL );

SELECT COUNT(*) 
FROM FirstTab AS ft 
WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id = 5 );

SELECT COUNT(*) 
FROM FirstTab AS ft 
WHERE ft.id NOT IN ( SELECT id FROM SecondTab );

SELECT COUNT(*) 
FROM FirstTab AS ft 
WHERE ft.id NOT IN ( SELECT id FROM SecondTab WHERE id IS NOT NULL );12
