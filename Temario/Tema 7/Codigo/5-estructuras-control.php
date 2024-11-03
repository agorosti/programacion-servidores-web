<?php
  // Estructura de control: if, else, elseif
  $edad = 20;

  if ($edad < 18) {
    echo "Eres menor de edad";
  } elseif ($edad >= 18 && $edad < 65) {
    echo "Eres adulto";
  } else {
    echo "Eres adulto mayor";
  }
?>
