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
Object.defineProperty(exports, "__esModule", { value: true });
const productsModel_1 = require("../../models/productsModel");
const productStore = new productsModel_1.ProductModel();
describe('Product models', () => {
    it('should have index method define', () => {
        expect(productStore.index()).toBeDefined();
    });
    it("index method should return list all product", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield productStore.index();
        expect(result).toEqual([]);
    }));
});
