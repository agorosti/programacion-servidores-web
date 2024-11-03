<?php
  // Iniciar una nueva sesión o reanudar una existente
  session_start();

  // Verificar si el formulario ha sido enviado
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Almacenar el nombre del usuario en la sesión
    $_SESSION['usuario'] = $_POST['nombre'];
  }
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gestión de Sesiones</title>
</head>
<body>
  <h1>Formulario de Sesión</h1>

  <!-- Formulario para ingresar el nombre -->
  <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST">
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" name="nombre" required><br><br>
    <input type="submit" value="Iniciar Sesión">
  </form>

  <br>

  <?php
    // Mostrar el nombre almacenado en la sesión, si existe
    if (isset($_SESSION['usuario'])) {
      echo "<p>Bienvenido, " . htmlspecialchars($_SESSION['usuario']) . ".</p>";
    }
  ?>
</body>
</html>
