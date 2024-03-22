/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY, 
    user_id int, 
    status varchar(100), 
    foreign key(user_id) references users(id)
);