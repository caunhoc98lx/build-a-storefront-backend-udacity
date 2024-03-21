import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
export const verifyAuthTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            const token = authorizationHeader.split(" ")[1];
            jwt.verify(token, process.env.TOKEN_SECRET || "hard-secret")
            next();
        } else {
            return res.status(401).json({ message: 'Unauthorized user!' });
        }
    } catch (error) {
        return res.status(401).json(`Invalid token ${error}`);
    }
}