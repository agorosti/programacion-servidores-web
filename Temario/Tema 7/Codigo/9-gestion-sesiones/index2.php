<?php
  session_start();
  // Simular inicio de sesión con un nombre de usuario y contraseña
  if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['login'])) {
    // Datos de inicio de sesión simulados
    $usuario = "admin";
    $password = "1234";

    // Verificar si las credenciales son correctas
    if ($_POST['nombre'] == $usuario && $_POST['password'] == $password) {
      $_SESSION['usuario'] = $usuario;
      $_SESSION['autenticado'] = true;
    } else {
      echo "<p>Credenciales incorrectas.</p>";
    }
  }
  // Cerrar sesión y destruir la sesión
  if (isset($_POST['logout'])) {
    session_unset(); // Eliminar todas las variables de sesión
    session_destroy(); // Destruir la sesión
    header("Location: " . $_SERVER['PHP_SELF']); // Recargar la página
    exit();
  }
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sistema de Autenticación</title>
</head>
<body>
  <h1>Sistema Básico de Autenticación</h1>
  <?php if (isset($_SESSION['autenticado']) && $_SESSION['autenticado']): ?>
    <p>Bienvenido, <?php echo htmlspecialchars($_SESSION['usuario']); ?>.</p>

    <!-- Botón para cerrar sesión -->
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

      <input type="submit" name="login" value="Iniciar Sesión">
    </form>
  <?php endif; ?>
</body>
</html>
