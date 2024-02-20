const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");

describe("POST /create-user", () => {
    beforeAll(async () => {
        const mongoURI = process.env.TEST_MONGO_URI;
        await mongoose.connect(mongoURI);
        await mongoose.connection.dropDatabase();
    });

    test("Should respond with status 400 and create a new user", async () => {
        const newUser = {
            firstName: "TestFirstName",
            lastName: "TestLastName",
            email: "TestEmail@gmail.com",
            password: "TestPassword",
            confirmPassword: "TestPassword"
        };
        const response = await request(app).post("/create-user").send(newUser)
        
        expect(response.statusCode).toBe(200);
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
});
