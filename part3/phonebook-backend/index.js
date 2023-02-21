const express = require('express');
const app = express();
app.use(express.json());

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  // response.json(person);

  if (person) {
    response.json(person);
  } else {
    response.statusMessage = `This user isn't in the phonebook`;
    response.status(404).end;
    // response.status(404).send(`This user isn't in the phonebook`).end;
  }
  response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

const generateId = () => {
  return Math.floor(Math.random() * (10000 - 5) + 5);
};
// console.log(generateId());
//get nu,ber of person in phonebook and date to request
app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people!</p>
  <p>${new Date().toString()} </p>
  `);
});

app.post('/api/persons', (request, response) => {
  const body = request.body;
  //catch if name or number is missing
  if (!body.name) {
    return response.status(400).json({
      error: 'name must be added',
    });
  }
  if (!body.number) {
    return response.status(400).json({
      error: 'number must be added',
    });
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };
  //catch if name exist already
  let checkName = persons.find((persona) => persona.name === person.name);
  console.log(checkName);

  if (checkName) {
    return response.status(400).json({
      error: 'name must be unique',
    });
  }

  persons = persons.concat(person);
  response.json(person);
});

const PORT = 3007;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
