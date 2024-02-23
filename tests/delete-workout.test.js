const Workout = require('../models/get-workouts');
const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const mongoURI = require("../models/db");


let jwtToken = ""

const addNewUser = async () => {
    const newUser = {
        username: "deleteUserTest",
        firstName: "Delete",
        lastName: "User",
        email: "deleteuser@gmail.com".toLowerCase(),
        password: "DELETE",
        confirmPassword: "DELETE"
    };
    await request(app).post("/create-user").send(newUser)
}

const loginUser = async () => {
    const loginUser = await request(app).post("/login").send({
        email: "deleteuser@gmail.com".toLowerCase(),
        password: "DELETE",
    })
    jwtToken = loginUser.body.token;
}
 
const addNewWorkout = async () => {
    const workoutData = {
        type: "weights",
        duration: 500
    };

     await request(app)
    .post("/workouts/add")
    .set("Authorization", `jwt ${jwtToken}`)
    .send(workoutData);
}



describe('Delete Workout by ID', () => {
   beforeAll(async () => {
    await mongoose.connect(mongoURI);
    await mongoose.connection.dropDatabase();
    await addNewUser()
    await loginUser()
    await addNewWorkout()
   });

   test.only('should delete the workout when a valid ID is provided', async () => {
    

       let workout_id = await Workout.findOne()
       workout_id = workout_id.id.toString()

       const res = await request(app)
        .delete(`/workouts/${workout_id}`);
       
         expect(res.status).toBe(200);
         expect(res.body.message).toBe('Workout deleted successfully');

   });

   test.only('should return a 404 error when an invalid ID is provided', async () => {
    
        let workout_id = await Workout.findOne()
        workout_id = workout_id.id.toString()
        const workoutId = '111111111111111111111111';
      
       const res = await request(app)
           .delete(`/workouts/${workoutId}`);

        expect(res.status).toBe(404); 
        expect(res.body.message).toBe('Invalid Id, Workout not found')
});

   test.only('should return a 404 error when an invalid ID is provided', async () => {
       const workoutId = 'nonexistentWorkout';

       const res = await request(app)
           .delete(`/workouts/${workoutId}`);

           expect(res.status).toBe(404); 
           expect(res.body.message).toBe('Invalid Id, Workout not found')

   });

   afterAll(async () => {
       await mongoose.connection.close();
   });
});
