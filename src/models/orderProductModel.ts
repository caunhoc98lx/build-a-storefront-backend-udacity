import client from "../database"
import bcrypt from "bcrypt"

export interface IOrderProducts {
    id: number
    orderId: number
    productId: number
    quantity: number
}

interface IOrderProductsCreate {
    orderId: number
    productId: number
    quantity: number
}

export class OrderProductsModel {   
    async getListProductByOrder(orderId: string): Promise<IOrderProducts[]> {
        try {
            const connect = await client.connect();

            const sqlQuery = `SELECT * FROM order_products where order_id = ($1)`;
            const result = await connect.query(sqlQuery, [orderId]);
            connect.release()
            return result.rows;
        } catch (error) {
            throw new Error("Cannot found any  product by order id")
        }
    }

    async create(orderProduct: IOrderProductsCreate): Promise<IOrderProducts> {
        try {
            const sqlQuery = "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *";
            const connect = await client.connect();

            const result = await connect.query(sqlQuery, [orderProduct.orderId, orderProduct.productId, orderProduct.quantity]);
            connect.release();
            
            return result.rows[0];
        } catch (error) {
            throw new Error("Cannot create new orderProduct")
        }
    }
}