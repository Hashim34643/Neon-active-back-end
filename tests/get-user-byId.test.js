const app = require("../app");
const request = require("supertest");

describe("GET /users/:id", () => {
    test("Should respond with status 200", async () => {
        const user_id = '65d5d4b34040db4ab012b6fd'
        const response = await request(app).get(`/users/${user_id}`);
        expect(response.statusCode).toBe(200);
        
    });
    test("Should respond a user object with all properties", async () => {
        const user_id = '65d5d4b34040db4ab012b6fd'
        const response = await request(app).get(`/users/${user_id}`);
        expect(response.body.users).toMatchObject({
            firstName: 'TestFirstName',
            lastName: 'TestLastName',
            email: 'william123@gmail.com',
        })
        
    });
    test('400 status: should handle invalid user ID', async () => {
        const invalidUserId = 'abc';
        const response = await request(app).get(`/users/${invalidUserId}`);
        expect(response.statusCode).toBe(400); 
        expect(response.body.message).toBe('Bad Request')
      });

    test('404 status: should handle user ID not found', async () => {
    const nonExistentUserId = '111111111111111111111111';
    const response = await request(app).get(`/users/${nonExistentUserId}`);
    expect(response.statusCode).toBe(404); 
    expect(response.body.message).toBe('Invalid Id')
    });
});