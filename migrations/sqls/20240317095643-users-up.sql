/* Replace with your SQL commands */
CREATE TABLE users (id SERIAL PRIMARY KEY, firstName varchar(100), lastName varchar(100),username varchar(100) unique not null, password varchar(100) not null);