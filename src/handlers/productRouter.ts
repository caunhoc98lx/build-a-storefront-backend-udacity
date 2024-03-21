import { ProductModel } from "../models/productsModel";
import express, { Request, Response } from "express";
import { verifyAuthTokenMiddleware } from "../util/verifyAuthToken";


const store = new ProductModel();

const index = async (_req: Request, res: Response) => {
    try {
        const listProduct = await store.index();
        res.json(listProduct);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const show = async (_req: Request, res: Response) => {
    try {
        const { id } = _req.params
        const getProduct = await store.show(id);
        res.json(getProduct)
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const { name, price, category } = req.body;

        const createNewProduct = await store.create({ name, price, category });
        res.json(createNewProduct)
    } catch (error) {
        res.status(400);
        res.json(error);
    }

}

const filterByCategory = async (req: Request, res: Response) => {
    try {
        const { category } = req.body;
        const createNewProduct = await store.filterByCategory(category ?? "laptop");
        res.json(createNewProduct)
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}

const productRoute = (app: express.Application) => {
    app.get("/products", index),
    app.get("/product/:id", show),
    app.post("/product", verifyAuthTokenMiddleware ,create),
    app.get("/product", filterByCategory)
}

export default productRoute;