const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.static('build'));

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(express.json());
app.use(requestLogger);

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: 3,
    content: 'GET & POST are the most important methods of HTTP protocol',
    important: true,
  },
  {
    id: 4,
    content: 'Postie',
    important: true,
  },
];
// :id mean that we define the parameters for the routes (address)
app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  console.log(id);
  const note = notes.find((note) => {
    // console.log(note.id, typeof note.id, id, typeof id, note.id === id);

    //following means that if we can't find data we return an error 404
    note.id === id;
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  });
  console.log(note);
  response.json(note);
});

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

app.get('/api/notes', (request, response) => {
  response.json(notes);
});

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post('/api/notes', (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    // If the data saved in the body variable has the important property, the expression will evaluate to its value. If the property does not exist, then the expression will evaluate to false which is defined on the right-hand side of the vertical lines.
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3006;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
