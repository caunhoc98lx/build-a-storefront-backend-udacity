/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY, 
    product_id int, 
    user_id int, 
    quantity int, 
    status varchar(100), 
    foreign key(product_id) references products(id),
    foreign key(user_id) references users(id)
);