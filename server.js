
const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

let usersDB = [
  { id: 1, name: "Alexis", age: 25 },
  { id: 2, name: "Juan", age: 21 },
  { id: 3, name: "Esteban", age: 20 },
  { id: 4, name: "Francisco", age: 28 },
  { id: 5, name: "Pablo", age: 28 },
  { id: 6, name: "Fernando", age: 24 },
];

//////////////////////////////

app.get("/local/users", (req, res) => {
  res.json(usersDB);
});


app.get("/local/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = usersDB.find((user) => user.id === id);

  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
  res.json(user);
});

app.post("/local/users", (req, res) => {
  const { name, age } = req.body;

  if (usersDB.some((user) => user.name === name)) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }

  const newUser = { id: usersDB.length + 1, name, age };
  usersDB.push(newUser);
  res.status(201).json(newUser);
});

app.put("/local/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = usersDB.find((user) => user.id === id);

  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  if (req.body.name) user.name = req.body.name;
  if (req.body.age) user.age = req.body.age;

  res.json(user);
});


app.delete("/local/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = usersDB.findIndex((user) => user.id === id);

  if (index === -1) return res.status(404).json({ message: "Usuario no encontrado" });

  const deletedUser = usersDB.splice(index, 1)[0];
  res.json(deletedUser);
});

///////////

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
