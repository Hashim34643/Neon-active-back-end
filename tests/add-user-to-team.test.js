const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Team = require('../models/create-team'); 
const mongoURI = require("../models/db");

describe('GET /teams', () => {
    beforeAll(async () => {
        await mongoose.connect(mongoURI); 
        await mongoose.connection.dropDatabase();
    });
    
    test('Should add user to team', async () => {
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
        const newUser2 = {
            username: "TestUsername2",
            firstName: "TestFirstName2",
            lastName: "TestLastName2",
            email: "TestEmail2@gmail.com".toLowerCase(),
            password: "TestPassword2",
            confirmPassword: "TestPassword2"
        };
        const addUser2 = await request(app).post("/create-user").send(newUser2)
        const loginUser2 = await request(app).post("/login").send({
            email: "TestEmail2@gmail.com".toLowerCase(),
            password: "TestPassword2",
        });
        const jwtToken2 = loginUser2.body.token;

        await request(app).post('/create-team').set("Authorization", `Bearer ${jwtToken}`).send({ teamName: 'Team Alpha' });
        
        const response = await request(app).patch('/team/team alpha/add').send({teamName: "team alpha", username: "testusername2"});
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.team.members).toHaveLength(2);
    });
    test('Should handle the case where user does not exist', async () => {
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
        await request(app).post('/create-team').set("Authorization", `Bearer ${jwtToken}`).send({ teamName: 'Team Alpha2' });
        const response = await request(app).patch('/team/team alpha/add').send({teamName: "team alpha", username: "invalid username"});
        
        expect(response.statusCode).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('User not found');
    });
    test('Should handle the case where team does not exist', async () => {
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
        const response = await request(app).patch('/team/team alpha3/add').send({teamName: "team alpha3", username: "testusername"});
        expect(response.statusCode).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Team not found');
    });
    test('Should handle the case where user is already a member of the team', async () => {
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
        await request(app).post('/create-team').set("Authorization", `Bearer ${jwtToken}`).send({ teamName: 'Team Alpha4' });
        const response = await request(app).patch('/team/team alpha4/add').send({teamName: "team alpha4", username: "testusername"});
        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('User is already a member');
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });
});