let mostrarCarrito = false

async function renderTablaCarrito(carrito){
    var elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]

    let plantillaHbs = await fetch('plantillas/carrito.hbs').then(r => r.text())
    var template = Handlebars.compile(plantillaHbs)
    let html = template({ carrito })
    elemSectionCarrito.innerHTML = html
    elemSectionCarrito.classList.add('section-carrito--visible')
}

function initCarrito(){
    var btnCarrito = document.getElementsByClassName('search-bar__carrito-container')[0]
    var elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]

    btnCarrito.addEventListener('click', async function (){
        mostrarCarrito = !mostrarCarrito
        if(mostrarCarrito){
            await renderTablaCarrito(carritoController.carrito) //Va a buscar el contenido de carrito si lo hay.
        }
        else{
            elemSectionCarrito.classList.remove('section-carrito--visible')
        }
    })
}

initCarrito()








/* //----------------------------------------------------------------------------------------
function initCarrito (){
    console.warn('initCarrito()')

    var btnCarrito = document.getElementsByClassName('search-bar__carrito-container')[0]
    btnCarrito.addEventListener('click', function () {
        elemSectionCarrito.classList.toggle('section-carrito--visible')
    })
}

initCarrito () */