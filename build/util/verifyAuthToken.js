"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthTokenMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthTokenMiddleware = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            const token = authorizationHeader.split(" ")[1];
            jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || "hard-secret");
            next();
        }
        else {
            return res.status(401).json({ message: 'Unauthorized user!' });
        }
    }
    catch (error) {
        return res.status(401).json(`Invalid token ${error}`);
    }
};
exports.verifyAuthTokenMiddleware = verifyAuthTokenMiddleware;
