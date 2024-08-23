function mostrarCategoria(categoria) {
  var productos = document.querySelectorAll('.producto');
  productos.forEach(function (producto) {
    if (categoria === 'todos') {
      producto.style.display = 'block';
    } else {
      if (producto.classList.contains(categoria)) {
        producto.style.display = 'block';
      } else {
        producto.style.display = 'none';
      }
    }
  });
}

window.onload = function () {
  mostrarCategoria('todos');
};

function irAlFormulario() {
  var modal = document.getElementById('myModal');
  modal.style.display = 'block';
}

// Obtén el modal
var modal = document.getElementById("myModal");

// Obtén el elemento <span> que cierra el modal
var span = document.getElementsByClassName("close")[0];

// Cuando el usuario haga clic en <span> (x), cierra el modal
span.onclick = function() {
  modal.style.display = "none";
}

// Cuando el usuario haga clic en cualquier lugar fuera del modal, cierra el modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
