import client from "../database"

export interface IOrder {
    id: number
    userId: number
    productId: number
    quantity: number
    status: string
}

interface IOrderCreate {
    userId: number
    productId: number
    quantity: number
    status: string
}

export class OrderModel {
    async index(): Promise<IOrder[]> {
        try {
            const connect = await client.connect();

            const sqlQuery = "SELECT * FROM orders;";
            const result = await connect.query(sqlQuery);
            connect.release();
            return result.rows;
        } catch (error) {
            throw new Error("Cannot get any orders");
        }
    }

    async getOrderByUser(userId: string): Promise<IOrder[]> {
        try {
            const connect = await client.connect();

            const sqlQuery = `SELECT * FROM orders where user_id = ($1)`;
            const result = await connect.query(sqlQuery, [userId]);
            connect.release()
            return result.rows;
        } catch (error) {
            throw new Error("Cannot found any orders of current user")
        }
    }

    async create(order: IOrderCreate): Promise<IOrder> {
        try {
            const sqlQuery = "INSERT INTO orders (user_id, product_id, quantity, status) VALUES ($1, $2, $3, $4) RETURNING *";
            const connect = await client.connect();

            const result = await connect.query(sqlQuery, [order.userId, order.productId, order.quantity,order.status]);
            connect.release();
            return result.rows[0];
        } catch (error) {
            throw new Error("Cannot create new order of user")
        }
    }
}