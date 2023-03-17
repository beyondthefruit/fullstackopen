const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');
const helper = require('./test_helpers');

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
}, 20000);

test('that blogs are returned as JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('that there are two blogs', async () => {
  const response = await api.get('/api/blogs');
  console.log(response.body);
  expect(response.body).toHaveLength(2);
});

test('that unique identifier is named id', async () => {
  const response = await api.get('/api/blogs');
  console.log(response.body[0].id);
  // console.log(id);
  // we have to use [0] to check this property
  expect(response.body[0].id).toBeDefined();
  expect(response.body[0]._id).not.toBeDefined();
});

test('a valid post can be added', async () => {
  const newPost = {
    _id: '5a422aa71b54a676222020200211111',
    title: 'Testing the revolution',
    author: 'K.H Poilu',
    url: 'http://www.u.unilibre.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 15,
    __v: 0,
  };

  await api
    .post('/api/blogs')

    .send(newPost)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
});

//close database connection used by Mongoose
afterAll(async () => {
  await mongoose.connection.close();
});
