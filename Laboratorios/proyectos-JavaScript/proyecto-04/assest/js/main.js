document.getElementById("loadUsersBtn").addEventListener("click", function () {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
      const userList = document.getElementById("userList");
      userList.innerHTML = ""; // Limpiar la lista antes de agregar nuevos usuarios

      users.forEach((user) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${user.name}</strong> <button onclick="showUserDetails(${user.id})">Ver Detalles</button>`;
        userList.appendChild(listItem);
      });

      // Mostrar la lista después de cargar los usuarios
      userList.style.display = "block";

      // Mostrar el botón para minimizar la lista
      document.getElementById("toggleListBtn").style.display = "inline-block";
    })
    .catch((error) => console.error("Error:", error));
});

// Función para mostrar detalles del usuario
function showUserDetails(userId) {
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then((response) => response.json())
    .then((user) => {
      alert(
        `Nombre: ${user.name}\nEmail: ${user.email}\nTeléfono: ${user.phone}`
      );
    })
    .catch((error) => console.error("Error:", error));
}

// Función para minimizar la lista
document.getElementById("toggleListBtn").addEventListener("click", function () {
  const userList = document.getElementById("userList");
  if (userList.style.display === "none" || userList.style.display === "") {
    userList.style.display = "block"; // Mostrar la lista
    this.textContent = "Minimizar Lista"; // Cambiar el texto a "Minimizar Lista"
  } else {
    userList.style.display = "none"; // Ocultar la lista
    this.style.display = "none"; // Ocultar el botón de minimizar
    document.getElementById("loadUsersBtn").style.display = "inline-block"; // Mostrar el botón para cargar usuarios
  }
});
