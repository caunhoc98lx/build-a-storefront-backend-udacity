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
Object.defineProperty(exports, "__esModule", { value: true });
const orderModel_1 = require("../models/orderModel");
const usersModel_1 = require("../models/usersModel");
const productsModel_1 = require("../models/productsModel");
const verifyAuthToken_1 = require("../util/verifyAuthToken");
const orderStore = new orderModel_1.OrderModel();
const userStore = new usersModel_1.UserModel();
const productStore = new productsModel_1.ProductModel();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listUsers = yield orderStore.index();
        res.json(listUsers);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const show = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = _req.params;
        const getUsers = yield orderStore.getOrderByUser(userId);
        res.json(getUsers);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, productId, quantity, status } = req.body;
        const existingUser = yield userStore.show(userId);
        if (!existingUser) {
            res.status(404);
            res.json("Cannot found user");
        }
        const existingProduct = yield productStore.show(productId);
        if (!existingProduct) {
            res.status(404);
            res.json("Cannot found product");
        }
        const createNewOrder = yield orderStore.create({ userId, productId, quantity, status });
        res.json(createNewOrder);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const orderRoute = (app) => {
    app.get("/orders", index),
        app.get("/order/:userId", verifyAuthToken_1.verifyAuthTokenMiddleware, show),
        app.post("/order", verifyAuthToken_1.verifyAuthTokenMiddleware, create);
};
exports.default = orderRoute;
