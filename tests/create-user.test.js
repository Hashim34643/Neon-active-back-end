const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");

describe("POST /create-user", () => {
    beforeAll(async () => {
        const mongoURI = process.env.TEST_MONGO_URI;
        await mongoose.connect(mongoURI);
        await mongoose.connection.dropDatabase();
    });
    test("Should respond with status 200 and create a new user", async () => {
        const newUser = {
            firstName: "TestFirstName",
            lastName: "TestLastName",
            email: "TestEmail@gmail.com".toLowerCase(),
            password: "TestPassword",
            confirmPassword: "TestPassword"
        };
        const response = await request(app).post("/create-user").send(newUser)
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('newUser');
        expect(response.body.newUser).toHaveProperty('_id');
        expect(response.body.newUser.firstName).toBe(newUser.firstName);
        expect(response.body.newUser.lastName).toBe(newUser.lastName);
        expect(response.body.newUser.email).toBe(newUser.email);
    });
    test("Should respond with status 400 if email already exists", async () => {
        const user = {
            firstName: "Existing",
            lastName: "User",
            email: "existing@example.com",
            password: "TestPassword",
            confirmPassword: "TestPassword"
        };
        await request(app).post("/create-user").send(user);

        const newUser = {
            firstName: "New",
            lastName: "User",
            email: "existing@example.com".toLowerCase(),
            password: "TestPassword",
            confirmPassword: "TestPassword"
        };
        const response = await request(app).post("/create-user").send(newUser);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("This email is already in use try sign-in");
    });
    test("Should respond with status 400 and error message if first name is missing", async () => {
        const newUser = {
            lastName: "TestLastName",
            email: "TestEmail@gmail.com",
            password: "TestPassword",
            confirmPassword: "TestPassword"
        };
        const response = await request(app).post("/create-user").send(newUser);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("First name cannot be empty");
    });
    test("Should respond with status 400 and error message if last name is missing", async () => {
        const newUser = {
            firstName: "TestLastName",
            email: "TestEmail@gmail.com",
            password: "TestPassword",
            confirmPassword: "TestPassword"
        };
        const response = await request(app).post("/create-user").send(newUser);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Last name cannot be empty");
    });
    afterAll(async () => {
        await mongoose.connection.close();
    });
    test("Should respond with status 400 and error message if email is missing or invalid", async () => {
        const newUser = {
            firstName: "TestFirstName",
            lastName: "TestLastName",
            password: "TestPassword",
            confirmPassword: "TestPassword"
        };
        const response = await request(app).post("/create-user").send(newUser);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Invalid email");

        const newUser2 = {
            firstName: "TestFirstName",
            lastName: "TestLastName",
            email: "InvalidEmail",
            password: "TestPassword",
            confirmPassword: "TestPassword"
        };
        const response2 = await request(app).post("/create-user").send(newUser2);

        expect(response2.statusCode).toBe(400);
        expect(response2.body.message).toBe("Invalid email");
    });
    test("Should respond with status 400 and error message if password is invalid", async () => {
        const newUser = {
            firstName: "TestFirstName",
            lastName: "TestFirstName",
            email: "TestEmail@gmail.com",
            password: "sds",
            confirmPassword: "TestPassword"
        };
        const response = await request(app).post("/create-user").send(newUser);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Password must have 5 characters minimum");
    });
    test("Should respond with status 400 and error message if confirm password is invalid", async () => {
        const newUser = {
            firstName: "TestFirstName",
            lastName: "TestFirstName",
            email: "TestEmail@gmail.com",
            password: "TestPassword",
            confirmPassword: "TestPassword123"
        };
        const response = await request(app).post("/create-user").send(newUser);

        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Both passwords must be the same");
    });
    afterAll(async () => {
        await mongoose.connection.close();
    });
});