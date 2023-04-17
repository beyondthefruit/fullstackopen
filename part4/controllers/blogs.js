const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

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

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

// blogsRouter.put('/:id', (request, response, next) => {
//   const body = request.body;

//   const blog = {
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.likes,
//   };

//   Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
//     .then((updateBlog) => {
//       response.json(updateBlog);
//     })
//     .catch((error) => next(error));
// });
blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog);
    response.status(200).json(updatedBlog);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
