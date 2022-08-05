/* .................definición de variables y armado de cartas producto........................*/

let contenedorProductos = document.getElementById('contenedor-productos')
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#contenedor-productos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
const addToCart = document.getElementsByClassName("add-to-cart");
const contadorCarrito = document.getElementById("contador-carrito");
let carritoIds = [];

const precioTotal = document.getElementById("precioTotal");
let precioTot = parseFloat(0);

const filtrarCategoriaBtn = document.getElementById('category_list');
let cat = "todos"

mostrarProductos(cat)
cargarEventListeners();


/* .............................Asociación de eventos........................................*/

function cargarEventListeners() {
    // Dispara cuando se presiona "Agregar al Carrito"
    for(let boton of addToCart){
        boton.addEventListener("click", datosProducto)
    }

    // Dispara cuando se presiona "Vaciar Carrito"
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // Dispara cuando se presiona alguna categoría
/*     filtrarCategoriaBtnVinos.addEventListener('click', cambiarCat(filtrarCategoriaBtnVinos)); */

} 

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("carritoIds")){
        carritoIds = JSON.parse(localStorage.getItem("carritoIds"))
        carritoIds.forEach( id => {
            let prod = buscarProductoPorId(id)
            let prodID = prod.id
            let prodName = prod.desc
            let prodPrice = prod.precio
            let prodImage = prod.img
            agregarCarrito(prodID,prodName,prodPrice,prodImage)
        })
    }
})

/* ..................................Funciones..............................................*/

/* Armar listado de productos en cartas */

function buscarProductoPorId(id){
    let prod = stockProductos.find(prod => prod.id == id)
    return prod
}


function mostrarProductos(cat){
    stockProductos.forEach(item =>{
        const div = document.createElement('div')
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
    carritoIds.push(prodID)
    localStorage.setItem("carritoIds", JSON.stringify(carritoIds));
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

    console.log(carritoIds)

    contenedorCarrito.appendChild(row);

    contadorCarrito.innerText = contenedorCarrito.childElementCount;
    
    /* Agrego la función de borrar al a "X" de cada registro */
    let botonesBorrar = row.querySelectorAll(".borrar-producto");
    for(let boton of botonesBorrar) {
        boton.addEventListener("click", (e) => eliminarProducto(e,prodID));
    }
}

/* Eliminar un elemento del carrito */

function eliminarProducto(e, prodID) {
    btn = e.target;
    console.log(prodID);
    btn.parentElement.parentElement.remove();
    contadorCarrito.innerText = contenedorCarrito.childElementCount;
    carritoIds = carritoIds.filter(id => id != prodID);
    localStorage.setItem("carritoIds", JSON.stringify(carritoIds));
    Toastify({
        text: "Haz eliminado un producto del carrito de compras",
        className: "info",
        style: {
            color: "white",
            background: "linear-gradient(to left, rgba(199, 28, 129) 0%, rgba(28, 199, 98) 100%)",
        }
    }).showToast();
}


/* Elimina todos los productos que se encuentren en el carrito */

function vaciarCarrito() {
    while(contenedorCarrito.firstChild) {
         contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
    contadorCarrito.innerText = contenedorCarrito.childElementCount;
    carritoIds = [];
    localStorage.setItem("carritoIds", JSON.stringify(carritoIds));
    Toastify({
        text: "Se ha eliminado el carrito de compras!",
        className: "info",
        style: {
            color: "white",
            background: "linear-gradient(to right, rgba(199, 28, 129) 0%, rgba(28, 199, 98) 100%)",
        }
    }).showToast();
}

/* ........................................................................................ */

/* .................................FILTROS DE CATEGORÍA................................... */


/* ........................................................................................ */