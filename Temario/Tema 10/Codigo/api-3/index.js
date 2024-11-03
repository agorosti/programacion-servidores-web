// Importar Express, Mongoose, y otras dependencias
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();

// Middleware para manejar datos en formato JSON
app.use(express.json());

// Conectar a MongoDB
mongoose.connect("mongodb://localhost:27017/yourdatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definir el esquema y el modelo para Items
const itemSchema = new mongoose.Schema({
  name: String,
});
const Item = mongoose.model("Item", itemSchema);

// Definir el esquema y el modelo para Usuarios
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});
const User = mongoose.model("User", userSchema);

// Middleware para autenticar token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, "your_jwt_secret", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Ruta para registrar nuevos usuarios
app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send("Usuario registrado");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Ruta para autenticar usuarios y obtener un token JWT
app.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user == null) return res.status(400).send("Usuario no encontrado");

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ username: user.username }, "your_jwt_secret");
      res.json({ token });
    } else {
      res.status(403).send("Contraseña incorrecta");
    }
  } catch {
    res.status(500).send("Error en el servidor");
  }
});

// Crear (Create) un nuevo ítem
app.post("/items", authenticateToken, async (req, res) => {
  try {
    const newItem = new Item({
      name: req.body.name,
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Leer (Read) todos los ítems
app.get("/items", authenticateToken, async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Leer (Read) un ítem por ID
app.get("/items/:id", authenticateToken, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).send("El ítem no fue encontrado.");
    res.json(item);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Actualizar (Update) un ítem por ID
app.put("/items/:id", authenticateToken, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).send("El ítem no fue encontrado.");

    item.name = req.body.name;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Eliminar (Delete) un ítem por ID
app.delete("/items/:id", authenticateToken, async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).send("El ítem no fue encontrado.");
    res.json(item);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
