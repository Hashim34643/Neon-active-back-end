const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");

describe("POST /login", () => {
    beforeAll(async () => {
        const mongoURI = process.env.TEST_MONGO_URI;
        await mongoose.connect(mongoURI);
        await mongoose.connection.dropDatabase();
    });
    test("Should respond with status 200 and user details if successfull login", async () => {
        const newUser = {
            username: "Test123",
            firstName: "TestFirstName",
            lastName: "TestLastName",
            email: "William123@gmail.com".toLowerCase(),
            password: "William123",
            confirmPassword: "William123"
        };
        const createUser = await request(app).post("/create-user").send(newUser);

        const userInfo = {
            email: "william123@gmail.com",
            password: "William123"
        };
        const response = await request(app).post("/login").send(userInfo);
        console.log(response.body.user)

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.user).toEqual({
            _id: expect.any(String),
            username: "Test123",
            firstName: 'TestFirstName',
            lastName: 'TestLastName',
            email: 'william123@gmail.com',
        });
    });
    test("Should respond with 401 if user details do not match details in database", async () => {
        const invalidLoginInfo = {
            email: "notindb@gmail.com",
            password: "notindb"
        };
        const response = await request(app).post("/login").send(invalidLoginInfo);
        expect(response.statusCode).toBe(401)
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("User not found with given email")
    });
    afterAll(async () => {
        await mongoose.connection.close();
    });
})