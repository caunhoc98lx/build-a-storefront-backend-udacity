import client from "../database"

export interface IProduct {
    id: number
    name: string
    price: number
    category: string
}

interface IProductCreate {
    name: string
    price: number
    category: string
}

export class ProductModel {
    async index(): Promise<IProduct[]> {
        try {
            const connect = await client.connect();

            const sqlQuery = "select * from products;";
            const result = await connect.query(sqlQuery);
            connect.release();
            return result.rows;
        } catch (error) {
            throw new Error("Cannot get any product");
        }
    }

    async show(id: string): Promise<IProduct> {
        try {
            const connect = await client.connect();

            const sqlQuery = `SELECT * FROM products where id = ($1)`;
            const result = await connect.query(sqlQuery, [id]);
            connect.release()
            return result.rows[0];
        } catch (error) {
            throw new Error("Cannot found current product")
        }
    }

    async create(prouduct: IProductCreate): Promise<IProduct> {
        try {
            const sqlQuery = "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *";
            const connect = await client.connect();

            const result = await connect.query(sqlQuery, [prouduct.name, prouduct.price, prouduct.category]);
            connect.release();
            return result.rows[0];
        } catch (error) {
            throw new Error("Cannot create new product")
        }
    }

    async filterByCategory(nameCategory: string): Promise<IProduct[]> {
        try {
            const sqlQuery = "SELECT * FROM products WHERE category = ($1)";
            const connect = await client.connect();

            const result = await connect.query(sqlQuery, [nameCategory]);
            connect.release();
            return result.rows;
        } catch (error) {
            throw new Error("Cannot filter by category");
        }
    }
}