<?php
  // Establecer la cookie de preferencia de idioma si el formulario fue enviado
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $idioma = $_POST['idioma'];
    setcookie("preferencia_idioma", $idioma, time() + (86400 * 30), "/"); // La cookie expira en 30 días
  }

  // Leer la cookie de preferencia de idioma
  $idioma_seleccionado = isset($_COOKIE['preferencia_idioma']) ? $_COOKIE['preferencia_idioma'] : "español";
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preferencia de Idioma</title>
</head>
<body>
  <h1>Gestión de Cookies en PHP</h1>

  <!-- Mostrar la preferencia de idioma guardada -->
  <p>Tu idioma preferido es: <?php echo htmlspecialchars($idioma_seleccionado); ?></p>

  <!-- Formulario para seleccionar el idioma preferido -->
  <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST">
    <label for="idioma">Selecciona tu idioma:</label>
    <select id="idioma" name="idioma">
      <option value="español" <?php if ($idioma_seleccionado == "español") echo "selected"; ?>>Español</option>
      <option value="ingles" <?php if ($idioma_seleccionado == "ingles") echo "selected"; ?>>Inglés</option>
    </select><br><br>

    <input type="submit" value="Guardar Preferencia">
  </form>
</body>
</html>
