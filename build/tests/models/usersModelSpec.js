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
const usersModel_1 = require("../../models/usersModel");
const database_1 = __importDefault(require("../../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
describe('User models', () => {
    let mockClient;
    let userStore;
    let mockBcrypt;
    beforeEach(() => {
        // Initialize the instance before each test
        userStore = new usersModel_1.UserModel();
        mockClient = spyOn(database_1.default, 'connect');
        mockBcrypt = spyOn(bcrypt_1.default, "compareSync");
    });
    const mockDataUserTest = [
        {
            id: 1,
            firstName: 'user',
            lastName: "test",
            username: "usertest1",
            password: "password123"
        }
    ];
    describe('index() method', () => {
        it('should have index method define', () => {
            expect(userStore.index()).toBeDefined();
        });
        it("index method should return list all user", () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.returnValue({
                query: () => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        rows: mockDataUserTest // Mock rows data
                    });
                }),
                release: () => { } // Mock release method
            });
            const result = yield userStore.index();
            expect(result).toEqual(mockDataUserTest);
        }));
        it("should throw an error if unable to get products", () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.throwError("Connection error");
            yield expectAsync(userStore.index()).toBeRejectedWithError("Cannot get any users");
        }));
    });
    describe('show() method', () => {
        it('should have show method define', () => {
            expect(userStore.show()).toBeDefined();
        });
        it("show method should return a user by id", () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.returnValue({
                query: () => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        rows: mockDataUserTest // Mock rows data
                    });
                }),
                release: () => { } // Mock release method
            });
            const result = yield userStore.show(1);
            expect(result).toEqual(mockDataUserTest[0]);
        }));
        it("should throw an error if unable to get products", () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.throwError("Connection error");
            yield expectAsync(userStore.show()).toBeRejectedWithError("Cannot found current user");
        }));
    });
    describe('create() method', () => {
        it('should have creatre method define', () => {
            expect(userStore.create()).toBeDefined();
        });
        it("show method should return a product by id", () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.returnValue({
                query: () => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        rows: mockDataUserTest // Mock rows data
                    });
                }),
                release: () => { } // Mock release method
            });
            const result = yield userStore.create(mockDataUserTest[0]);
            expect(result).toEqual(mockDataUserTest[0]);
        }));
        it("should throw an error if unable to get products", () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.throwError("Connection error");
            yield expectAsync(userStore.create(mockDataUserTest[0])).toBeRejectedWithError("Cannot create new user");
        }));
    });
    describe('authentication() method', () => {
        it('should have authentication method define', () => {
            expect(userStore.authentication()).toBeDefined();
        });
        it("create method should return a new product after created", () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.returnValue({
                query: () => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        rows: [{ username: "usertest", password: "password123" }] // Mock rows data
                    });
                }),
                release: () => { } // Mock release method
            });
            mockBcrypt.and.returnValue(true);
            const result = yield userStore.authentication({ username: "usertest", password: "password123" });
            expect(result).toEqual({ username: "usertest", password: "password123" });
        }));
        it("should throw an error if authentication error", () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.throwError("Connection error");
            yield expectAsync(userStore.authentication()).toBeRejectedWithError("Authentication error");
        }));
    });
});
