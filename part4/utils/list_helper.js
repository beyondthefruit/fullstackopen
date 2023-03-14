const blog = require('../models/blog');
var _ = require('lodash');

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

// const mostBlog = (blogs) => {
//   const total = blogs.reduce((acc, curr) => {
//     acc += curr.author;
//     return acc;
//   }, 0);
// };

const mostBlogs = (blogs) => {
  const count = _.chain(blogs)
    .countBy('author')
    .toPairs()
    .maxBy(_.last)
    .value();
  console.log(count);
  const bestAuthor = {
    author: count[0],
    blogs: count[1],
  };
  return bestAuthor;
};

const mostLikes = (blogs) => {
  const count = _.chain(blogs)
    .groupBy('author')
    .map((objs, key) => ({
      author: key,
      likes: _.sumBy(objs, 'likes'),
    }))
    .value();

  return _.reduce(count, (acc, curr) => {
    return acc.likes > curr.likes ? acc : curr;
  });
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
