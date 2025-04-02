
// Funcion que llama al localstorage
cargarlocalstorage()
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


document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector(".floating-icon"); 
  const modal = document.getElementById("myModal");
  const closeBtn = document.getElementsByClassName("close")[0];

  formulario.addEventListener("click", () => modal.classList.add("show"));

  if (closeBtn) { // Verifica si closeBtn no es null
    closeBtn.addEventListener("click", () => modal.classList.remove("show"));

  }
});



const contenedorCarrito = document.querySelector("#lista-carrito tbody")
const listaProductos = document.querySelector(".catalogo")
const vaciar = document.querySelector("#vaciar-carrito")
const carrito = document.querySelector("#carrito")
let arregloCarrito = []

// Muestra u oculta el carrito al hacer clic en el icono

cargaEventlistener()

function cargaEventlistener(){
  listaProductos.addEventListener("click",agregarcurso)
  carrito.addEventListener("click", eliminarProducto)
  vaciar.addEventListener("click",vaciarProducto)


}

// Funcion que al darle a la X elimina el producto

function eliminarProducto(e){
  e.preventDefault()
  // Llamamos a la funcion vaciar producto para que el total sea igual a cero


 
 

  if (e.target.classList.contains("borrar-curso")) {
    const dataId = e.target.getAttribute("data-id")

    
    // Buscar el curso en el carrito
    const prod = arregloCarrito.find(producto => producto.id === dataId);
    if (prod) {
        if (prod.cantidad > 1) {
            // Si la cantidad es mayor a 1, reducir en 1
            prod.cantidad--;
        } else if (prod.cantidad == 1){
            // Si la cantidad es 1, eliminarlo del carrito
            arregloCarrito = arregloCarrito.filter(producto => producto.id !== dataId  );
            precioTotalCero();
           
        }
    }

    // Actualizar el HTML del carrito
    escribirDatos();
  
}



  
}
function precioTotalCero(){

  const totalElemento = document.querySelector("#total-carrito");
  totalElemento.textContent = `Total: $0`;
 
}

function vaciarProducto(){
  arregloCarrito = []
  limpiarHtml()
  precioTotalCero()
  localStorage.clear()

}


// Function que agrega los cursos
function agregarcurso(e){
  e.preventDefault()
  if(e.target.classList.contains("comprar")){
    let ProductosSelctionado = e.target.parentElement.parentElement;
    // console.log(ProductosSelctionado) 
    leerProductos(ProductosSelctionado);
  }

}

function leerProductos(ProductosSelctionado){

  let infoProducto ={
    imageProducto : ProductosSelctionado.querySelector("img").src,
    nombre : ProductosSelctionado.querySelector("figcaption").textContent,
    precio: ProductosSelctionado.querySelector(".Precio").textContent,
    id: ProductosSelctionado.querySelector("button").getAttribute("data-id"),
    cantidad: 1


  }


  if(arregloCarrito.some(ProductosSelctionado => ProductosSelctionado.nombre === infoProducto.nombre)){
    const productos = arregloCarrito.map(producto =>{
      if(producto.nombre === infoProducto.nombre){
        producto.cantidad++;
        return producto
      }else{
        return producto
      }

    })
    arregloCarrito = [...productos]
    
  }else{
    
    arregloCarrito = [...arregloCarrito, infoProducto];
  }
 
  escribirDatos();

}

function escribirDatos(){
  limpiarHtml()
    let total = 0;
    arregloCarrito.forEach(producto => {
    const row = document.createElement("tr")


    const Precio = parseFloat(producto.precio.replace("$",""))
    total = total + Precio * producto.cantidad;

    // Muestra en el dom el total
    const totalElemento = document.querySelector("#total-carrito");
    totalElemento.textContent = ` Total: $${total.toFixed(2)}`;
   

    row.innerHTML =
    `

    <img src="${producto.imageProducto}" width="80px">
    <td style="text-align:center">${producto.nombre}</td>
    <td style="text-align:center">${producto.precio}</td>
    <td style="text-align:center">${producto.cantidad}</td>
    <td style="color:red"> <a href="#" class="borrar-curso" data-id="${producto.id}">X</td>

    `
    contenedorCarrito.appendChild(row)
    localStorage.setItem("Producto", JSON.stringify(arregloCarrito));
  });
 
}

// Eliminar los cursos del tbdoy

function limpiarHtml(){
  contenedorCarrito.innerHTML =""
}

// Agregando local storage


// Cargar el localstorage

function cargarlocalstorage(){document.addEventListener("DOMContentLoaded",()=> {

  const datosGuardados =localStorage.getItem("Producto");
  if(datosGuardados){
    arregloCarrito = JSON.parse(datosGuardados);
    escribirDatos()
  }

})

}
