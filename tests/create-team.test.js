const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/create-user');
const Team = require('../models/create-team'); 
const mongoURI = require("../models/db");

describe('POST /create-team', () => {
  beforeAll(async () => {
    await mongoose.connect(mongoURI); 
    await mongoose.connection.dropDatabase();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test('Should create a team successfully', async () => {
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

    const newTeamData = { 
      teamName: "Test Team" 
    };
    const response = await request(app)
      .post("/create-team")
      .set("Authorization", `Bearer ${jwtToken}`) 
      .send(newTeamData);

    expect(response.status).toBe(201); 
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Team created successfully');
    expect(response.body.team.name).toBe("test team");
  });

  test("Should respond with 401 if no JWT token is provided", async () => {
    const response = await request(app)
      .post("/create-team") 
      .send({ teamName: "No Auth Team" }); 

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Unauthorized access!'); 
  });

  test("Should respond with 401 if invalid JWT token is provided", async () => {
    const response = await request(app)
      .post("/create-team") 
      .set("Authorization", `Bearer INVALID_TOKEN`) 
      .send({ teamName: "Bad Token Team" }); 

    expect(response.statusCode).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Unauthorized access!'); 
  });

  test("Should respond with 400 if team name is missing", async () => { 
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

    const response = await request(app)
      .post("/create-team") 
      .set("Authorization", `Bearer ${jwtToken}`)
      .send({}); 

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Team name is required'); 
  });
}); 
