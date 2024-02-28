const Goal = require('../models/add-goals');
const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const mongoURI = require("../models/db");




let jwtToken = ""


const addNewUser = async () => {
   const newUser = {
       username: "username123",
       firstName: "Test",
       lastName: "GoalEndpoint",
       email: "testGoalEndpoint@gmail.com".toLowerCase(),
       password: "Goal",
       confirmPassword: "Goal"
   };
   await request(app).post("/create-user").send(newUser)
}


const loginUser = async () => {
   const loginUser = await request(app).post("/login").send({
       email: "testGoalEndpoint@gmail.com".toLowerCase(),
       password: "Goal",
   })
   jwtToken = loginUser.body.token;
}
const addNewGoal = async () => {
   const goalData = {
       goalType: "Endurance",
       target_points: 100,
       description: "Complete 350 points worth of workouts this week to gain Muscle"
   };


    await request(app)
   .post("/goals")
   .set("Authorization", `jwt ${jwtToken}`)
   .send(goalData);
}






describe('Add Goals', () => {
  beforeAll(async () => {
      await mongoose.connect(mongoURI);
      await mongoose.connection.dropDatabase();
      await addNewUser()
      await loginUser()
     
     
     
  });


  test.only('should return the correct workout when a valid ID is provided', async () => {
   const goalData = {
       goalType: "Endurance",
       target_points: 100,
       description: "Complete 350 points worth of workouts this week to gain Muscle"
   };


    const response = await request(app)
   .post("/goals")
   .set("Authorization", `jwt ${jwtToken}`)
   .send(goalData);
   console.log(jwtToken)
   console.log(response.body)
    
  });


 


  afterAll(async () => {
      await mongoose.connection.close();
  });
});
