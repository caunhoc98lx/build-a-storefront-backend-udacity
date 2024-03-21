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
const productsModel_1 = require("../models/productsModel");
const verifyAuthToken_1 = require("../util/verifyAuthToken");
const store = new productsModel_1.ProductModel();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const listProduct = yield store.index();
        res.json(listProduct);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const show = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = _req.params;
        const getProduct = yield store.show(id);
        res.json(getProduct);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, price, category } = req.body;
        const createNewProduct = yield store.create({ name, price, category });
        res.json(createNewProduct);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const filterByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.body;
        const createNewProduct = yield store.filterByCategory(category !== null && category !== void 0 ? category : "laptop");
        res.json(createNewProduct);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
});
const productRoute = (app) => {
    app.get("/products", index),
        app.get("/product/:id", show),
        app.post("/product", verifyAuthToken_1.verifyAuthTokenMiddleware, create),
        app.get("/product", filterByCategory);
};
exports.default = productRoute;
