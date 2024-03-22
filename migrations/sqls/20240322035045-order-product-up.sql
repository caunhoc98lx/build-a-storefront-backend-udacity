/* Replace with your SQL commands */
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    order_id int,
    product_id int,
    quantity int, 
    foreign key(order_id) references orders(id),
    foreign key(product_id) references products(id)
);