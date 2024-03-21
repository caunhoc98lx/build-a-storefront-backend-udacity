"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const productRouter_1 = __importDefault(require("./handlers/productRouter"));
const userRouter_1 = __importDefault(require("./handlers/userRouter"));
const orderRouter_1 = __importDefault(require("./handlers/orderRouter"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
var corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
(0, productRouter_1.default)(app);
(0, userRouter_1.default)(app);
(0, orderRouter_1.default)(app);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
