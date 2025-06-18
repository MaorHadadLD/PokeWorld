const request = require('supertest');
const app = require('../app');

describe('Auth API', () => {
    it('should register a new user', async () => {
        const res = await request(app)
  .post('/api/users/register')
  .send({
    username: 'testuser1',
    email: 'testuser12@example.com',
    password: 'password33123'
  });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('token');
    });
});