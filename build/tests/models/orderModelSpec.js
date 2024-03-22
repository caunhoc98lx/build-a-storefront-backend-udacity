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
const database_1 = __importDefault(require("../../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const orderModel_1 = require("../../models/orderModel");
describe('Order models', () => {
    let mockClient;
    let orderStore;
    let mockBcrypt;
    beforeEach(() => {
        // Initialize the instance before each test
        orderStore = new orderModel_1.OrderModel();
        mockClient = spyOn(database_1.default, 'connect');
        mockBcrypt = spyOn(bcrypt_1.default, "compareSync");
    });
    const mockDataOrderTest = [
        {
            "id": 2,
            "user_id": 1,
            "status": "active"
        },
        {
            "id": 6,
            "user_id": 3,
            "status": "active"
        }
    ];
    describe('index() method', () => {
        it('should have index method define', () => {
            expect(orderStore.index()).toBeDefined();
        });
        it("index method should return list all order", () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.returnValue({
                query: () => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        rows: mockDataOrderTest // Mock rows data
                    });
                }),
                release: () => { } // Mock release method
            });
            const result = yield orderStore.index();
            expect(result).toEqual(mockDataOrderTest);
        }));
        it("should throw an error if unable to get order", () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.throwError("Connection error");
            yield expectAsync(orderStore.index()).toBeRejectedWithError("Cannot get any orders");
        }));
    });
    describe('getOrderByUser() method', () => {
        it('should have show method define', () => {
            expect(orderStore.getOrderByUser()).toBeDefined();
        });
        it("show method should return a user by id", () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.returnValue({
                query: () => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        rows: mockDataOrderTest[1] // Mock rows data
                    });
                }),
                release: () => { } // Mock release method
            });
            const result = yield orderStore.getOrderByUser(3);
            expect(result).toEqual(mockDataOrderTest[1]);
        }));
        it("should throw an error if unable to get order", () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.throwError("Connection error");
            yield expectAsync(orderStore.getOrderByUser()).toBeRejectedWithError("Cannot found any orders of current user");
        }));
    });
    describe('create() method', () => {
        it('should have creatre method define', () => {
            expect(orderStore.create()).toBeDefined();
        });
        it("show method should return a order when created", () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.returnValue({
                query: () => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        rows: [mockDataOrderTest[0]] // Mock rows data
                    });
                }),
                release: () => { } // Mock release method
            });
            const result = yield orderStore.create(mockDataOrderTest[0]);
            expect(result).toEqual(mockDataOrderTest[0]);
        }));
        it("should throw an error if unable to create order", () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.throwError("Connection error");
            yield expectAsync(orderStore.create(mockDataOrderTest[0])).toBeRejectedWithError("Cannot create new order of user");
        }));
    });
});
