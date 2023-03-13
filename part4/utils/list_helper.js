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

const favoriteBlog = (blogs) => {
  const favo = blogs.reduce((prev, curr) =>
    prev.likes > curr.likes ? prev : curr
  );

  const fav = {
    title: favo.title,
    author: favo.author,
    likes: favo.likes,
  };
  return fav;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
