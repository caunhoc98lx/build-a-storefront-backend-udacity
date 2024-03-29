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
exports.ProductModel = void 0;
const database_1 = __importDefault(require("../database"));
class ProductModel {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sqlQuery = "select * from products;";
                const result = yield connect.query(sqlQuery);
                connect.release();
                return result.rows;
            }
            catch (error) {
                throw new Error("Cannot get any product");
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sqlQuery = `SELECT * FROM products where id = ($1)`;
                const result = yield connect.query(sqlQuery, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error("Cannot found current product");
            }
        });
    }
    create(prouduct) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sqlQuery = "INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *";
                const connect = yield database_1.default.connect();
                const result = yield connect.query(sqlQuery, [prouduct.name, prouduct.price, prouduct.category]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error("Cannot create new product");
            }
        });
    }
    filterByCategory(nameCategory) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sqlQuery = "SELECT * FROM products WHERE category = ($1)";
                const connect = yield database_1.default.connect();
                const result = yield connect.query(sqlQuery, [nameCategory]);
                connect.release();
                return result.rows;
            }
            catch (error) {
                throw new Error("Cannot filter by category");
            }
        });
    }
}
exports.ProductModel = ProductModel;
