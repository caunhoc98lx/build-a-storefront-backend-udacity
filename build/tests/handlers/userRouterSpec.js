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
const userRouter_1 = __importDefault(require("../../handlers/userRouter"));
const usersModel_1 = require("../../models/usersModel");
const database_1 = __importDefault(require("../../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
describe('User Routes', () => {
    let app;
    let userModelMock;
    let token;
    let mockClient;
    beforeEach(() => {
        app = (0, express_1.default)();
        (0, userRouter_1.default)(app);
        userModelMock = new usersModel_1.UserModel();
        mockClient = spyOn(database_1.default, 'connect');
    });
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoibmFtaGFpIiwicGFzc3dvcmQiOiIkMmIkMTAkOS5TRkpwZXlYSmZhai5BblBSalRrdUNCQmdLQ0VoSm4weHFrZVBmVGhFU2N0OVVXdnRhR20ifSwiaWF0IjoxNzExMDE0MDg5fQ.3gNVdj0SLsCQbT0OR2eX_es8cOkwtwoFOQwcVFUCqzw";
    }));
    describe('GET /users', () => {
        it('should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUsers = [{ id: 1, firstName: 'John', lastName: 'Doe' }];
            mockClient.and.returnValue({
                query: () => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        rows: mockUsers // Mock rows data
                    });
                }),
                release: () => { } // Mock release method
            });
            spyOn(jsonwebtoken_1.default, 'verify').and.returnValue();
            const response = yield (0, supertest_1.default)(app).get('/users').set('Authorization', `Bearer ${token}`);
            ;
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUsers);
        }));
        it('should handle errors', () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.throwError("Connection error");
            const response = yield (0, supertest_1.default)(app).get('/users').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(400);
        }));
    });
    describe('GET /user/:id', () => {
        it('should return a user by user id', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUsers = [{ id: 1, firstName: 'John', lastName: 'Doe' }];
            mockClient.and.returnValue({
                query: () => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        rows: mockUsers // Mock rows data
                    });
                }),
                release: () => { } // Mock release method
            });
            spyOn(jsonwebtoken_1.default, 'verify').and.returnValue();
            const response = yield (0, supertest_1.default)(app).get('/user/1').set('Authorization', `Bearer ${token}`);
            ;
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUsers[0]);
        }));
        it('should handle errors', () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.throwError("Connection error");
            const response = yield (0, supertest_1.default)(app).get('/user/1').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(400);
        }));
    });
    describe('POST /user', () => {
        it('should return a user when create new', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUsers = { firstName: 'John', lastName: 'Doe', username: "johndoe", password: "password123" };
            mockClient.and.returnValue({
                query: () => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        rows: mockUsers // Mock rows data
                    });
                }),
                release: () => { } // Mock release method
            });
            spyOn(jsonwebtoken_1.default, 'verify').and.returnValue();
            spyOn(bcrypt_1.default, 'hashSync').and.returnValue(mockUsers.password);
            spyOn(userModelMock, 'create').and.returnValue(mockUsers);
            const response = yield (0, supertest_1.default)(app).post('/user').set('Authorization', `Bearer ${token}`);
            ;
            expect(response.body).toEqual({});
        }));
        it('should handle errors', () => __awaiter(void 0, void 0, void 0, function* () {
            mockClient.and.throwError("Connection error");
            const response = yield (0, supertest_1.default)(app).post('/user').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(400);
        }));
    });
});
