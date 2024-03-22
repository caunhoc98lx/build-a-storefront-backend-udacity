import jasmine from "jasmine";
import { OrderProductsModel } from "../../models/orderProductModel"
import client from "../../database";

describe('Order Product models', () => {
    let mockClient: any;
    let orderProductStore: any;
    let mockBcrypt: any

    beforeEach(() => {
        // Initialize the instance before each test
        orderProductStore = new OrderProductsModel();
        mockClient = spyOn(client, 'connect');
    });

    const mockDataOrderProductTest = [
        {
            id: 1,
            orderId: 2,
            productId: 2,
            quantity: 4
        }
    ]

    describe('getListProductByOrder() method', () => {
        it('should have getListProductByOrder method define', () => {
            expect(orderProductStore.getListProductByOrder()).toBeDefined();
        })

        it("getListProductByOrder method should return list all product by order id", async () => {
            mockClient.and.returnValue({
                query: async () => ({
                    rows: mockDataOrderProductTest // Mock rows data
                }),
                release: () => { } // Mock release method
            });
            const result = await orderProductStore.getListProductByOrder();
            expect(result).toEqual(mockDataOrderProductTest);
        })

        it("should throw an error if unable to get products", async () => {
            mockClient.and.throwError("Connection error");
            await expectAsync(orderProductStore.getListProductByOrder()).toBeRejectedWithError("Cannot found any  product by order id")
        })
    });

    describe('create() method', () => {
        it('should have creatre method define', () => {
            expect(orderProductStore.create()).toBeDefined();
        })

        it("show method should return a order product by orderid", async () => {
            mockClient.and.returnValue({
                query: async () => ({
                    rows: mockDataOrderProductTest // Mock rows data
                }),
                release: () => { } // Mock release method
            });
            const result = await orderProductStore.create(mockDataOrderProductTest[0]);
            expect(result).toEqual(mockDataOrderProductTest[0]);
        })

        it("should throw an error if unable to get products", async () => {
            mockClient.and.throwError("Connection error");
            await expectAsync(orderProductStore.create(mockDataOrderProductTest[0])).toBeRejectedWithError("Cannot create new orderProduct")
        })
    });
})