import { Carrito } from "./carrito.js";

//Inicializamos variables para la carga de datos en la tabla
let productosArray = [];
let moneda;
const carritoArray = new Carrito();

document.addEventListener('DOMContentLoaded', function(event){

    function cargarTabla (productosArray){
    
        const tablaProd = document.getElementById("tablaProductos");

        productosArray.forEach(producto =>{              
            //Inicializamos la variable cantidadInicial que usaremos para calcular totales
            let cantidadInicial = 0;

            //Creamos las celdas que contendrán información de los productos que sacamos del array
            const productoCelda = document.createElement('td');
            const divNombre = document.createElement('div');
            const divSKU = document.createElement('div');
            
            divNombre.innerText = producto.nombre;
            divNombre.classList.add('divNameStyle')
            divSKU.innerText = producto.SKU;
            divSKU.classList.add('divSKUstyle'); 
            productoCelda.append(divNombre, divSKU);

            const descripcionCelda = document.createElement('td');
            descripcionCelda.classList.add('descripcionCelda');
            descripcionCelda.innerText = producto.descripcion;

            //Creamos la caja del input donde podremos introducir manualmente las cantidades
            const cantidadCelda = document.createElement('td');
            const cantidadInput = document.createElement('input');

            //Establecemos los valores iniciales del input
            cantidadInput.type = "number";
            cantidadInput.min = 0;
            cantidadInput.max = 100;
            cantidadInput.value = cantidadInicial;
            cantidadInput.classList.add('cantidadProducto');

            //Actualizamos los cálculos del ticket y del subtotal a través de los cambios en el input
            cantidadInput.addEventListener('input', function (event){

                const max = parseInt(cantidadInput.max);
                const currentValue = parseInt(cantidadInput.value);
                
                //Validamos que se introduce un valor menor que el máximo permitido
                if (currentValue > max) {
                    cantidadInput.value = max;
                    alert(`La cantidad máxima permitida es ${max}.`);
            }
                cantidadInicial = cantidadInput.value;
                carritoArray.actualizarEnInput(producto, cantidadInicial);
                totalCelda.innerText= carritoArray.calcularTotalPorProducto(cantidadInicial,producto.precio).toFixed(2) + moneda;
                actualizarTablaTicket();
                actualizarTablaSubtotal();
            });

            //Creamos el botón que añadirá cantidad y productos al carrito
            const botonMas = document.createElement('button');
                botonMas.innerText = "+";
                botonMas.classList.add('botones')

                //Actualizamos cantidades por pulsación del botón y devolvemos los calculos al ticket y a la tabla
                botonMas.addEventListener('click', function(event){
                    if(cantidadInicial < 100){
                        cantidadInicial++;
                    cantidadInput.value=cantidadInicial;
                    totalCelda.innerText= carritoArray.calcularTotalPorProducto(cantidadInicial,producto.precio).toFixed(2) + moneda;
                    carritoArray.actualizarAlAnadir(producto);
                    }else{
                        alert('La cantidad máxima permitida es ' + cantidadInput.max);
                    }
                    actualizarTablaTicket();
                    actualizarTablaSubtotal();
            });

            //Creamos el botón que quitará cantidad o eliminará productos del carrito
            const botonMenos = document.createElement('button');
                botonMenos.innerText = "-";    
                botonMenos.classList.add('botones');

                //Actualizamos cantidades por pulsación del botón y devolvemos los calculos al ticket y a la tabla
                botonMenos.addEventListener('click', function(event){
                    if (cantidadInicial > 0){
                        cantidadInicial--;
                        cantidadInput.value=cantidadInicial;
                        totalCelda.innerText= carritoArray.calcularTotalPorProducto(producto.precio, cantidadInicial).toFixed(2)  + moneda;
                        carritoArray.actualizarAlQuitar(producto);
                        actualizarTablaTicket();
                        actualizarTablaSubtotal();
                    }
                    else    
                        alert("No puedes introducir cantidades negativas")
                    
            });

            //Añadimos a la tabla todos los elementos que nos faltan e iniciaalizamos el subtotal en 0€
            cantidadCelda.append(botonMas, cantidadInput, botonMenos);

            const precioCelda = document.createElement('td');
            precioCelda.innerText = producto.precio.toFixed(2) + moneda;

            const totalCelda = document.createElement('td')
            const inicioCelda = 0;
            const productoFila = document.createElement('tr');
            totalCelda.innerText = inicioCelda.toFixed(2) + moneda;
            productoFila.append(productoCelda,descripcionCelda, cantidadCelda, precioCelda, totalCelda);
            tablaProd.append(productoFila);

            actualizarTablaSubtotal();
        });
        
    };


    //Funciones que actulizan el ticket y el subtotal. Creamos las funciones para no repetir código y que quede más simplificado
    function actualizarTablaTicket(){
        const tablaTicket = document.getElementById("ticketCompra");
        tablaTicket.innerHTML = "";

            carritoArray.obtenerCarrito().forEach(articulo => {
                const filaTicket = document.createElement('tr');
                const nombreCelda = document.createElement('td');
                nombreCelda.innerText = articulo.nombre;

                const cantidadCelda = document.createElement('td');
                cantidadCelda.innerText = "x" + articulo.cantidad;

                const totalCelda = document.createElement('td');
                totalCelda.innerText = carritoArray.calcularTotalPorProducto(articulo.precio, articulo.cantidad).toFixed(2) + moneda;

                filaTicket.append(nombreCelda, cantidadCelda, totalCelda);
                tablaTicket.appendChild(filaTicket);
            });     
    }

    function actualizarTablaSubtotal(){
        const tablaSubtotal = document.getElementById('tablaSubtotal');
        tablaSubtotal.innerHTML = "";

        const subtotalFila = document.createElement('tr');
        const subtotalCelda = document.createElement('td');
        subtotalCelda.innerText = carritoArray.actualizarSubtotal() + moneda; 
        subtotalFila.append(subtotalCelda);
        tablaSubtotal.append(subtotalFila);
    }


    //Fetch que recoge los datos de la api
    fetch('https://jsonblob.com/api/1297870955043741696')
        .then (response => response.json())
            .then (productos =>{
                moneda = productos.currency;
                productosArray = productos.productos;
                cargarTabla(productosArray); 
            })
});
