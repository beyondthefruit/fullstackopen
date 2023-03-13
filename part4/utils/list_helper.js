const blog = require('../models/blog');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const total = blogs.reduce((acc, currBlog) => {
    acc += currBlog.likes;
    return acc;
  }, 0);
  return total;
};

module.exports = {
  dummy,
  totalLikes,
};
