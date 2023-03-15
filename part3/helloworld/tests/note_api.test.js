const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('notes are returned as json file', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

//close database connection used by Mongoose
afterAll(async () => {
  await mongoose.connection.close();
});
