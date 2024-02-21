const request = require("supertest");
const app = require("../app");
const mongoose = require('mongoose');
const Workout = require('../models/add-workout');

const User = require("../models/create-user");

let jwtToken = "";

const createTestUser = async () => {
    const userData = {
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        password: "password"
    };

    const user = new User(userData);
    await user.save();
};

const loginTestUser = async () => {
    const userData = {
        email: "test@example.com",
        password: "password"
    };

    const response = await request(app)
        .post("/login")
        .send(userData);

    jwtToken = response.body.token;
};

beforeAll(async () => {
    await mongoose.connection.dropDatabase();
    await createTestUser();
    await loginTestUser();
});

describe("POST /workouts/add", () => {
    test("Should add a new workout", async () => {
        const newUser = {
            firstName: "TestFirstName",
            lastName: "TestLastName",
            email: "TestEmail@gmail.com".toLowerCase(),
            password: "TestPassword",
            confirmPassword: "TestPassword"
        };
        
        const workoutData = {
            type: "weights",
            duration: 60
        };

        const response = await request(app)
            .post("/workouts/add")
            .set("Authorization", `jwt ${jwtToken}`)
            .send(workoutData);

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty("newWorkout");
        expect(response.body.newWorkout).toHaveProperty("_id");
        expect(response.body.newWorkout).toHaveProperty("type", workoutData.type);
        expect(response.body.newWorkout).toHaveProperty("duration", workoutData.duration);
    });

    test("Should respond with 401 if no JWT token is provided", async () => {
        const workoutData = {
            type: "weights",
            duration: 60
        };

        const response = await request(app)
            .post("/workouts/add")
            .send(workoutData);

        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("message", "Unauthorized access!");
    });

    test("Should respond with 401 if invalid JWT token is provided", async () => {
        const workoutData = {
            type: "weights",
            duration: 60
        };

        const invalidToken = "INVALID_TOKEN";

        const response = await request(app)
            .post("/workouts/add")
            .set("Authorization", `Bearer ${invalidToken}`)
            .send(workoutData);

        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty("message", "Unauthorized access!");
    });

    test("Should respond with 400 if an invalid workout type is provided", async () => {
        const workoutData = {
            type: "invalid_type",
            duration: 60
        };

        const response = await request(app)
            .post("/workouts/add")
            .set("Authorization", `Bearer ${jwtToken}`)
            .send(workoutData);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty("message", "Invalid workout type");
    });
    afterAll(async () => {
        await mongoose.connection.close();
    });
});
