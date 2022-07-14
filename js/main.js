/* DESAFÍO COMPLEMENTARIO : Desafío: Incorporar Arrays */

let productos = [{id:"1",producto:"Vino Tinto Malbec Cafayate"}, {id:"2",producto:"Vino Tinto Malbec Luigi Bosca"}, {id:"3",producto:"Vino Tinto Malbec Trumpeter"}, 
{id:"4",producto:"Vino Tinto Malbec Rutini"}, {id:"5",producto:"Vino Tinto Malbec Saint Felicien"}, {id:"6",producto:"Vino Tinto Cabernet Suavignon Cafayate"}, 
{id:"7",producto:"Vino Tinto Cabernet Suavignon Luigi Bosca"}, {id:"8",producto:"Vino Tinto Cabernet Suavignon Trumpeter"}, {id:"9",producto:"Vino Tinto Cabernet Suavignon Rutini"}, 
{id:"10",producto:"Vino Tinto Cabernet Suavignon Saint Felicien"}, {id:"11",producto:"Gin Bombay Sapphire"}, {id:"12",producto:"Gin Beefeater"}, {id:"13",producto:"Gin Gordons"}, 
{id:"14",producto:"Gin Heraclito"}, {id:"15",producto:"Licor Baileys"}, {id:"16",producto:"Vodka Absolut"}, {id:"17",producto:"Vodka Smirnoff"}, {id:"18",producto:"Vodka Sky"}, 
{id:"19",producto:"Fernet"}, {id:"20",producto:"Campari"}, {id:"21",producto:"Cynar"}, {id:"22",producto:"Gancia"}, {id:"23",producto:"Cinzano"}, {id:"24",producto:"Cerveza Schneider"}, 
{id:"25",producto:"Cerveza Corona"}, {id:"26",producto:"Cerveza Miller"}, {id:"27",producto:"Cerveza Patagonia"}]

class Productos{
    constructor (id, producto){
        this.id = id;
        this.producto = producto
    }
}

let listaProductos =  []

const agregarProd = () => {

    let id = prompt("Ingrese el ID del producto que desea agregar al carrito:");
    function filtro(elemento){
        return elemento.id == id;
    }
    let elemento = productos.find(filtro);
    if (elemento != undefined){
        let prod = new Productos(elemento.id, elemento.producto);
        listaProductos.push(prod);
    } else {
        alert("Error en el código ingresado, actualice e intente nuevamente.")
    }

    listaProductos.forEach(element => console.log(element));
}