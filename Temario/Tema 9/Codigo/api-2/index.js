// Importar Express y Mongoose
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Middleware para manejar datos en formato JSON
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(
  "mongodb+srv://localhost:<db_password>@cluster0.bcd1bdp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {}
);

// Definir el esquema y el modelo
const itemSchema = new mongoose.Schema({
  name: String,
});
const Item = mongoose.model("Item", itemSchema);

// Crear (Create) un nuevo ítem
app.post("/items", async (req, res) => {
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
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Leer (Read) un ítem por ID
app.get("/items/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).send("El ítem no fue encontrado.");
    res.json(item);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Actualizar (Update) un ítem por ID
app.put("/items/:id", async (req, res) => {
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
app.delete("/items/:id", async (req, res) => {
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
