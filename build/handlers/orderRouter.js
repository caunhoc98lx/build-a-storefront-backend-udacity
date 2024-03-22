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
const orderProductModel_1 = require("../models/orderProductModel");
const productsModel_1 = require("../models/productsModel");
const verifyAuthToken_1 = require("../util/verifyAuthToken");
const orderStore = new orderModel_1.OrderModel();
const userStore = new usersModel_1.UserModel();
const orderProductsStore = new orderProductModel_1.OrderProductsModel();
const productStore = new productsModel_1.ProductModel();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listOrder = yield orderStore.index();
        res.json(listOrder);
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
        const { userId, orderProducts, status } = req.body;
        const existingUser = yield userStore.show(userId);
        if (!existingUser) {
            res.status(404);
            res.json("Cannot found user");
        }
        const createNewOrder = yield orderStore.create({ userId, status });
        if (createNewOrder) {
            // create order product
            const createProductOrder = yield Promise.allSettled(orderProducts.length > 0 && (orderProducts === null || orderProducts === void 0 ? void 0 : orderProducts.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                const existingProduct = yield productStore.show(item.productId);
                if (existingProduct) {
                    yield orderProductsStore.create({ orderId: createNewOrder.id, productId: item.productId, quantity: item.quantity });
                }
                else {
                    Promise.reject(`Product not found with id: ${item.productId}`);
                }
            }))));
            res.json({
                id: createNewOrder.id,
                userId: createNewOrder.userId,
                status: createNewOrder.status,
                orderProducts: createProductOrder
            });
        }
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
