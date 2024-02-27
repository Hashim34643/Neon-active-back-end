const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Team = require('../models/create-team'); 
const mongoURI = require("../models/db");

describe('GET /team/:/teamname', () => {
    beforeAll(async () => {
        await mongoose.connect(mongoURI); 
        await mongoose.connection.dropDatabase();
    });
    
    test('Should retrieve team by teamname', async () => {
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
        await request(app).post('/create-team').set("Authorization", `Bearer ${jwtToken}`).send({ teamName: 'Team Alpha' });

        const response = await request(app).get('/team/team alpha');
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.team.name).toEqual("team alpha");
    });
    test('Should handle the case where the team does not exist', async () => {
        const response = await request(app).get('/team/invalid team name');
        
        expect(response.statusCode).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Team not found');
    }); 

    afterAll(async () => {
        await mongoose.connection.close();
    });
});