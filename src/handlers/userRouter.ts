import { UserModel } from "../models/usersModel";
import express, { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { verifyAuthTokenMiddleware } from "../util/verifyAuthToken";

dotenv.config();

const store = new UserModel();

const index = async (_req: Request, res: Response) => {
    try {
        const listUsers = await store.index();
        res.json(listUsers);
    } catch (error) {
        res.status(400);
        res.json(error)
    }
}

const show = async (_req: Request, res: Response) => {
    try {
        const { id } = _req.params
        const getUsers = await store.show(id);
        res.json(getUsers)
    } catch (error) {
        res.status(400);
        res.json(error)
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, username, password } = req.body;
        const createNewUser = await store.create({ firstName, lastName, username, password: bcrypt.hashSync(password, 10) });
        res.json(createNewUser)
    } catch (error) {
        res.status(400)
        res.json(error)
    }
}

const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const authen = await store.authentication(username, password);
        const token = jwt.sign({ user: authen }, "hard-secret");
        res.json(token);
    } catch (error) {
        res.status(400);
        res.json(error);
    }
}


const userRoute = (app: express.Application) => {
    app.get("/users", verifyAuthTokenMiddleware, index),
    app.get("/user/:id", verifyAuthTokenMiddleware, show),
    app.post("/user", verifyAuthTokenMiddleware, create),
    app.post("/login", login)
}

export default userRoute;