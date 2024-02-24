const Workout = require('../models/get-workouts');
const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const mongoURI = require("../models/db");


let jwtToken = ""

const addNewUser = async () => {
    const newUser = {
        username: "TestUsername",
        firstName: "TestFirstName",
        lastName: "TestLastName",
        email: "Test@gmail.com",
        password: "12345",
        confirmPassword: "12345"
    };
    await request(app).post("/create-user").send(newUser)
}

const loginUser = async () => {
    const loginUser = await request(app).post("/login").send({
        email: "test@gmail.com",
        password: "12345",
    })
    jwtToken = loginUser.body.token;
}
 
const addNewWorkout = async () => {
    const workoutData = {
        type: "weights",
        duration: 45
    };

     const add = await request(app)
    .post("/workouts/add")
    .set("authorization", `jwt ${jwtToken}`)
    .send(workoutData);

}



describe('Get Workout by ID', () => {
   beforeAll(async () => {
       await mongoose.connect(mongoURI);
       await mongoose.connection.dropDatabase();
       await addNewUser()
       await loginUser()
       await addNewWorkout()
   });

   test('should return all workouts when a valid username is provided', async () => {
        const response = await request(app).get("/user/workouts/testusername");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.workouts)).toBe(true);
        expect(response.body.workouts.length).toBeGreaterThan(0);
   });

   test('should return a 404 error when an invalid username is provided', async () => {
       const response = await request(app)
           .get(`/user/workouts/invalid`);

        expect(response.status).toBe(404); 
        expect(response.body.message).toBe('No workouts found for the specified user')
});

   afterAll(async () => {
       await mongoose.connection.close();
   });
});
