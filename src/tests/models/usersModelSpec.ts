import jasmine from "jasmine";
import { UserModel } from "../../models/usersModel"
import client from "../../database";
import bcrypt from "bcrypt"

describe('User models', () => {
    let mockClient: any;
    let userStore: any;
    let mockBcrypt: any

    beforeEach(() => {
        // Initialize the instance before each test
        userStore = new UserModel();

        mockClient = spyOn(client, 'connect');
        mockBcrypt = spyOn(bcrypt, "compareSync");
    });

    const mockDataUserTest = [
        {
            id: 1,
            firstName: 'user',
            lastName: "test",
            username: "usertest1",
            password: "password123"
        }
    ]

    describe('index() method', () => {
        it('should have index method define', () => {
            expect(userStore.index()).toBeDefined();
        })

        it("index method should return list all user", async () => {
            mockClient.and.returnValue({
                query: async () => ({
                    rows: mockDataUserTest // Mock rows data
                }),
                release: () => { } // Mock release method
            });
            const result = await userStore.index();
            expect(result).toEqual(mockDataUserTest);
        })

        it("should throw an error if unable to get products", async () => {
            mockClient.and.throwError("Connection error");
            await expectAsync(userStore.index()).toBeRejectedWithError("Cannot get any users")
        })
    });

    describe('show() method', () => {
        it('should have show method define', () => {
            expect(userStore.show()).toBeDefined();
        })

        it("show method should return a user by id", async () => {
            mockClient.and.returnValue({
                query: async () => ({
                    rows: mockDataUserTest // Mock rows data
                }),
                release: () => { } // Mock release method
            });
            const result = await userStore.show(1);
            expect(result).toEqual(mockDataUserTest[0]);
        })

        it("should throw an error if unable to get products", async () => {
            mockClient.and.throwError("Connection error");
            await expectAsync(userStore.show()).toBeRejectedWithError("Cannot found current user")
        })
    });

    describe('create() method', () => {
        it('should have creatre method define', () => {
            expect(userStore.create()).toBeDefined();
        })

        it("show method should return a product by id", async () => {
            mockClient.and.returnValue({
                query: async () => ({
                    rows: mockDataUserTest // Mock rows data
                }),
                release: () => { } // Mock release method
            });
            const result = await userStore.create(mockDataUserTest[0]);
            expect(result).toEqual(mockDataUserTest[0]);
        })

        it("should throw an error if unable to get products", async () => {
            mockClient.and.throwError("Connection error");
            await expectAsync(userStore.create(mockDataUserTest[0])).toBeRejectedWithError("Cannot create new user")
        })
    });

    describe('authentication() method', () => {
        it('should have authentication method define', () => {
            expect(userStore.authentication()).toBeDefined();
        })

        it("create method should return a new product after created", async () => {
            mockClient.and.returnValue({
                query: async () => ({
                    rows: [{ username: "usertest", password: "password123" }] // Mock rows data
                }),
                release: () => { } // Mock release method
            });
            mockBcrypt.and.returnValue(true)
            
            const result = await userStore.authentication({ username: "usertest", password: "password123" });
            expect(result).toEqual({ username: "usertest", password: "password123" });
        })

        it("should throw an error if authentication error", async () => {
            mockClient.and.throwError("Connection error");
            await expectAsync(userStore.authentication()).toBeRejectedWithError("Authentication error")
        })
    });

})