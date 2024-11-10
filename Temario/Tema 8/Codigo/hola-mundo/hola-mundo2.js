// Importar Express y dotenv
const express = require("express");
const path = require("path");
require("dotenv").config(); // Cargar variables de entorno desde el archivo .env

const app = express();

// Definir el puerto desde la variable de entorno o usar el 4000 por defecto
const port = process.env.PORT || 4000;

// Configurar Express para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

// Configurar Express para servir archivos CSS desde la subcarpeta "public/css
app.use("/css", express.static(path.join(__dirname, "public/css")));

// Definir una ruta GET para la raíz "/"
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Hola Mundo</title>
    </head>
    <body>
      <h1>Hola Mundo</h1>
      <p>Bienvenido a la página principal</p>
      <a href="/contacto">Ir a la página de contacto</a>
    </body>
    </html>
  `);
});

// Definir las rutas "/contacto", "/contact", y "/contacta" para servir el archivo contact.html
app.get(["/contacto", "/contact", "/contacta"], (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

// Ruta por defecto para manejar rutas no definidas y servir error404.html
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "error404.html"));
});

// Iniciar el servidor en el puerto especificado en la variable de entorno
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
