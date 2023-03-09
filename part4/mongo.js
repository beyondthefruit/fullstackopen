const mongoose = require('mongoose');

// if (process.argv.length < 3) {
//   console.log('give password as argument');
//   process.exit(1);
// }

const password = process.argv[2];

const url = `MONGODB_URI=mongodb+srv://kevlar:${password}blog-data.4gily27.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false);
mongoose.connect(url);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

// const mongoUrl = 'mongodb://localhost/bloglist';
// mongoose.connect(mongoUrl);

const blog = new Blog({
  title: 'css',
  author: 'quincy larson',
  url: '',
  likes: 2,
});

// note.save().then((result) => {
//   console.log('note saved!');
//   mongoose.connection.close();
// });

// Note.find({}).then((result) => {
//   result.forEach((note) => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// });

// Note.find({ important: true }).then((result) => {
//   // ...
// });
