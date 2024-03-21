import express from "express";
import request from 'supertest';
import jwt from "jsonwebtoken";
import productRoute from "../../handlers/productRouter";
import client from "../../database";
import bcrypt from 'bcrypt'


describe('Product Routes', () => {
    let app: any;
    let token: string; 
    let mockClient: any

    beforeEach(() => {
        app = express();
        productRoute(app);
        mockClient = spyOn(client, 'connect');
    });

    describe('GET /products', () => {
        it('should return a list of products', async () => {
            const mockProduct = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
            mockClient.and.returnValue({
                query: async () => ({
                    rows: mockProduct // Mock rows data
                }),
                release: () => { } // Mock release method
            });
    
            const response = await request(app).get('/products');
    
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockProduct)
        });
    
        it('should handle errors', async () => {
            mockClient.and.throwError("Connection error");
    
            const response = await request(app).get('/products');
    
            expect(response.status).toBe(400);
        });
    });

    describe('GET /product/:id', () => {
        it('should return a product by product id', async () => {
            const mockProduct = [{ id: 1, name: 'Product 1' }];
            mockClient.and.returnValue({
                query: async () => ({
                    rows: mockProduct // Mock rows data
                }),
                release: () => { } // Mock release method
            });

            spyOn(jwt, 'verify').and.returnValue()
    
            const response = await request(app).get('/product/1');
    
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockProduct[0])
        });
    
        it('should handle errors', async () => {
            mockClient.and.throwError("Connection error");
    
            const response = await request(app).get('/product/1');
            expect(response.status).toBe(400);
        });
    });

    describe('GET /product', () => {
        it('should return a product by category', async () => {
            const mockProduct = [{ id: 1, name: 'Product 1', price: 120000, category: "test 1" }, { id: 2, name: 'Product 2', price: 140000, category: "test 1" }];
            mockClient.and.returnValue({
                query: async () => ({
                    rows: mockProduct // Mock rows data
                }),
                release: () => { } // Mock release method
            });

            spyOn(jwt, 'verify').and.returnValue()
    
            const response = await request(app).get('/product')
            .send({category: "test 1"});
    
            expect(response.body).toEqual({})
        });
    
        it('should handle errors', async () => {
            mockClient.and.throwError("Connection error");
    
            const response = await request(app).get('/product');
            expect(response.status).toBe(400);
        });
    });

})
