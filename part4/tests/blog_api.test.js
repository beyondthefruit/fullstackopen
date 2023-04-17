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

test('that if the likes property is missing from request it return 0', async () => {
  const newPost = {
    _id: '5a422aa71b54a676222023939939399',
    title: 'Testing the revolution',
    author: 'K.H Poilu',
    url: 'http://www.u.unilibre.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  };
  await api
    .post('/api/blogs')
    .send(newPost)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  const blogAtEnd = await helper.blogsInDb();

  // console.log(blogAtEnd);
  const blogLength = (await blogAtEnd.length) - 1;
  // console.log(blogLength);
  lastBlog = blogAtEnd[blogLength];
  console.log(lastBlog);
  expect(lastBlog.likes).toBe(0);
});

test('that verify that if title or url properties are missing the backend respond with status 400', async () => {
  const newPost = {
    _id: '5a422aa71b54a676222023939939399',
    author: 'K.H Poilu',
    likes: 5,
  };
  await api.post('/api/blogs').send(newPost).expect(400);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];
  console.log(blogsAtStart);
  console.log(blogToDelete);

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();
  console.log('this is blogsAtEnd', blogsAtEnd);
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

  const title = blogsAtEnd.map((b) => b.title);

  console.log(title);
  expect(title).not.toContain(blogToDelete.title);
});

test('that a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];
  const likes = { likes: 3 };
  console.log(blogToUpdate);
  await api.put(`/api/blogs/${blogToUpdate.id}`).send(likes).expect(200);
  const blogsAtEnd = await helper.blogsInDb();
  console.log(blogsAtEnd);
  const updatedBlog = blogsAtEnd[0];
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  expect(updatedBlog.likes).toBe(3);
});
//close database connection used by Mongoose
afterAll(async () => {
  await mongoose.connection.close();
});
