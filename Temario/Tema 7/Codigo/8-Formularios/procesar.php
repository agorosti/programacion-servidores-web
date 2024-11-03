<?php
  // Verificar si el formulario fue enviado
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recibir los datos del formulario
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];

    // Mostrar los datos recibidos
    echo "Nombre: " . htmlspecialchars($nombre) . "<br>";
    echo "Email: " . htmlspecialchars($email) . "<br>";
  }
?>