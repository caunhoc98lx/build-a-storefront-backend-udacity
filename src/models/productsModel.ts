import client from "../database"

export interface IProduct {
    id: number
    name: string
    price: number
    category: string
}

export class ProductModel {
    async index(): Promise<IProduct[]> {
        try {
            const connect = await client.connect();

            const sqlQery = "select * from products;";
            const result = await connect.query(sqlQery);
            connect.release();
            return result.rows;
        } catch (error) {
            throw new Error("Cannot get any product");
        }
    }
}