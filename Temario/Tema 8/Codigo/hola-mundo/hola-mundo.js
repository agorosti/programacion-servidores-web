// Importar Express
const express = require("express");
const app = express();

// Definir una ruta GET para la raíz "/"
app.get("/", (req, res) => {
  res.send("Hola <strong>Mundo</strong> cruel!");
});

// Definir una ruta GET para "/about"
app.get("/about", (req, res) => {
  res.send("about");
});

// Crear un servidor en el puerto 3000
app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
