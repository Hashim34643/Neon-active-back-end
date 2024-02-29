const Goal = require('../models/add-goals');
const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const mongoURI = require("../models/db");
const jwt = require("jsonwebtoken");


let jwtToken = ""
let userId = ""

const addNewUser = async () => {
    const newUser = {
        username: "coolrunner84",
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.johnson@example.com".toLowerCase(),
        password: "P@ssw0rd!",
        confirmPassword: "P@ssw0rd!"
    };
    await request(app).post("/create-user").send(newUser)
}

const loginUser = async () => {
    const loginUser = await request(app).post("/login").send({
        email: "sarah.johnson@example.com".toLowerCase(),
        password: "P@ssw0rd!",
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



describe('Get Goal by ID', () => {
   beforeAll(async () => {
       await mongoose.connect(mongoURI);
       await mongoose.connection.dropDatabase();
       await addNewUser()
       await loginUser()
       await addNewGoal()
       await getUserId()
   });

   test.only('should return the correct goal when a valid ID is provided', async () => {

       let goal = await Goal.findOne()
       let goal_id = goal.id.toString()
       

        const res = await request(app)
        .get(`/user/${userId}/goals/${goal_id}`)

        expect(res.statusCode).toBe(200);
        expect(res.body.goals).toBeInstanceOf(Array);
        res.body.goals.forEach(goal => {
        expect(typeof goal._id).toBe('string')
        expect(typeof goal.user).toBe('string')
        expect(typeof goal.goalType).toBe('string')
        expect(typeof goal.target_points).toBe('number')
        expect(typeof goal.description).toBe('string')
        expect(typeof goal.startDate).toBe('string')
        expect(typeof goal.endDate).toBe('string')
        
    });
      
   });

   test.only('should return a 404 error when an invalid UserId is provided', async () => {
        let goal = await Goal.findOne()
        goal_id = goal.id.toString()
       
      
       const res = await request(app)
       .get(`/user/111111111111111111111111/goals/${goal_id}`)

        expect(res.status).toBe(404); 
        expect(res.body.message).toBe('No goals found for this userId 111111111111111111111111')
});
test.only('should return a 404 error when an invalid goalId is provided with a Valid UserId', async () => {

   const res = await request(app)
   .get(`/user/${userId}/goals/1111111111111111111111111`)
    expect(res.status).toBe(404); 
    expect(res.body.message).toBe('Invalid ID')
});


   test.only('should return a 404 error when an invalid goalId and Invalid UserId is provided', async () => {
       
       const UserId = 'abc';
       const goal_id = 'abc'

       const res = await request(app)
        .get(`/user/${userId}/goals/${goal_id}`)
        expect(res.status).toBe(404); 
        expect(res.body.message).toBe('Invalid ID')

   });

   afterAll(async () => {
       await mongoose.connection.close();
   });
});
