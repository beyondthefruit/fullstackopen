require('dotenv').config();
const express = require('express');
const Person = require('./models/person');
const app = express();
// var morgan = require('morgan');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static('build'));
// tiny method second step to display the name, and number in console
// morgan.token('data', (req, res) => {
//   console.log(JSON.stringify(req.body));
//   return JSON.stringify(req.body);
// });
//tiny morgan method to display in console 1st step
// app.use(
//   morgan(':method :url :status :res[content-length] - :response-time ms :data')
// );

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

// const generateId = () => {
//   return Math.floor(Math.random() * (10000 - 5) + 5);
// };
// console.log(generateId());
//get nu,ber of person in phonebook and date to request
app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${Person.length} people!</p>
  <p>${new Date().toString()} </p>
  `);
});

app.post('/api/persons', (request, response) => {
  const body = request.body;
  //catch if name or number is missing
  if (body.name === undefined) {
    return response.status(400).json({
      error: 'name must be added',
    });
  }
  // if (!body.number) {
  if (body.number === undefined) {
    return response.status(400).json({
      error: 'number must be added',
    });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
    // id: generateId(),
  });
  //catch if name exist already
  // let checkName = persons.find((persona) => persona.name === person.name);
  // console.log(checkName);

  // if (checkName) {
  //   return response.status(400).json({
  //     error: 'name must be unique',
  //   });
  // }

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
  // persons = persons.concat(person);
  // response.json(person);
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
