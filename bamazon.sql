DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  stock_quantity INTEGER(11) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Buzz Lightyear Doll", "Toys", 19.99, 15),
("LCD TV", "Electronics", 499.99, 5),
("Janky Sweatpants", "Clothing", 14.99, 30),
("My Dignity", "Electronics", 20.00, 1),
("How To Javascript for Dummies", "Literature", 24.95, 4),
("Overwatch", "Electronics", 49.95, 10),
("Baby Shark", "Toys", 51.50, 5),
("Mama Shark", "Toys", 51.50, 8),
("Papa Shark", "Toys", 51.50, 8),
("Janky Sweatshirt", "Clothing", 19.99, 24);