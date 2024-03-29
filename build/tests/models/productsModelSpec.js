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
const productsModel_1 = require("../../models/productsModel");
const database_1 = __importDefault(require("../../database"));
describe('Product models', () => {
    let mockClient;
    let productStore;
    beforeEach(() => {
        // Initialize the instance before each test
        productStore = new productsModel_1.ProductModel();
        mockClient = spyOn(database_1.default, 'connect');
    });
    describe('index() method', () => {
        it('should have index method define', () => {
            expect(productStore.index()).toBeDefined();
        });
        it("index method should return list all product", () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.returnValue({
                query: () => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        rows: [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }] // Mock rows data
                    });
                }),
                release: () => { } // Mock release method
            });
            const result = yield productStore.index();
            expect(result).toEqual([{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }]);
        }));
        it("should throw an error if unable to get products", () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.throwError("Connection error");
            yield expectAsync(productStore.index()).toBeRejectedWithError("Cannot get any product");
        }));
    });
    describe('show() method', () => {
        it('should have show method define', () => {
            expect(productStore.show()).toBeDefined();
        });
        it("show method should return a product by id", () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.returnValue({
                query: () => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        rows: [{ id: 1, name: 'Product 1' }] // Mock rows data
                    });
                }),
                release: () => { } // Mock release method
            });
            const result = yield productStore.show(1);
            expect(result).toEqual({ id: 1, name: 'Product 1' });
        }));
        it("should throw an error if unable to get products", () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.throwError("Connection error");
            yield expectAsync(productStore.show()).toBeRejectedWithError("Cannot found current product");
        }));
    });
    describe('create() method', () => {
        it('should have create method define', () => {
            expect(productStore.create()).toBeDefined();
        });
        it("create method should return a new product after created", () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.returnValue({
                query: () => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        rows: [{ id: 1, name: 'Product 1', price: 120000, category: "test" }] // Mock rows data
                    });
                }),
                release: () => { } // Mock release method
            });
            const result = yield productStore.create({ id: 1, name: 'Product 1', price: 120000, category: "test" });
            expect(result).toEqual({ id: 1, name: 'Product 1', price: 120000, category: "test" });
        }));
        it("should throw an error if unable to create new product", () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.throwError("Connection error");
            yield expectAsync(productStore.create()).toBeRejectedWithError("Cannot create new product");
        }));
    });
    describe('filterByCategory() method', () => {
        it('should have filterByCategory method define', () => {
            expect(productStore.filterByCategory()).toBeDefined();
        });
        it("filterByCategory method should return a list products by category", () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.returnValue({
                query: () => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        rows: [{ id: 1, name: 'Product 1', price: 120000, category: "test 1" }, { id: 2, name: 'Product 2', price: 140000, category: "test 1" }] // Mock rows data
                    });
                }),
                release: () => { } // Mock release method
            });
            const result = yield productStore.filterByCategory("test 1");
            expect(result).toEqual([{ id: 1, name: 'Product 1', price: 120000, category: "test 1" }, { id: 2, name: 'Product 2', price: 140000, category: "test 1" }]);
        }));
        it("should throw an error if unable to filter by category product", () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.throwError("Connection error");
            yield expectAsync(productStore.filterByCategory()).toBeRejectedWithError("Cannot filter by category");
        }));
    });
});
