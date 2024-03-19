import { IUser, UserModel } from "../models/usersModel";
import express, { Request, Response } from "express";
import bcrypt from 'bcrypt'


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
        bcrypt.genSalt(10, async (err, salt) => {
            const createNewUser = await store.create({ firstName, lastName, username, password: salt });
            res.json(createNewUser)
        })
    } catch (error) {
        res.status(400)
        res.json(error)
    }

}

const userRoute = (app: express.Application) => {
    app.get("/users", index),
    app.get("/user/:id", show),
    app.post("/user", create)
}

export default userRoute;