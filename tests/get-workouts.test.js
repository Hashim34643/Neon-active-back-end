const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const mongoURI = require("../models/db");


describe("GET /users", () => {
    beforeAll(async () => {
        await mongoose.connect(mongoURI);
    });
    test("Should respond with status 200 and return all workouts", async () => {
        const response = await request(app).get("/workouts");
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.workouts)).toBe(true);
    });
    afterAll(async () => {
        await mongoose.connection.close();
    });
});