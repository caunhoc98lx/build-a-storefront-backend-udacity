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

### 5. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database. 

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!
