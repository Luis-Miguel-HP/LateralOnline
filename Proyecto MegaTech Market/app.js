// Función para mostrar productos según la categoría seleccionada
function mostrarCategoria(categoria) {
  const productos = document.querySelectorAll('.producto');
  
  productos.forEach(producto => {
    if (categoria === 'todos') {
      producto.style.display = 'block';
    } else {
      producto.style.display = producto.classList.contains(categoria) ? 'block' : 'none';
    }
  });
}

// Inicializa la página mostrando todos los productos
window.onload = () => mostrarCategoria('todos');

// Función para abrir el modal
function irAlFormulario() {
  const modal = document.getElementById('myModal');
  modal.classList.add('show'); // Añade una clase para mostrar el modal
}

// Obtén el modal y el elemento <span> que cierra el modal
const modal = document.getElementById("myModal");
const closeBtn = document.getElementsByClassName("close")[0];

// Función para cerrar el modal
const closeModal = () => modal.classList.remove('show');

// Añade eventos para cerrar el modal
closeBtn.onclick = closeModal;
window.onclick = (event) => {
  if (event.target === modal) {
    closeModal();
  }
};
