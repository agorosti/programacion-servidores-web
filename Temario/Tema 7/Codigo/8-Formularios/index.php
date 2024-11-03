<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Formulario con PHP</title>
  </head>
  <body>
    <h1>Formulario de Contacto</h1>
    <form action="procesar.php" method="POST">
      <label for="nombre">Nombre:</label>
      <input type="text" id="nombre" name="nombre" /><br /><br />

      <label for="email">Email:</label>
      <input type="email" id="email" name="email" /><br /><br />

      <input type="submit" value="Enviar" />
    </form>
  </body>
</html>
