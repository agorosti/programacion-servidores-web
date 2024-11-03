<?php
  // Iniciar la sesión
  session_start();

  // Procesar el formulario de inicio de sesión
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = "admin";
    $password = "1234";

    // Verificar credenciales simuladas
    if ($_POST['nombre'] == $usuario && $_POST['password'] == $password) {
      $_SESSION['usuario'] = $usuario;
      $_SESSION['autenticado'] = true;

      // Si se selecciona "Mantener sesión iniciada", configurar una cookie
      if (isset($_POST['recordar'])) {
        setcookie("mantener_sesion", "true", time() + (86400 * 30), "/"); // Cookie válida por 30 días
      }
    } else {
      echo "<p>Credenciales incorrectas.</p>";
    }
  }

  // Verificar si la cookie "mantener_sesion" está configurada
  if (isset($_COOKIE['mantener_sesion']) && $_COOKIE['mantener_sesion'] == "true") {
    echo "<p>Bienvenido de nuevo, has decidido mantener la sesión iniciada.</p>";
  }

  // Cerrar sesión y eliminar la cookie
  if (isset($_POST['logout'])) {
    session_unset();
    session_destroy();
    setcookie("mantener_sesion", "", time() - 3600, "/"); // Expirar la cookie
    header("Location: " . $_SERVER['PHP_SELF']);
    exit();
  }
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recordar Sesión con Cookies</title>
</head>
<body>
  <h1>Recordar Sesión con Cookies</h1>

  <?php if (isset($_SESSION['autenticado']) && $_SESSION['autenticado']): ?>
    <p>Bienvenido, <?php echo htmlspecialchars($_SESSION['usuario']); ?>.</p>

    <!-- Formulario para cerrar sesión -->
    <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST">
      <input type="submit" name="logout" value="Cerrar Sesión">
    </form>
  <?php else: ?>
    <!-- Formulario de inicio de sesión -->
    <form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" method="POST">
      <label for="nombre">Nombre de Usuario:</label>
      <input type="text" id="nombre" name="nombre" required><br><br>

      <label for="password">Contraseña:</label>
      <input type="password" id="password" name="password" required><br><br>

      <label for="recordar">
        <input type="checkbox" id="recordar" name="recordar"> Mantener sesión iniciada
      </label><br><br>

      <input type="submit" value="Iniciar Sesión">
    </form>
  <?php endif; ?>
</body>
</html>
