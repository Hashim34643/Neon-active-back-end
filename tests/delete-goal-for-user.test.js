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
        username: "mike123",
        firstName: "Mike",
        lastName: "Miller",
        email: "mikeMiller@example.com".toLowerCase(),
        password: "Mike123",
        confirmPassword: "Mike123"
    };
    await request(app).post("/create-user").send(newUser)
}

const loginUser = async () => {
    const loginUser = await request(app).post("/login").send({
        email: "mikeMiller@example.com".toLowerCase(),
        password: "Mike123",
    })
    jwtToken = loginUser.body.token;
}
 
const addNewGoal = async () => {
    const goalData = {
        goalType: "Muscle gain",
        target_points: 5000,
        description: `Complete 5000 points worth of workouts this week to gain Muscle`
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



describe('Delete Goal by ID for Spesific User', () => {
   beforeAll(async () => {
       await mongoose.connect(mongoURI);
       await mongoose.connection.dropDatabase();
       await addNewUser()
       await loginUser()
       await addNewGoal()
       await getUserId()
   });

   test.only('should delete a goal for a user', async () => {
   

   let goal = await Goal.findOne()
   let goal_id = goal.id.toString()
   

    const res = await request(app)
    .delete(`/user/${userId}/delete-goals/${goal_id}`)
    .set("Authorization", `jwt ${jwtToken}`)
    console.log(res.body)
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('success');
    expect(res.body).toHaveProperty('message');
   });

   test.only('should return 404 if user does not exist', async () => {
    await addNewUser()
       await loginUser()
       await addNewGoal()
       await getUserId()
    
        let goal = await Goal.findOne()
        goal_id = goal.id.toString()
       
      
       const res = await request(app)
       .delete(`/user/111111111111111111111111/delete-goals/${goal_id}`)
       .set("Authorization", `jwt ${jwtToken}`)

        expect(res.status).toBe(404); 
        expect(res.body.message).toBe('User not found')
});
test.only('should return 404 if goal does not exist', async () => {
    await addNewUser()
       await loginUser()
       await addNewGoal()
       await getUserId()
    
        let goal = await Goal.findOne()
        goal_id = goal.id.toString()
       
      
       const res = await request(app)
       .delete(`/user/${userId}/delete-goals/111111111111111111111111`)
       .set("Authorization", `jwt ${jwtToken}`)

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
       .delete(`/user/${UserId}/delete-goals/${goal_id}`)
       .set("Authorization", `jwt ${jwtToken}`)

        expect(res.status).toBe(404); 
        expect(res.body.message).toBe('Invalid ID')

   });

   afterAll(async () => {
       await mongoose.connection.close();
   });
});
