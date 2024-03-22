import jasmine from "jasmine";
import { UserModel } from "../../models/usersModel"
import { ProductModel } from "../../models/productsModel";
import client from "../../database";
import bcrypt from "bcrypt"
import { OrderModel } from "../../models/orderModel";

describe('Order models', () => {
    let mockClient: any;
    let orderStore: any;
    let mockBcrypt: any

    beforeEach(() => {
        // Initialize the instance before each test
        orderStore = new OrderModel();

        mockClient = spyOn(client, 'connect');
        mockBcrypt = spyOn(bcrypt, "compareSync");
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
        })

        it("index method should return list all order", async () => {
            mockClient.and.returnValue({
                query: async () => ({
                    rows: mockDataOrderTest // Mock rows data
                }),
                release: () => { } // Mock release method
            });
            const result = await orderStore.index();
            expect(result).toEqual(mockDataOrderTest);
        })

        it("should throw an error if unable to get order", async () => {
            mockClient.and.throwError("Connection error");
            await expectAsync(orderStore.index()).toBeRejectedWithError("Cannot get any orders")
        })
    });

    describe('getOrderByUser() method', () => {
        it('should have show method define', () => {
            expect(orderStore.getOrderByUser()).toBeDefined();
        })

        it("show method should return a user by id", async () => {
            mockClient.and.returnValue({
                query: async () => ({
                    rows: mockDataOrderTest[1] // Mock rows data
                }),
                release: () => { } // Mock release method
            });
            const result = await orderStore.getOrderByUser(3);
            expect(result).toEqual(mockDataOrderTest[1]);
        })

        it("should throw an error if unable to get order", async () => {
            mockClient.and.throwError("Connection error");
            await expectAsync(orderStore.getOrderByUser()).toBeRejectedWithError("Cannot found any orders of current user")
        })
    });

    describe('create() method', () => {
        it('should have creatre method define', () => {
            expect(orderStore.create()).toBeDefined();
        })

        it("show method should return a order when created", async () => {
            mockClient.and.returnValue({
                query: async () => ({
                    rows: [mockDataOrderTest[0]] // Mock rows data
                }),
                release: () => { } // Mock release method
            });
            const result = await orderStore.create(mockDataOrderTest[0]);
            expect(result).toEqual(mockDataOrderTest[0]);
        })

        it("should throw an error if unable to create order", async () => {
            mockClient.and.throwError("Connection error");
            await expectAsync(orderStore.create(mockDataOrderTest[0])).toBeRejectedWithError("Cannot create new order of user")
        })
    });
})