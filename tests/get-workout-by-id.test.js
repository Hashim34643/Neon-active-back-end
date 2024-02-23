const Workout = require('../models/get-workouts');
const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const mongoURI = require("../models/db");


let jwtToken = ""

const addNewUser = async () => {
    const newUser = {
        username: "sardaramiri",
        firstName: "sardar",
        lastName: "amiri",
        email: "sardaramiri@gmail.com".toLowerCase(),
        password: "12345",
        confirmPassword: "12345"
    };
    await request(app).post("/create-user").send(newUser)
}

const loginUser = async () => {
    const loginUser = await request(app).post("/login").send({
        email: "sardaramiri@gmail.com".toLowerCase(),
        password: "12345",
    })
    jwtToken = loginUser.body.token;
}
 
const addNewWorkout = async () => {
    const workoutData = {
        type: "weights",
        duration: 100
    };

     await request(app)
    .post("/workouts/add")
    .set("Authorization", `jwt ${jwtToken}`)
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

   test('should return the correct workout when a valid ID is provided', async () => {

       let workout_id = await Workout.findOne()
       workout_id = workout_id.id.toString()

       const res = await request(app)
        .get(`/workouts/${workout_id}`);
    
       expect(res.status).toBe(200);
       expect(typeof res.body).toBe('object');
       expect(res.body.workout._id).toBe(workout_id);
      
   });

   test('should return a 404 error when an invalid ID is provided', async () => {
        let workout_id = await Workout.findOne()
        workout_id = workout_id.id.toString()
        const workoutId = '111111111111111111111111';
      
       const res = await request(app)
           .get(`/workouts/${workoutId}`);

        expect(res.status).toBe(404); 
        expect(res.body.message).toBe('Invalid Id')
});

   test('should return a 400 error when workout ID is not found', async () => {
       
       const workoutId = 'abc';

       const res = await request(app)
           .get(`/workouts/${workoutId}`);

           expect(res.status).toBe(400); 
           expect(res.body.message).toBe('Bad Request')

   });

   afterAll(async () => {
       await mongoose.connection.close();
   });
});
