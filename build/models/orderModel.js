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
exports.OrderModel = void 0;
const database_1 = __importDefault(require("../database"));
class OrderModel {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sqlQuery = "SELECT * FROM orders;";
                const result = yield connect.query(sqlQuery);
                connect.release();
                return result.rows;
            }
            catch (error) {
                throw new Error("Cannot get any orders");
            }
        });
    }
    getOrderByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sqlQuery = `SELECT * FROM orders where user_id = ($1)`;
                const result = yield connect.query(sqlQuery, [userId]);
                connect.release();
                return result.rows;
            }
            catch (error) {
                throw new Error("Cannot found any orders of current user");
            }
        });
    }
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sqlQuery = "INSERT INTO orders (user_id, product_id, quantity, status) VALUES ($1, $2, $3, $4) RETURNING *";
                const connect = yield database_1.default.connect();
                const result = yield connect.query(sqlQuery, [order.userId, order.productId, order.quantity, order.status]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error("Cannot create new order of user");
            }
        });
    }
}
exports.OrderModel = OrderModel;
