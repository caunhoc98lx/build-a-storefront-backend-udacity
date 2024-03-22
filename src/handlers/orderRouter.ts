import express, { Request, Response } from "express";
import { OrderModel } from "../models/orderModel";
import { UserModel } from "../models/usersModel";
import { OrderProductsModel } from "../models/orderProductModel";
import { ProductModel } from "../models/productsModel";
import { verifyAuthTokenMiddleware } from "../util/verifyAuthToken";
import { IOrderProducts } from "../models/orderProductModel";

interface IOrderProductsRequest {
    productId: number
    quantity: number
}

const orderStore = new OrderModel();
const userStore = new UserModel();
const orderProductsStore = new OrderProductsModel();
const productStore = new ProductModel();

const index = async (_req: Request, res: Response) => {
    try {
        const listOrder = await orderStore.index();
        res.json(listOrder);
    } catch (error) {
        res.status(400);
        res.json(error)
    }
}

const show = async (_req: Request, res: Response) => {
    try {
        const { userId } = _req.params
        const getUsers = await orderStore.getOrderByUser(userId);
        res.json(getUsers)
    } catch (error) {
        res.status(400);
        res.json(error)
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const { userId, orderProducts, status } = req.body;

        const existingUser = await userStore.show(userId);
        if (!existingUser) {
            res.status(404);
            res.json("Cannot found user")
        }

        const createNewOrder = await orderStore.create({ userId, status });

        if (createNewOrder) {
            // create order product
            const createProductOrder =  await Promise.allSettled<IOrderProducts[]>(
                orderProducts.length > 0 && orderProducts?.map( async (item: IOrderProductsRequest) => {
                    const existingProduct = await productStore.show(item.productId);
                    if (existingProduct) {
                        return await orderProductsStore.create({ orderId: createNewOrder.id, productId: item.productId, quantity: item.quantity })
                    }
                })
                ).then(result => result).catch(error => {
                    throw new Error(error?.message)
                })

            res.json({
                id: createNewOrder.id,
                userId: createNewOrder.userId,
                status: createNewOrder.status,
                orderProducts: createProductOrder
            })
        }
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const orderRoute = (app: express.Application) => {
    app.get("/orders", index),
        app.get("/order/:userId", verifyAuthTokenMiddleware, show),
        app.post("/order", verifyAuthTokenMiddleware, create)
}

export default orderRoute;