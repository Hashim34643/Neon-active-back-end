const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/create-user');
const mongoURI = require("../models/db");

describe('PATCH /users/:username/update', () => {
    beforeAll(async () => {
        await mongoose.connect(mongoURI);
        await mongoose.connection.dropDatabase();
    });

    
    test('Should update user details', async () => {
        const newUser = {
            username: "TestUsername",
            firstName: "TestFirstName",
            lastName: "TestLastName",
            email: "TestEmail@gmail.com".toLowerCase(),
            password: "TestPassword",
            confirmPassword: "TestPassword"
        };
        const addUser = await request(app).post("/create-user").send(newUser)
        const updatedData = {
            firstName: 'Updated',
            lastName: 'User',
            email: 'updated@example.com'
        };

        const response = await request(app)
        .patch('/user/TestUsername/update')
        .send(updatedData);
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User details updated successfully.');
        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toMatchObject(updatedData);
    });  
    test('Should handle user not found', async () => {
        const updatedData = {
            firstName: 'Updated',
            lastName: 'User',
            email: 'updated@example.com'
        };

        const response = await request(app)
            .patch('/user/nonexistentuser/update')
            .send(updatedData);
            
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('message', 'User not found.');
        });

        afterAll(async () => {
            await mongoose.connection.close();
        });
});
