/ Importar módulos necesarios
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

// Cargar la especificación OpenAPI
const swaggerDocument = YAML.load(path.join(__dirname, "openapi.yaml"));

// Crear la aplicación de Express
const app = express();

// Middleware para manejar datos en formato JSON
app.use(express.json());

// Configurar Swagger UI para la documentación de OpenAPI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Array en memoria para almacenar datos
let items = [];

// Crear (Create) un nuevo ítem
app.post("/items", (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name,
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Leer (Read) todos los ítems
app.get("/items", (req, res) => {
  res.json(items);
});

// Leer (Read) un ítem por ID
app.get("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send("El ítem no fue encontrado.");
  res.json(item);
});

// Actualizar (Update) un ítem por ID
app.put("/items/:id", (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).send("El ítem no fue encontrado.");

  item.name = req.body.name;
  res.json(item);
});

// Eliminar (Delete) un ítem por ID
app.delete("/items/:id", (req, res) => {
  const itemIndex = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (itemIndex === -1)
    return res.status(404).send("El ítem no fue encontrado.");

  const deletedItem = items.splice(itemIndex, 1);
  res.json(deletedItem[0]);
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
  console.log("Documentación de la API disponible en http://localhost:3000/api-docs");
});
