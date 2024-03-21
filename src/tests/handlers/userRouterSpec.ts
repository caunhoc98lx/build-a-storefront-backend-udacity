import express from "express";
import request from 'supertest';
import jwt from "jsonwebtoken";
import userRoute from "../../handlers/userRouter";
import { UserModel } from "../../models/usersModel";
import client from "../../database";
import bcrypt from 'bcrypt'


describe('User Routes', () => {
    let app: any;
    let userModelMock: any;
    let token: string;
    let mockClient: any

    beforeEach(() => {
        app = express();
        userRoute(app);
        userModelMock = new UserModel();
        mockClient = spyOn(client, 'connect');
    });

    beforeAll(async () => {
        token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoibmFtaGFpIiwicGFzc3dvcmQiOiIkMmIkMTAkOS5TRkpwZXlYSmZhai5BblBSalRrdUNCQmdLQ0VoSm4weHFrZVBmVGhFU2N0OVVXdnRhR20ifSwiaWF0IjoxNzExMDE0MDg5fQ.3gNVdj0SLsCQbT0OR2eX_es8cOkwtwoFOQwcVFUCqzw";
      });

    describe('GET /users', () => {
        it('should return a list of users', async () => {
            const mockUsers = [{ id: 1, firstName: 'John', lastName: 'Doe' }];
            mockClient.and.returnValue({
                query: async () => ({
                    rows: mockUsers // Mock rows data
                }),
                release: () => { } // Mock release method
            });

            spyOn(jwt, 'verify').and.returnValue()
    
            const response = await request(app).get('/users').set('Authorization', `Bearer ${token}`);;
    
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUsers)
        });
    
        it('should handle errors', async () => {
            mockClient.and.throwError("Connection error");
    
            const response = await request(app).get('/users').set('Authorization', `Bearer ${token}`);
    
            expect(response.status).toBe(400);
        });
    });

    describe('GET /user/:id', () => {
        it('should return a user by user id', async () => {
            const mockUsers = [{ id: 1, firstName: 'John', lastName: 'Doe' }];
            mockClient.and.returnValue({
                query: async () => ({
                    rows: mockUsers // Mock rows data
                }),
                release: () => { } // Mock release method
            });

            spyOn(jwt, 'verify').and.returnValue()
    
            const response = await request(app).get('/user/1').set('Authorization', `Bearer ${token}`);;
    
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockUsers[0])
        });
    
        it('should handle errors', async () => {
            mockClient.and.throwError("Connection error");
    
            const response = await request(app).get('/user/1').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(400);
        });
    });

    describe('POST /user', () => {
        it('should return a user when create new', async () => {
            const mockUsers = { firstName: 'John', lastName: 'Doe', username: "johndoe", password: "password123" };
            mockClient.and.returnValue({
                query: async () => ({
                    rows: mockUsers // Mock rows data
                }),
                release: () => { } // Mock release method
            });

            spyOn(jwt, 'verify').and.returnValue()
            spyOn(bcrypt, 'hashSync').and.returnValue(mockUsers.password);
            spyOn(userModelMock, 'create').and.returnValue(mockUsers)
    
            const response = await request(app).post('/user').set('Authorization', `Bearer ${token}`);;
            expect(response.body).toEqual({});
        });
    
        it('should handle errors', async () => {
            mockClient.and.throwError("Connection error");
            
            const response = await request(app).post('/user').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(400);
        });
    });
})
