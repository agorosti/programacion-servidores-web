document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    let valid = true;

    // Validación de nombre
    if (name.value.trim() === "") {
      valid = false;
      name.classList.add("error");
      showError(name, "Por favor, coloque su nombre");
    } else {
      name.classList.remove("error");
      removeError(name);
    }

    // Validación de email
    if (!email.value.includes("@")) {
      // Corregido de "incluides" a "includes"
      valid = false;
      email.classList.add("error"); // Se corrigió "name.classList.add" por "email.classList.add"
      showError(email, "Debe ingresar un email válido");
    } else {
      email.classList.remove("error");
      removeError(email);
    }

    // Validación de contraseña
    if (password.value.length < 6) {
      // Se cambió de "email.value.length" a "password.value.length"
      valid = false;
      password.classList.add("error"); // Cambiado a password en lugar de name
      showError(password, "La contraseña debe tener al menos 6 caracteres");
    } else {
      password.classList.remove("error");
      removeError(password);
    }

    // Si todo es válido, permitir el envío del formulario
    if (valid) {
      alert("Formulario enviado con éxito");
      this.submit(); // Enviamos el formulario solo después del alert
    }
  });

function showError(input, message) {
  // Revisar si ya existe un mensaje de error para este input
  let errorMessage = input.nextElementSibling;

  // Si ya existe un mensaje de error, actualizamos el texto
  if (errorMessage && errorMessage.classList.contains("error-message")) {
    errorMessage.textContent = message;
  } else {
    // Si no existe, creamos el mensaje de error
    errorMessage = document.createElement("div");
    errorMessage.classList.add("error-message"); // Corregido "errpr-message" a "error-message"
    errorMessage.textContent = message;
    input.after(errorMessage);
  }
}

function removeError(input) {
  // Si existe un mensaje de error, lo eliminamos
  let errorMessage = input.nextElementSibling;
  if (errorMessage && errorMessage.classList.contains("error-message")) {
    errorMessage.remove();
  }
}
