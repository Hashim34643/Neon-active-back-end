const Goal = require('../models/add-goals');
const app = require("../app");
const request = require("supertest");
const mongoose = require("mongoose");
const mongoURI = require("../models/db");
const jwt = require("jsonwebtoken");
const updateGoal = require('../controllers/update-goal');


let jwtToken = ""
let userId = ""

const addNewUser = async () => {
    const newUser = {
        username: "blazingcyclist17",
        firstName: "Michael",
        lastName: "Thompson",
        email: "michael.thompson@example.com".toLowerCase(),
        password: "Cycling2024!",
        confirmPassword: "Cycling2024!"
    };
    await request(app).post("/create-user").send(newUser)
}

const loginUser = async () => {
    const loginUser = await request(app).post("/login").send({
        email: "michael.thompson@example.com".toLowerCase(),
        password: "Cycling2024!",
    })
    jwtToken = loginUser.body.token;
}
 
const addNewGoal = async () => {
    const goalData = {
        goalType: "Muscle gain",
        target_points: 50,
        description: `Complete 50 points worth of workouts this week to gain Muscle`
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



describe('Update Goal by ID for Spesific User', () => {
   beforeAll(async () => {
       await mongoose.connect(mongoURI);
       await mongoose.connection.dropDatabase();
       await addNewUser()
       await loginUser()
       await addNewGoal()
       await getUserId()
   });

   test.only('should return the correct goal when a valid ID is provided', async () => {
    const updatedData = {
        target_points: 9000
    }

   let goal = await Goal.findOne()
   let goal_id = goal.id.toString()
   

    const res = await request(app)
    .patch(`/user/${userId}/goals/${goal_id}`).send(updatedData)
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('goals', 'success', 'message');
    expect(res.body.goals).toHaveProperty('_id', 'user', 'goalType', 'target_points', 'description', 'startDate', 'endDate');
    expect(res.body.goals).toMatchObject(updatedData);
   });

   test.only('should return a 404 error when an invalid UserId is provided', async () => {
    const updatedData = {
        target_points: 9000
    }
        let goal = await Goal.findOne()
        goal_id = goal.id.toString()
       
      
       const res = await request(app)
       .patch(`/user/111111111111111111111111/goals/${goal_id}`).send(updatedData)

        expect(res.status).toBe(404); 
        expect(res.body.message).toBe('User not found')
});
test.only('should return a 404 error when an invalid goalId is provided with a Valid UserId', async () => {
    const updatedData = {
        target_points: 9000
    }
   const res = await request(app)
   .patch(`/user/${userId}/goals/111111111111111111111111`).send(updatedData)
    expect(res.status).toBe(404); 
    expect(res.body.message).toBe('Goal not found')
});


   test.only('should return a 404 error for nonExistend UserId or Goal ID', async () => {
    const updatedData = {
        target_points: 9000
    }
       const UserId = 'abc';
       const goal_id = 'abc'

       const res = await request(app)
        .patch(`/user/${userId}/goals/${goal_id}`).send(updatedData)
        expect(res.status).toBe(404); 
        expect(res.body.message).toBe('Invalid ID')

   });

   afterAll(async () => {
       await mongoose.connection.close();
   });
});
