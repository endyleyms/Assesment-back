const supertest = require('supertest');
const mongoose = require('mongoose');
const userTest= {
    email: 'prueba@test.com',
    password: '123',
};

const userModel = require('../user/user.model');
const { signToken } = require('../auth/auth.service');

const app = require('../../app');
const connectDB = require('../../config/database');

const request = supertest(app);
let user;
let userToken;

describe('favorites EndPoints', () => {
    beforeAll(async () => {
      await connectDB();
      user = await userModel.create(userTest);
      userToken = signToken(user.profile);
    });
    afterAll(async () => {
      await userModel.findByIdAndDelete(user.id);
      await mongoose.connection.close();
    });
    describe('Get all favs', () => {
        test('should respond with a 200 status code', async () => {
          const allFavs = await request.get('/api/favs').set('authorization', `Bearer ${userToken}`);
          expect(allFavs.statusCode).toEqual(200);
        });
    });
    describe('Post task', () => {
        test('Shoul respond with a 200 status code POST', async () => {
          const newFav = await request.post('/api/favs').set('authorization', `Bearer ${userToken}`).send({
            name:'nombre de pruna',
            title: 'Prueba crear nueva lista fav',
            description:'descripción prueba',
            link:'https://www.youtube.com/'
          });
          expect(newFav.statusCode).toEqual(200);
          expect(newFav.body).toEqual(
            expect.objectContaining({
              title: expect.any(String),
            }),
          );
        });
    });
    describe('PATCH fav', () => {
        test('should respond with a 200 status code PATCH', async () => {
          const fav = {
            title: 'patch prueba fav',
          };
          const res = await request.get('/api/favs').set('authorization', `Bearer ${userToken}`);
          const searchById = res.body[0]._id;
          const response = await request.patch(`/api/favs/${searchById}`).set('authorization', `Bearer ${userToken}`).send(fav);
          expect(response.statusCode).toEqual(200);
        });
    });
    describe('DELETE fav', () => {
        test('Should respond with a 200 status code DELETE', async () => {
          const res = await request.get('/api/favs').set('authorization', `Bearer ${userToken}`);
          const searchById = res.body[0]._id;
          const response = await request.delete(`/api/favs/${searchById}`).set('authorization', `Bearer ${userToken}`);
          expect(response.statusCode).toEqual(204);
        });
    });
});