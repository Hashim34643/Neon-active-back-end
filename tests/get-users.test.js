const app = require("../app");
const request = require("supertest");

describe("GET /users", () => {
    test("Should respond with status 200 and return all users", async () => {
        const response = await request(app).get("/users");
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.users)).toBe(true);
    });
});