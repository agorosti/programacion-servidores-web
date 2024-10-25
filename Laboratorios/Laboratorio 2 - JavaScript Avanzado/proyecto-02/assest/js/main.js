document.getElementById("addTaskBtn").addEventListener("click", function () {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const taskList = document.getElementById("taskList");

    // Crear un nuevo elemento <li> para la tarea
    const newTask = document.createElement("li");

    // Crear un div para la parte de la tarea (texto + checkbox)
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    // Crear el checkbox para marcar la tarea como completada
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox"; // Corregido el tipo de input
    checkbox.addEventListener("change", function () {
      newTask.classList.toggle("completed");
    });

    // Crear el texto de la tarea
    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = taskText;

    // Añadir el checkbox y el texto a la parte de la tarea
    taskItem.appendChild(checkbox);
    taskItem.appendChild(taskTextElement);

    // Añadir la parte de la tarea al <li>
    newTask.appendChild(taskItem);

    // Crear el botón de eliminar
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
      taskList.removeChild(newTask);
    });

    // Añadir el botón eliminar al <li>
    newTask.appendChild(deleteBtn);

    // Añadir el <li> a la lista de tareas
    taskList.appendChild(newTask);

    // Limpiar el campo de texto
    taskInput.value = "";
  } else {
    alert("Por favor, escribe una tarea antes de añadirla.");
  }
});
