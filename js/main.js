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
let precioTot = 0;
const filtrarCategoriaBtnTodos = document.getElementById("category_item_todos");
const filtrarCategoriaBtnVinos = document.getElementById("category_item_vinos");
const filtrarCategoriaBtnEspirituosas = document.getElementById("category_item_espirituosas");
const filtrarCategoriaBtnAperitivos = document.getElementById("category_item_aperitivos");
const filtrarCategoriaBtnCervezas = document.getElementById("category_item_cervezas");
let cat = "TODOS";

cargarDom(cat);
cargarEventListeners();

/* .............................Asociación de eventos........................................*/

function cargarEventListeners() {
    // Dispara cuando se presiona "Agregar al Carrito"
    for (let boton of addToCart) {
        boton.addEventListener("click", datosProducto)
    }

    // Dispara cuando se presiona "Vaciar Carrito"
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("carritoIds")) {
        carritoIds = JSON.parse(localStorage.getItem("carritoIds"))
        carritoIds.forEach(id => {
            let prod = buscarProductoPorId(id)
            let prodID = prod.id
            let prodName = prod.desc
            let prodPrice = prod.precio
            let prodImage = prod.img
            agregarCarrito(prodID, prodName, prodPrice, prodImage)
        })
    }
})

/* ..................................Funciones..............................................*/

function cargarDom(category) {
    const datosStock = async () => {
        while (contenedorProductos.firstChild) {
            contenedorProductos.removeChild(contenedorProductos.firstChild);
        }
        let response = await fetch("js/stock.json")
        let datosProductos = await response.json()
        if (category === "TODOS") {
            datosProductos.forEach(item => {
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
                cargarEventListeners();
            })
        } else {
            datosProductosFiltrado = datosProductos.filter(element => element.clase === category)
            datosProductosFiltrado.forEach(item => {
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
                cargarEventListeners();
            })
        }
    }
    datosStock();
}

function buscarProductoPorId(id) {
    let prod = stockProductos.find(prod => prod.id == id)
    return prod
}

/* Actualización de Categoría para el filtro */

function cambiarCat(elemento) {
    let cat = elemento.innerText;
    cargarDom(cat);
    return cat
}
/* Recopilar datos de los productos en contenedor */

function datosProducto(e) {
    let boton = e.target;
    let producto = boton.parentElement.parentElement;
    let prodID = producto.getAttribute("id");
    let prodName = producto.querySelector(".card-desc").innerText;
    let prodPrice = producto.querySelector(".product-price").innerText;
    let prodImage = producto.querySelector(".card-img-top").src;
    carritoIds.push(prodID)
    localStorage.setItem("carritoIds", JSON.stringify(carritoIds));
    agregarCarrito(prodID, prodName, prodPrice, prodImage);
}

/* Agregar elementos al Carrito */

function agregarCarrito(prodID, prodName, prodPrice, prodImage) {

    const row = document.createElement('tr');

    const elementosArrayTittle = contenedorCarrito.getElementsByClassName("itemTitulo");

    for(let i = 0; i < elementosArrayTittle.length; i++){
        if (elementosArrayTittle[i].innerText === prodName){
            let elementoCantidad = elementosArrayTittle[i].parentElement.getElementsByClassName("itemCantidad")[0];
            elementoCantidad.innerText = Number(elementoCantidad.innerText) + 1;
            calcularTotal(carritoIds)
            return
        }
    }

    row.innerHTML = `
         <td>  
              <img src="${prodImage}" width=100>
         </td>
         <h6 class="itemTitulo" >${prodName}</h6>
         <td>${prodPrice}</td>
         <h6 class="itemCantidad" type="number" value="1">${1}</h6>
         <td>
              <a href="#" class="borrar-producto" data-id="${prodID}">X</a>
         </td>
    `;
    
    contenedorCarrito.appendChild(row);

    contadorCarrito.innerText = contenedorCarrito.childElementCount;

    /* Agrego la función de borrar al a "X" de cada registro */
    let botonesBorrar = row.querySelectorAll(".borrar-producto");
    for (let boton of botonesBorrar) {
        boton.addEventListener("click", (e) => eliminarProducto(e, prodID));
    }

    calcularTotal(carritoIds)
}

/* Eliminar un elemento del carrito */

function eliminarProducto(e, prodID) {
    btn = e.target;
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
    calcularTotal(carritoIds)
}


/* Elimina todos los productos que se encuentren en el carrito */

function vaciarCarrito() {
    while (contenedorCarrito.firstChild) {
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
    precioTot = 0;
    precioTotal.innerHTML = precioTot;
}

/* Sumar los precios del producto */

function calcularTotal(carrito) {
    precioTot = 0;
    carrito.forEach(id => {
        let prod = buscarProductoPorId(id);
        let prodPrice = prod.precio;
        precioTot += prodPrice;
    })
    precioTotal.innerHTML = precioTot;
}

/* ........................................................................................ */

/* .................................FILTROS DE CATEGORÍA................................... */


/* ........................................................................................ */