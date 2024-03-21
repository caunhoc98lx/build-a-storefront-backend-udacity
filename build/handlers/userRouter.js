"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usersModel_1 = require("../models/usersModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const verifyAuthToken_1 = require("../util/verifyAuthToken");
dotenv_1.default.config();
const store = new usersModel_1.UserModel();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listUsers = yield store.index();
        res.json(listUsers);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const show = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = _req.params;
        const getUsers = yield store.show(id);
        res.json(getUsers);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, username, password } = req.body;
        const createNewUser = yield store.create({ firstName, lastName, username, password: bcrypt_1.default.hashSync(password, 10) });
        res.json(createNewUser);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const authen = yield store.authentication(username, password);
        const token = jsonwebtoken_1.default.sign({ user: authen }, "hard-secret");
        res.json(token);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const userRoute = (app) => {
    app.get("/users", verifyAuthToken_1.verifyAuthTokenMiddleware, index),
        app.get("/user/:id", verifyAuthToken_1.verifyAuthTokenMiddleware, show),
        app.post("/user", verifyAuthToken_1.verifyAuthTokenMiddleware, create),
        app.post("/login", login);
};
exports.default = userRoute;
