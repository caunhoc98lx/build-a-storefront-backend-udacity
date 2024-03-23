# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

### 1. DB Creation and Migrations
- connect to database postgres

- after that run migration script up: 
    `npm run migrate:up`

- if you want to drop all table run migration down:
    `npm run migrate:down`

- file enviroment to connect database postgres example:
    POSTGRES_HOST=127.0.0.1
    POSTGRES_DB=storefront_db
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=postgres
    SALT_ROUNDS=10
    BCRYPT_PASSWORD=hash-happy
    TOKEN_SECRET=hard-secret

### 2. Models

- create Models

=> userModels method:

 - index() : show all users

 - show(id): show user by userId

 - create(user): create new user

 - authentication(username, password): method use to authen user login

=> ProductModel method:

 - index() : show all product

 - show(id): show product by productId

 - create(user): create new product

 - filterByCategory(category): method use to filter product by category

 => OrderModel method:
 
 - index() : show all orders

 - getOrderByUser(userId): show order by userid

 - create(user): create new order

### 3. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Endpoints must have tests and be CORS enabled. 

- user router:

    ## app.get("/users", verifyAuthTokenMiddleware, index)

    ## app.get("/user/:id", verifyAuthTokenMiddleware, show)

    ## app.post("/user", create)
    example request body 
    {
        "firstName": "Nguyen",
        "lastName": "Linh",
        "username": "nguyenlinh",
        "password": "password123"
    }

    ## app.post("/login", login)
    example request body 
    {
        "username": "usertest",
        "password": "password123"
    }

- product router:

    ## app.get("/products", index)

    ## app.get("/product/:id", show)

    ## app.post("/product", verifyAuthTokenMiddleware ,create)
    example request body 
    {
        "name": "Xiaomi Redmi Note 13 6GB 128GB",
        "price": 8790000,
        "category": "Phone"
    }

    ## app.get("/product", filterByCategory)

- order router:

    ## app.get("/orders", index)

    ## app.get("/order/:userId",verifyAuthTokenMiddleware, show)


    ## app.post("/order", verifyAuthTokenMiddleware,create)
    example body
        {
            "userId": 5,
            "status": "active",
            "orderProducts": [
                {
                    "productId": 8,
                    "quantity": 3
                },
                {
                    "productId": 10,
                    "quantity": 1
                }
            ]
        }

### 4. JWTs

Add JWT verifyAuthTokenMiddleware . Make sure that JWTs are required for the routes listed.

### 5. Data Shapes
### products
 -  id
 - name
 - price
 - category

                                     Table "public.products"
  Column  |          Type          | Collation | Nullable |               Default
----------+------------------------+-----------+----------+--------------------------------------
 id       | integer                |           | not null | nextval('products_id_seq'::regclass)
 name     | character varying(100) |           |          |
 price    | integer                |           |          |
 category | character varying(100) |           |          |
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)

### orders
 - id
 - user_id
 - status

                                     Table "public.orders"
 Column  |          Type          | Collation | Nullable |              Default
---------+------------------------+-----------+----------+------------------------------------
 id      | integer                |           | not null | nextval('orders_id_seq'::regclass)
 user_id | integer                |           |          |
 status  | character varying(100) |           |          |
Indexes:
    "orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)

### order_product
 - id
 - order_id
 - product_id
 - quantity

                              Table "public.order_products"
   Column   |  Type   | Collation | Nullable |                  Default
------------+---------+-----------+----------+--------------------------------------------
 id         | integer |           | not null | nextval('order_products_id_seq'::regclass)
 order_id   | integer |           |          |
 product_id | integer |           |          |
 quantity   | integer |           |          |
Indexes:
    "order_products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
    "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)

### users
 - id
 - firstname
 - lastname
 - username
 - password

                                      Table "public.users"
  Column   |          Type          | Collation | Nullable |              Default
-----------+------------------------+-----------+----------+-----------------------------------
 id        | integer                |           | not null | nextval('users_id_seq'::regclass)
 firstname | character varying(100) |           |          |
 lastname  | character varying(100) |           |          |
 username  | character varying(100) |           | not null |
 password  | character varying(100) |           | not null |
Indexes:
    "users_pkey" PRIMARY KEY, btree (id)
    "users_username_key" UNIQUE CONSTRAINT, btree (username)
Referenced by:
    TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)


### 6. server running
 - port: 3000

### 7. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database. 

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!

