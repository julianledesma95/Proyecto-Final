/* .................definición de variables y armado de cartas producto........................*/

let contenedorProductos = document.getElementById('contenedor-productos')
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#contenedor-productos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
const addToCart = document.getElementsByClassName("add-to-cart");
const filtrarCategoriaBtn = document.getElementById('category_list');
console.log(filtrarCategoriaBtn);
let cat = "todos"
console.log(cat);

mostrarProductos(cat)

/* .............................Asociación de eventos........................................*/

cargarEventListeners();

function cargarEventListeners() {
    // Dispara cuando se presiona "Agregar al Carrito"
    for(let boton of addToCart){
        boton.addEventListener("click", datosProducto)
    }

    // Dispara cuando se elimina un único producto del carrito, dando click en la "X"
    carrito.addEventListener('click', eliminarProducto);

    // Dispara cuando se presiona "Vaciar Carrito"
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // Dispara cuando se presiona alguna categoría
/*     filtrarCategoriaBtnVinos.addEventListener('click', cambiarCat(filtrarCategoriaBtnVinos)); */

} 

/* ....................................FIN................................................. */

/* ..................................Funciones..............................................*/

/* Armar listado de productos en cartas */

function mostrarProductos(cat){
    stockProductos.forEach(item =>{
        let div = document.createElement('div')
        div.className = 'producto'
        div.innerHTML = `<div class="card" id="${item.id}">
                            <img src="${item.img}" class="card-img-top" alt="producto1">
                            <div class="card-body">
                                <h5 class="card-title">${item.producto}</h5>
                                <p class="card-desc">${item.desc}</p>
                                <p class="product-price">$${item.precio}</p>
                                <a href="#" class="add-to-cart">Agregar al Carrito</a>
                            </div>
                        </div>
                        `
        contenedorProductos.appendChild(div)
    })
}

/* Recopilar datos de los productos en contenedor */

function datosProducto(e){
    let boton = e.target;
    let producto = boton.parentElement.parentElement;
    let prodID = producto.getAttribute("id");
    let prodName = producto.querySelector(".card-desc").innerText;
    let prodPrice = producto.querySelector(".product-price").innerText;
    let prodImage = producto.querySelector(".card-img-top").src;
    agregarCarrito(prodID,prodName,prodPrice,prodImage);
}

/* Agregar elementos al Carrito */

function agregarCarrito(prodID,prodName,prodPrice,prodImage){
    const row = document.createElement('tr');
    row.innerHTML = `
         <td>  
              <img src="${prodImage}" width=100>
         </td>
         <td>${prodName}</td>
         <td>${prodPrice}</td>
         <td>${1} </td>
         <td>
              <a href="#" class="borrar-producto" data-id="${prodID}">X</a>
         </td>
    `;
    contenedorCarrito.appendChild(row);
    let botonesBorrar = row.querySelectorAll(".borrar-producto");
    for(let boton of botonesBorrar) {
        boton.addEventListener("click", eliminarProducto);
    }
/*     cantElementosCarrito(); */
}

/* Eliminar un elemento del carrito */

function eliminarProducto(e) {
    btn = e.target;
    btn.parentElement.parentElement.remove();
    cantElementosCarrito()
}

/*  Mostrar cantidad de elementos sumados al carrito */
/* function cantElementosCarrito() {
    let cantidad = document.querySelectorAll(".lista-carrito tbody > div");
    let cartQuantity = document.querySelector(".cart-quantity");
    cartQuantity.innerText = cantidad.length;
} */

/* Elimina todos los productos que se encuentren en el carrito */

function vaciarCarrito() {
    while(contenedorCarrito.firstChild) {
         contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}

/* ........................................................................................ */

/* .................................FILTROS DE CATEGORÍA................................... */


/* ........................................................................................ */