"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_DEV_DB, POSTGRES_USER, POSTGRES_PASSWORD, ENV, POSTGRES_TEST_DB } = process.env;
let config;
console.log('env ', ENV);
if (ENV === "dev") {
    config = {
        host: POSTGRES_HOST,
        database: POSTGRES_DEV_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    };
}
if (ENV === "TEST") {
    config = {
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    };
}
const client = new pg_1.Pool(config);
exports.default = client;
