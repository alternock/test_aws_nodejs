const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Habilitar CORS para todas las rutas
app.use(cors());

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Datos de ejemplo
let users = [
  { id: 1, name: 'Juan' },
  { id: 2, name: 'María' }
];

// Endpoint 1: GET /users
app.get('/users', (req, res) => {
  res.json(users);
});

// Endpoint 2: POST /users
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Endpoint 3: PUT /users/:id
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }
  
  users[userIndex].name = req.body.name;
  res.json(users[userIndex]);
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
