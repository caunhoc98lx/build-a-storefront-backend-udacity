import jasmine from "jasmine";
import { ProductModel } from "../../models/productsModel"
import client from "../../database";

describe('Product models', () => {
    let mockClient: any;
    let productStore: any;

    beforeEach(() => {
        // Initialize the instance before each test
        productStore = new ProductModel();

        mockClient = spyOn(client, 'connect');
    });

    describe('index() method', () => {
        it('should have index method define', () => {
            expect(productStore.index()).toBeDefined();
        })

        it("index method should return list all product", async () => {
            mockClient.and.returnValue({
                query: async () => ({
                    rows: [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }] // Mock rows data
                }),
                release: () => { } // Mock release method
            });
            const result = await productStore.index();
            expect(result).toEqual([{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }]);
        })

        it("should throw an error if unable to get products", async () => {
           mockClient.and.throwError("Connection error");
           await expectAsync(productStore.index()).toBeRejectedWithError("Cannot get any product")
        })
    });

    describe('show() method', () => {
        it('should have show method define', () => {
            expect(productStore.show()).toBeDefined();
        })

        it("show method should return a product by id", async () => {
            mockClient.and.returnValue({
                query: async () => ({
                    rows: [{ id: 1, name: 'Product 1' }] // Mock rows data
                }),
                release: () => { } // Mock release method
            });
            const result = await productStore.show(1);
            expect(result).toEqual({ id: 1, name: 'Product 1' });
        })

        it("should throw an error if unable to get products", async () => {
            mockClient.and.throwError("Connection error");
            await expectAsync(productStore.show()).toBeRejectedWithError("Cannot found current product")
         })
    });

    describe('create() method', () => {
        it('should have create method define', () => {
            expect(productStore.create()).toBeDefined();
        })

        it("create method should return a new product after created", async () => {
            mockClient.and.returnValue({
                query: async () => ({
                    rows: [{ id: 1, name: 'Product 1', price: 120000, category: "test" }] // Mock rows data
                }),
                release: () => { } // Mock release method
            });
            const result = await productStore.create({ id: 1, name: 'Product 1', price: 120000, category: "test" });
            expect(result).toEqual({ id: 1, name: 'Product 1', price: 120000, category: "test" });
        })

        it("should throw an error if unable to create new product", async () => {
            mockClient.and.throwError("Connection error");
            await expectAsync(productStore.create()).toBeRejectedWithError("Cannot create new product")
         })
    });

    describe('filterByCategory() method', () => {
        it('should have filterByCategory method define', () => {
            expect(productStore.filterByCategory()).toBeDefined();
        })

        it("filterByCategory method should return a list products by category", async () => {
            mockClient.and.returnValue({
                query: async () => ({
                    rows: [{ id: 1, name: 'Product 1', price: 120000, category: "test 1" }, { id: 2, name: 'Product 2', price: 140000, category: "test 1" }] // Mock rows data
                }),
                release: () => { } // Mock release method
            });
            const result = await productStore.filterByCategory("test 1");
            expect(result).toEqual([{ id: 1, name: 'Product 1', price: 120000, category: "test 1" }, { id: 2, name: 'Product 2', price: 140000, category: "test 1" }]);
        })

        it("should throw an error if unable to filter by category product", async () => {
            mockClient.and.throwError("Connection error");
            await expectAsync(productStore.filterByCategory()).toBeRejectedWithError("Cannot filter by category")
         })
    })
})