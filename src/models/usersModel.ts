import client from "../database"
import bcrypt from "bcrypt"

export interface IUser {
    id: number
    firstName: string
    lastName: string
    username: string
    password: string
}

interface IUserCreate {
    firstName: string
    lastName: string
    username: string
    password: string
}

export class UserModel {
    async index(): Promise<IUser[]> {
        try {
            const connect = await client.connect();

            const sqlQuery = "SELECT * FROM users;";
            const result = await connect.query(sqlQuery);
            connect.release();
            return result.rows;
        } catch (error) {
            throw new Error("Cannot get any users");
        }
    }

    async show(id: string): Promise<IUser> {
        try {
            const connect = await client.connect();

            const sqlQuery = `SELECT * FROM users where id = ($1)`;
            const result = await connect.query(sqlQuery, [id]);
            connect.release()
            return result.rows[0];
        } catch (error) {
            throw new Error("Cannot found current user")
        }
    }

    async create(user: IUserCreate): Promise<IUser> {
        try {
            const sqlQuery = "INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4) RETURNING *";
            const connect = await client.connect();

            const result = await connect.query(sqlQuery, [user.firstName, user.lastName, user.username, user.password]);
            connect.release();
            
            return result.rows[0];
        } catch (error) {
            throw new Error("Cannot create new user")
        }
    }

    async authentication(username: string, password: string) {
        try {
            const connect = await client.connect();
            const sqlQuery = "SELECT username, password FROM public.users WHERE username = ($1)";
            const result = await connect.query(sqlQuery, [username]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt.compareSync(password, user.password)) {
                    return user;
                }
            }
            return null;
        } catch (error) {
            throw new Error("Authentication error");
        }
    }
}