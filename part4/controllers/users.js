const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (password.length <= 3) {
    response.status(400).json({ error: 'min password size is 3 characters' });
  }
  if (username.length <= 3) {
    response.status(400).json({ error: 'min username size is 3 characters' });
  }

  const uniqueUser = await User.findOne({ username });
  if (uniqueUser) {
    return response
      .status(400)
      .json({ error: 'This username have already been created' });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    url: 1,
    title: 1,
    author: 1,
  });
  // response.json(users.map((user) => user.toJSON()));
  response.json(users);
});
usersRouter.get('/:id', async (request, response) => {
  try {
    const user = await User.findById(request.params.id);
    if (user) {
      response.json(user);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;
