let tableContainer = document.querySelector(".tables"); // Selecciona el contenedor de la tabla
let result = 0;

// Bucle para generar las tablas del 1 al 10
for (let i = 1; i <= 10; i++) {
  // Plantilla para mostrar encabezado y crear caja para las operaciones de la tabla
  tableContainer.innerHTML += `
    <div class="tables__item">
      <h2 class="tables__titulo">Tabla del ${i}</h2>
      <ul class="tables__list tables__list--${i}"></ul>
    </div>
  `;

  // Bucle para generar los números de la tabla
  for (let n = 1; n <= 10; n++) {
    // Calcular el resultado de la operación
    result = i * n; // Cambié + por *

    // Sacar la lista donde mostrar la operación
    let list = document.querySelector(".tables__list--" + i);

    // Agregar operación a la lista
    list.innerHTML += `<li class='list__item'>${i} x ${n} = ${result}</li>`;
  }
}
