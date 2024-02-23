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
        const loginUser = await request(app).post("/login").send({
            email: "TestEmail@gmail.com".toLowerCase(),
            password: "TestPassword",
        })
        const jwtToken = loginUser.body.token;
        const updatedData = {
            firstName: 'Updated',
            lastName: 'User',
            email: 'updated@example.com'
        };
        const response = await request(app)
        .patch('/user/testusername/update').set("Authorization", `Bearer ${jwtToken}`).send(updatedData);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'User details updated successfully.');
        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toMatchObject(updatedData);
    });
    test("Should respond with 401 if no JWT token is provided", async () => {
        const newUser = {
            username: "TestUseername",
            firstName: "TestFirstName",
            lastName: "TestLastName",
            email: "TestEmailee@gmail.com".toLowerCase(),
            password: "TestPassword",
            confirmPassword: "TestPassword"
        };
        const addUser = await request(app).post("/create-user").send(newUser)
        const updatedData = {
            firstName: 'Updated',
        };
        const response = await request(app)
            .patch("/user/testuseername/update")
            .send(updatedData);
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("message", "Unauthorized access!");
    });
    test("Should respond with 401 if invalid JWT token is provided", async () => {
        const newUser = {
            username: "TestUseeername",
            firstName: "TestFirstName",
            lastName: "TestLastName",
            email: "TestEmaileee@gmail.com".toLowerCase(),
            password: "TestPassword",
            confirmPassword: "TestPassword"
        };
        const addUser = await request(app).post("/create-user").send(newUser)
        const updatedData = {
            firstName: "dsgsg"
        };
        const invalidToken = "INVALID_TOKEN";
        const response = await request(app)
            .patch("/user/testuseeername/update")
            .set("Authorization", `Bearer ${invalidToken}`)
            .send(updatedData);
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("message", "Unauthorized access!");
    });
    test('Should handle user not found', async () => {
        const newUser = {
            username: "TeestUsername",
            firstName: "TestFirstName",
            lastName: "TestLastName",
            email: "TeestEmail@gmail.com".toLowerCase(),
            password: "TestPassword",
            confirmPassword: "TestPassword"
        };
        const addUser = await request(app).post("/create-user").send(newUser)
        const loginUser = await request(app).post("/login").send({
            email: "TeestEmail@gmail.com".toLowerCase(),
            password: "TestPassword",
        })
        const jwtToken = loginUser.body.token;
        const updatedData = {
            firstName: 'Updated',
            lastName: 'User',
            email: 'updated@example.com'
        };
        const response = await request(app)
            .patch('/user/nonexistentuser/update').set("Authorization", `Bearer ${jwtToken}`).send(updatedData);
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('message', 'User not found');
        });
        afterAll(async () => {
            await mongoose.connection.close();
        });
});