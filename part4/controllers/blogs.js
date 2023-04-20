const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '');
  }
  return null;
};

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
  // response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post('/', async (request, response) => {
  // const blog = new Blog(request.body);

  // blog.save().then((result) => {
  //   response.status(201).json(result);
  const body = request.body;
  // const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  // const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }
  const user = await User.findById(decodedToken.id);

  // const user = await User.findById(body.userId);
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response, next) => {
  const { id, token } = request.params;

  //check if token is valid
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  console.log('this is decoded' + decodedToken);
  // const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' });
  }

  const user = await User.findById(decodedToken.id);
  console.log(`this is user` + user);
  // console.log(`this is user._id` + user._id);
  console.log(`this is user.id` + user.id.toString());
  // console.log(`this is req user.id` + request.user.id);
  const blog = await Blog.findById(id);
  console.log('blog id' + blog.user.toString());
  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(id);
    console.log(blog + 'has been deleted');
    response.status(204).end();
  } else {
    response.status(401).json({ error: 'Only creator can delete this blog' });
  }
  // try {
  //   await Blog.findByIdAndRemove(request.params.id);
  //   response.status(204).end();
  // } catch (exception) {
  //   next(exception);
  // }
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

blogsRouter.get('/:id', async (request, response, next) => {
  // const { id } = request.params;
  // const blog = await Blog.findById(id);

  // if (blog) {
  //   response.json(blog.toJSON());
  // } else {
  //   response.status(404).end();
  // }
  try {
    const blogs = await Blog.findById(request.params.id);
    if (blogs) {
      response.json(blogs);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;
