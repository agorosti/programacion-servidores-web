
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PHP Integrado</title>
</head>
<body>
  <h1>Lista de Nombres</h1>
  <ul>
    <?php
      $nombres = array("Ana", "Carlos", "Luis", "Marta", "Juan");
      // Generar la lista dinámica
      foreach ($nombres as $nombre) {
        echo "<li>" . $nombre . "</li>";
      }
    ?>
  </ul>
</body>
</html>
