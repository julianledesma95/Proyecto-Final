const contenedorCarrito = document.querySelector('#lista-compra tbody');
const carrito = document.querySelector('#resumen');
const precioTotal = document.getElementById("precioTotal");


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

function buscarProductoPorId(id) {
    let prod = stockProductos.find(prod => prod.id == id)
    return prod
}

function agregarCarrito(prodID, prodName, prodPrice, prodImage) {

    const row = document.createElement('tr');

    row.innerHTML = `
         <td>  
              <img src="${prodImage}" width=100>
         </td>
         <h6 class="itemTitulo" >${prodName}</h6>
         <td>${prodPrice}</td>
         <h6 class="itemCantidad" type="number" value="1">${1}</h6>
    `;
    
    contenedorCarrito.appendChild(row);

    calcularTotal(carritoIds)
}

function calcularTotal(carrito) {
    precioTot = 0;
    carrito.forEach(id => {
        let prod = buscarProductoPorId(id);
        let prodPrice = prod.precio;
        precioTot += prodPrice;
    })
    precioTotal.innerHTML = precioTot;
}

function miAlerta() {
    window.alert("Muchas gracias por su compra, le enviaremos un correo con las instrucciones para finalizar el proceso")
}