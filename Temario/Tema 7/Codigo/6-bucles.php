<?php
  // Bucle for
  for ($i = 0; $i < 5; $i++) {
    echo "El valor de i es: " . $i . "<br>";
  }

  // Bucle while
  $j = 0;
  while ($j < 5) {
    echo "El valor de j es: " . $j . "<br>";
    $j++;
  }

  // Bucle foreach
  $nombres = array("Ana", "Carlos", "Luis");
  foreach ($nombres as $nombre) {
    echo "Nombre: " . $nombre . "<br>";
  }
?>
