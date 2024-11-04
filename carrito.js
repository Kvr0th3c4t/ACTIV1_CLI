export class Carrito {
    articulos = [];

    constructor() {
        this.articulos = [];
    }

/*Recibimos un producto y una cantidad. Comprobamos que el articulo existe en el carrito y que su cantidad es mayor que 0.

    Si se cumplen las dos condiciones el artículo recibe la cantidad que se pasa por el input. 

    Si el artículo existe en el carrito pero su cantidad es menor que 0, eliminamos el artículo del carrito. 

    Si el artículo no existe en el carrito, establecemos la cantidad que pasamos por input como su cantidad inicial.*/
    actualizarEnInput(producto, cantidad) {
        const existeArticulo = this.articulos.find(item => item.SKU === producto.SKU);
        if (existeArticulo) {
            if (cantidad > 0) {
                existeArticulo.cantidad = cantidad;
            } else {
                
                this.articulos = this.articulos.filter(item => item.SKU !== producto.SKU);
            }
        } else if (cantidad > 0) {
            
            this.articulos.push({
                SKU: producto.SKU,
                nombre: producto.nombre,
                precio: producto.precio,
                descripcion: producto.descripcion,
                cantidad: cantidad
            });
        }
    }

/*Recibimos un producto.

    Si el producto existe en el carrito, añadimos +1 a su cantidad.
    
    Si no existe, creamos un producto cuya cantidad inicial sea 1.*/ 
    actualizarAlAnadir(producto) {
        const existeArticulo = this.articulos.find(item => item.SKU === producto.SKU);
        if (existeArticulo) {
            existeArticulo.cantidad++;
        } else {
            const articuloEnCarrito = {
                SKU: producto.SKU,
                nombre: producto.nombre,
                precio: producto.precio,
                descripcion: producto.descripcion,
                cantidad: 1 
            };
            this.articulos.push(articuloEnCarrito);
        }
    }

/*Recibimos un producto.

    Si el producto existe en el carrito, y su atributo cantidad es mayor que 1, restamos 1 a cantidad.
    
    Si su cantidad es menor que 1, eliminamos el artículo del carrito.*/ 
    actualizarAlQuitar(producto) {
        const existeArticulo = this.articulos.find(item => item.SKU === producto.SKU);
        if (existeArticulo) {
            if (existeArticulo.cantidad > 1) {
                existeArticulo.cantidad--;
            } else {
                this.articulos = this.articulos.filter(item => item.SKU !== producto.SKU);
            }
        }
    }
//Devolvemos el contenido del carrito
    obtenerCarrito(){
        let arrayArticulos = this.articulos;
        return arrayArticulos;
    };

//Calculamos el subtotal del ticket
    subtotalTicket(){
        let sum = 0;
        sum = this.articulos.reduce((total, articulo)=> total + articulo.precio * articulo.cantidad, 0);
        return sum;
    };

//Devolvemos el subtotal con el formato deseado
    actualizarSubtotal(){
        const resultado = this.subtotalTicket();
        return resultado.toFixed(2);
    };

//Calculamos el total de un producto
    calcularTotalPorProducto(cantidad, precioProducto){
        let totalProducto = 0;
        totalProducto = cantidad * precioProducto;
        return totalProducto;
    };

};
