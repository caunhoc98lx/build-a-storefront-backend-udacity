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
const orderProductModel_1 = require("../../models/orderProductModel");
const database_1 = __importDefault(require("../../database"));
describe('Order Product models', () => {
    let mockClient;
    let orderProductStore;
    let mockBcrypt;
    beforeEach(() => {
        // Initialize the instance before each test
        orderProductStore = new orderProductModel_1.OrderProductsModel();
        mockClient = spyOn(database_1.default, 'connect');
    });
    const mockDataOrderProductTest = [
        {
            id: 1,
            orderId: 2,
            productId: 2,
            quantity: 4
        }
    ];
    describe('getListProductByOrder() method', () => {
        it('should have getListProductByOrder method define', () => {
            expect(orderProductStore.getListProductByOrder()).toBeDefined();
        });
        it("getListProductByOrder method should return list all product by order id", () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.returnValue({
                query: () => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        rows: mockDataOrderProductTest // Mock rows data
                    });
                }),
                release: () => { } // Mock release method
            });
            const result = yield orderProductStore.getListProductByOrder();
            expect(result).toEqual(mockDataOrderProductTest);
        }));
        it("should throw an error if unable to get products", () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.throwError("Connection error");
            yield expectAsync(orderProductStore.getListProductByOrder()).toBeRejectedWithError("Cannot found any  product by order id");
        }));
    });
    describe('create() method', () => {
        it('should have creatre method define', () => {
            expect(orderProductStore.create()).toBeDefined();
        });
        it("show method should return a order product by orderid", () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.returnValue({
                query: () => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        rows: mockDataOrderProductTest // Mock rows data
                    });
                }),
                release: () => { } // Mock release method
            });
            const result = yield orderProductStore.create(mockDataOrderProductTest[0]);
            expect(result).toEqual(mockDataOrderProductTest[0]);
        }));
        it("should throw an error if unable to get products", () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.throwError("Connection error");
            yield expectAsync(orderProductStore.create(mockDataOrderProductTest[0])).toBeRejectedWithError("Cannot create new orderProduct");
        }));
    });
});
