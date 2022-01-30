async function renderPlantillaListado(listado){

    let plantillaHbs = await fetch('plantillas/inicio.hbs').then(r => r.text())
    var template = Handlebars.compile(plantillaHbs)
    let html = template({listado})
    document.getElementById('container-cards-card-all').innerHTML += html
}

function agregarCarrito(e, id, ref){
    e.preventDefault()

    let producto = productoController.productos.find( producto => producto.id == id) //Busca en el array productos alojado en el controlador, el elemento del backend que coincida con el id del producto seleccionado.
    carritoController.agregarAlCarrito(producto) //Agregamos al carrito el producto que retornamos el la linea anterior.
}

async function initInicio(){
    console.warn('initInicio()')

    var productos = await productoController.obtenerProductos()
    await renderPlantillaListado(productos)

}

