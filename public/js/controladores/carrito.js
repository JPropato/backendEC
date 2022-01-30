//INTERACTUA ENTRE LA VISTA Y EL MODELO. USAN LOS SERVICIOS.

class CarritoController extends CarritoModel {
    
    constructor(){
        super()
        try {
            this.carrito = JSON.parse(localStorage.getItem('carrito')) || [] //Intento leer si hay carrito en storage.
        }
        catch {
            this.carrito = []
            localStorage.setItem('carrito', this.carrito) //En caso de error en try, carrito vacio.
        }
    }

    elProductoEstaEnElCarrito(producto){
        return this.carrito.filter(prod => prod.id == producto.id).length
    }

    obtenerProductoDeCarrito(producto){
        return this.carrito.find(prod => prod.id == producto.id)
    }

    agregarAlCarrito(producto){
        if(!this.elProductoEstaEnElCarrito(producto)){ //Si no esta en el carrito
            producto.cantidad = 1 //Creamos propiedad cantidad.
            this.carrito.push(producto)
        }
        else{
            let productoDeCarrito = this.obtenerProductoDeCarrito(producto)
            productoDeCarrito.cantidad++
        }

        localStorage.setItem('carrito', JSON.stringify(this.carrito)) //Exista o no, el carrito lo envio al localStorage.
    }

    async borrarProductoCarrito(id){
        let index = this.carrito.findIndex(producto => producto.id == id) //Metodo de array para encontrar posicion en el array de un producto que coincida con el ID solicitado.
        this.carrito.splice(index,1) //Lo eliminamos del carrito LOCAL.
        localStorage.setItem('carrito', JSON.stringify(this.carrito)) //Actualizamos localStorage.
    
        await renderTablaCarrito(this.carrito) //Vuelvo a renderizar el carrito actualizado.
    }

    async enviarCarrito(){
        var elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]

        elemSectionCarrito.innerHTML = '<h2>Enviando Carrito</h2>'
        const preference = await carritoService.guardarCarritoService(this.carrito) //Enviamos carrito a la nube.
        this.carrito = [] //vaciamos el carrito
        localStorage.setItem('carrito', this.carrito)

        elemSectionCarrito.inner = '<h2>Enviando Carrito.... <b>OK</b></h2>'

        setTimeout( async ()=>{
            elemSectionCarrito.classList.remove('section-carrito--visible')
            mostrarCarrito = false

            console.log(preference)
            await renderPago(preference)

        },0)
    }

}

const carritoController = new CarritoController()

