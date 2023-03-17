const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response, next) => {
  const blog = await Blog.find({});
  response.json(blog);
});

blogsRouter.post('/', async (request, response, next) => {
  // const blog = new Blog(request.body);

  // blog.save().then((result) => {
  //   response.status(201).json(result);
  const body = request.body;
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  try {
    const savedBlogs = await blog.save();
    response.status(201).json(savedBlogs);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
