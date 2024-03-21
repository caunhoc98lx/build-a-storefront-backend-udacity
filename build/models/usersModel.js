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
exports.UserModel = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserModel {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sqlQuery = "SELECT * FROM users;";
                const result = yield connect.query(sqlQuery);
                connect.release();
                return result.rows;
            }
            catch (error) {
                throw new Error("Cannot get any users");
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sqlQuery = `SELECT * FROM users where id = ($1)`;
                const result = yield connect.query(sqlQuery, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error("Cannot found current user");
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sqlQuery = "INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4) RETURNING *";
                const connect = yield database_1.default.connect();
                const result = yield connect.query(sqlQuery, [user.firstName, user.lastName, user.username, user.password]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error("Cannot create new user");
            }
        });
    }
    authentication(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sqlQuery = "SELECT username, password FROM public.users WHERE username = ($1)";
                const result = yield connect.query(sqlQuery, [username]);
                if (result.rows.length) {
                    const user = result.rows[0];
                    if (bcrypt_1.default.compareSync(password, user.password)) {
                        return user;
                    }
                }
                return null;
            }
            catch (error) {
                throw new Error("Authentication error");
            }
        });
    }
}
exports.UserModel = UserModel;
