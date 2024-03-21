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
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const productRouter_1 = __importDefault(require("../../handlers/productRouter"));
const database_1 = __importDefault(require("../../database"));
describe('Product Routes', () => {
    let app;
    let token;
    let mockClient;
    beforeEach(() => {
        app = (0, express_1.default)();
        (0, productRouter_1.default)(app);
        mockClient = spyOn(database_1.default, 'connect');
    });
    describe('GET /products', () => {
        it('should return a list of products', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockProduct = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
            mockClient.and.returnValue({
                query: () => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        rows: mockProduct // Mock rows data
                    });
                }),
                release: () => { } // Mock release method
            });
            const response = yield (0, supertest_1.default)(app).get('/products');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockProduct);
        }));
        it('should handle errors', () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.throwError("Connection error");
            const response = yield (0, supertest_1.default)(app).get('/products');
            expect(response.status).toBe(400);
        }));
    });
    describe('GET /product/:id', () => {
        it('should return a product by product id', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockProduct = [{ id: 1, name: 'Product 1' }];
            mockClient.and.returnValue({
                query: () => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        rows: mockProduct // Mock rows data
                    });
                }),
                release: () => { } // Mock release method
            });
            spyOn(jsonwebtoken_1.default, 'verify').and.returnValue();
            const response = yield (0, supertest_1.default)(app).get('/product/1');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockProduct[0]);
        }));
        it('should handle errors', () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.throwError("Connection error");
            const response = yield (0, supertest_1.default)(app).get('/product/1');
            expect(response.status).toBe(400);
        }));
    });
    describe('GET /product', () => {
        it('should return a product by category', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockProduct = [{ id: 1, name: 'Product 1', price: 120000, category: "test 1" }, { id: 2, name: 'Product 2', price: 140000, category: "test 1" }];
            mockClient.and.returnValue({
                query: () => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        rows: mockProduct // Mock rows data
                    });
                }),
                release: () => { } // Mock release method
            });
            spyOn(jsonwebtoken_1.default, 'verify').and.returnValue();
            const response = yield (0, supertest_1.default)(app).get('/product')
                .send({ category: "test 1" });
            expect(response.body).toEqual({});
        }));
        it('should handle errors', () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.throwError("Connection error");
            const response = yield (0, supertest_1.default)(app).get('/product');
            expect(response.status).toBe(400);
        }));
    });
});
