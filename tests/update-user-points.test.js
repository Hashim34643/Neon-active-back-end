const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const mongoURI = require("../models/db");
const User = require("../models/create-user");

describe("PATCH /user/:username/points/add", () => {
  beforeAll(async () => {
    await mongoose.connect(mongoURI); 
    await mongoose.connection.dropDatabase();
  });

  test("Should add points successfully", async () => {
      const newUser = {
        username: "Test123",
        firstName: "TestFirstName",
        lastName: "TestLastName",
        email: "William123@gmail.com".toLowerCase(),
        password: "William123",
        confirmPassword: "William123"
    };
    const createUser = await request(app).post("/create-user").send(newUser);

    const pointsToAdd = 50;
    const response = await request(app)
      .patch(`/user/test123/points/add`)
      .send({ pointsToAdd });
      
      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe(`${pointsToAdd} points added successfully`);
      const updatedUser = await User.findById(response.body.updatedUser._id); 
      expect(updatedUser.points).toBe(pointsToAdd); 
    });
    
    test("Should return 400 if pointsToAdd is missing", async () => { 
        
        const response = await request(app)
        .patch(`/user/test123/points/add`);
        
        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('pointsToAdd must be a number');
    });

  test("Should return 400 if pointsToAdd is not a number", async () => {
    const response = await request(app)
    .patch(`/user/test123/points/add`)
    .send({ pointsToAdd: "notANumber" });
    
    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('pointsToAdd must be a number');
});

test("Should return 404 if user is not found", async () => {
    const pointsToAdd = 50;
    
    const response = await request(app)
    .patch("/user/invalidUsername/points/add")
    .send({ pointsToAdd }); 
    
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('User not found');
});

afterAll(async () => {
  await mongoose.connection.close();
});
});