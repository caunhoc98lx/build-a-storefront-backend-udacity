import express, { Request, Response } from "express";
import { OrderModel } from "../models/orderModel";
import { UserModel } from "../models/usersModel";
import { ProductModel } from "../models/productsModel";
import { verifyAuthTokenMiddleware } from "../util/verifyAuthToken";


const orderStore = new OrderModel();
const userStore = new UserModel();
const productStore = new ProductModel();

const index = async (_req: Request, res: Response) => {
    try {
        const listUsers = await orderStore.index();
        res.json(listUsers);
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
        const { userId, productId, quantity, status } = req.body;

        const existingUser = await userStore.show(userId);
        if(!existingUser){
            res.status(404);
            res.json("Cannot found user")
        }

        const existingProduct = await productStore.show(productId);
        if(!existingProduct){
            res.status(404);
            res.json("Cannot found product")
        }
        const createNewOrder = await orderStore.create({ userId, productId, quantity, status });
        res.json(createNewOrder)
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const orderRoute = (app: express.Application) => {
    app.get("/orders", index),
    app.get("/order/:userId",verifyAuthTokenMiddleware, show),
    app.post("/order", verifyAuthTokenMiddleware,create)
}

export default orderRoute;