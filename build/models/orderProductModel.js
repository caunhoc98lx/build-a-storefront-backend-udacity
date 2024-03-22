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
exports.OrderProductsModel = void 0;
const database_1 = __importDefault(require("../database"));
class OrderProductsModel {
    getListProductByOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sqlQuery = `SELECT * FROM order_products where order_id = ($1)`;
                const result = yield connect.query(sqlQuery, [orderId]);
                connect.release();
                return result.rows;
            }
            catch (error) {
                throw new Error("Cannot found any  product by order id");
            }
        });
    }
    create(orderProduct) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sqlQuery = "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *";
                const connect = yield database_1.default.connect();
                const result = yield connect.query(sqlQuery, [orderProduct.orderId, orderProduct.productId, orderProduct.quantity]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error("Cannot create new orderProduct");
            }
        });
    }
}
exports.OrderProductsModel = OrderProductsModel;
