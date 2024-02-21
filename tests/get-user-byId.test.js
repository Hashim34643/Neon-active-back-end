const User = require('../models/create-user')
const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose")

describe("GET /users/:id", () => {
    beforeAll(async () => {
        const mongoURI = process.env.TEST_MONGO_URI;
        await mongoose.connect(mongoURI);
        await mongoose.connection.dropDatabase();
    });
    test("Should respond a user object with all properties", async () => {
        const newUser = {
            firstName: "TestFirstName",
            lastName: "TestLastName",
            email: "TestEmail@gmail.com".toLowerCase(),
            password: "TestPassword",
            confirmPassword: "TestPassword"
        };
        const user = await request(app).post("/create-user").send(newUser)
        
        let user_id = await User.findOne()
        user_id = user_id.id.toString()
        const response = await request(app).get(`/users/${user_id}`);
        expect(response.body.users).toMatchObject({
            firstName: 'TestFirstName',
            lastName: 'TestLastName',
            email: 'testemail@gmail.com',
        })
        
    });
    test("Should respond with status 200", async () => {
        let user_id = await User.findOne()
        user_id = user_id.id.toString()
        const response = await request(app).get(`/users/${user_id}`);
        expect(response.statusCode).toBe(200);
        
    });
    test('400 status: should handle invalid user ID', async () => {
        const invalidUserId = 'abc';
        const response = await request(app).get(`/users/${invalidUserId}`);
        expect(response.statusCode).toBe(400); 
        expect(response.body.message).toBe('Bad Request')
      });

    test('404 status: should handle user ID not found', async () => {
    const nonExistentUserId = '111111111111111111111111';
    const response = await request(app).get(`/users/${nonExistentUserId}`);
    expect(response.statusCode).toBe(404); 
    expect(response.body.message).toBe('Invalid Id')
    });
    afterAll(async () => {
        await mongoose.connection.close();
    });
});