CREATE TABLE items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    price INT NOT NULL
);

INSERT INTO item (item_name, price) VALUES
    ('Small Desk', 100),
    ('Large desk', 300),
    ('Fan', 80);

	
CREATE TABLE customers(
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

INSERT INTO customer (first_name, last_name) VALUES
    ('Greg', 'Jones'),
    ('Sandra', 'Jones'),
    ('Scott', 'Scott'),
    ('Trevor', 'Green'),
    ('Melanie', 'Johnson');

	SELECT * FROM items;
SELECT * FROM items 
WHERE price <= 300;

SELECT * FROM customers 
WHERE last_name = 'Smith';

SELECT * FROM customers 
WHERE last_name = 'Jones';

SELECT * FROM customers 
WHERE first_name != 'Scott';


	
