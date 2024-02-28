const Goal = require('../models/add-goals')
const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const mongoURI = require("../models/db");
const jwt = require("jsonwebtoken");




let jwtToken = ""
let UserId = ""


const addNewUser = async () => {
   const newUser = {
       username: "sardaramiri",
       firstName: "Sardar",
       lastName: "Amiri",
       email: "sardaramiri@gmail.com".toLowerCase(),
       password: "GetGoalForSpesificUser",
       confirmPassword: "GetGoalForSpesificUser"
   };
   await request(app).post("/create-user").send(newUser)
}


const loginUser = async () => {
   const loginUser = await request(app).post("/login").send({
       email: "sardaramiri@gmail.com".toLowerCase(),
       password: "GetGoalForSpesificUser",
   })
   jwtToken = loginUser.body.token;
}


const addNewGoal = async () => {
   const goalData = {
       goalType: "Muscle gain",
       target_points: 500,
       description: `Complete 500 points worth of workouts this week to gain Muscle`
   };
    await request(app)
   .post("/create-goals")
   .set("Authorization", `jwt ${jwtToken}`)
   .send(goalData);
}
const getUserId = () => {
   const token = jwtToken;
   const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
   userId = decodedToken.userId;
}




describe('Get Goal For Spesific User', () => {
   beforeAll(async () => {
       await mongoose.connect(mongoURI);
       await mongoose.connection.dropDatabase();
       await addNewUser()
       await loginUser()
       await addNewGoal()
       await getUserId()
     
     
     
   });
 
   test('Status 200: should get all goals for a specific user', async () => {


     const response = await request(app)
    .get(`/user/${userId}/goals`)
    .set("Authorization", `jwt ${jwtToken}`)


    expect(response.statusCode).toBe(200);
    expect(response.body.goals).toBeInstanceOf(Array);
    response.body.goals.forEach(goal => {
       expect(typeof goal._id).toBe('string')
       expect(typeof goal.user).toBe('string')
       expect(typeof goal.goalType).toBe('string')
       expect(typeof goal.target_points).toBe('number')
       expect(typeof goal.description).toBe('string')
       expect(typeof goal.startDate).toBe('string')
       expect(typeof goal.endDate).toBe('string')
      
   });
 
  
   });
   test('should return 404 if user ID is invalid', async() => {
       const response = await request(app)
       .get(`/user/banana/goals`)
       .set("Authorization", `jwt ${jwtToken}`)


     
       expect(response.statusCode).toBe(404); 
       expect(response.body.message).toBe('Invalid User ID');
   })
   test('should return 404 if No Goal found for user ID a valid', async() => {
       const response = await request(app)
       .get(`/user/111111111111111111111111/goals`)
       .set("Authorization", `jwt ${jwtToken}`)
       expect(response.statusCode).toBe(404); 
       expect(response.body.message).toBe(`No Goal Found for this userId 111111111111111111111111`);
   })
    afterAll(async () => {
       await mongoose.connection.close();
   });
 });
