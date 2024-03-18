import { ProductModel } from "../../models/productsModel"

const productStore = new ProductModel();

describe('Product models', () => {
    it('should have index method define', () => {
        expect(productStore.index()).toBeDefined();
    })

    it("index method should return list all product", async () => {
        const result = await productStore.index();
        expect(result).toEqual([]);
    })
})