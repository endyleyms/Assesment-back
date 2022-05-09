const supertest = require('supertest');
const mongoose = require('mongoose');
const { createUser } = require('./user.service');

const app = require('../../app');
const connectDB = require('../../config/database');
const users = require('./user.model');

const request = supertest(app);

describe('users EndPoints', () => {
    beforeAll(async () => {
        await connectDB();
        await createUser({
        email: 'pruebauser@test.com',
        password: '123',
        });
    });
    afterAll(async () => {
        await users.deleteMany();
        await mongoose.connection.close();
    });
    describe('POST /api/users', () => {
        test('should respond with a 404 status code POST', async () => {
        const res = await request.post('/api/users').send({
            email: '',
            password: '',
        });
        expect(res.statusCode).toEqual(404);
        });
    });
    describe('GET /api/users', () => {
        test('should respond with a 200 status code GET', async () => {
        const res = await request.get('/api/users');
        expect(res.statusCode).toEqual(200);
        });

        test('should respond with an array of users GET', async () => {
        const res = await request.get('/api/users');
        expect(res.body).toBeInstanceOf(Array);
        });
    });
    describe('GET /api/users/:id', () => {
        test('should respond with a 200 status code if search for id GET/:id', async () => {
            const res = await request.get('/api/users');
            const searchID = res.body[0]._id;
            const respond = await request.get(`/api/users/${searchID}`);

            expect(respond.statusCode).toEqual(200);
        });
    });
    describe('PATCH users/id ', () => {
        test('should respond with a 200 status code PACTH', async () => {
          const user = {
            password: '12345',
          };
          const res = await request.get('/api/users');
          const searchID = res.body[0]._id;
          const respond = await request.patch(`/api/users/${searchID}`).send(user);
    
          expect(respond.statusCode).toEqual(201);
        });
    });
    describe('DELETE /user/:id', () => {
        test('should respond with a 200 status code when delete user for body DELETE/:id', async () => {
          const res = await request.get('/api/users');
          const searchID = res.body[0]._id;
          const response = await request.delete(`/api/users/${searchID}`);
    
          expect(response.statusCode).toEqual(200);
        });
    });
});