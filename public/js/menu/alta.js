class FormularioAlta{
    inputsAlta = null
    formAlta = null
    submitAlta = null
    camposValidos = [false,false,false,false,false,false,false]
    regExpValidar = [
        /^.+$/,             /*regexp nombre*/
        /^.+$/,             /*regexp precio*/
        /^[0-9]+$/,         /*regexp stock*/
        /^.+$/,             /*regexp marca*/
        /^.+$/,             /*regexp categoria*/
        /^.+$/,             /*regexp origen*/
        /^.+$/,             /*regexp foto*/
    ]


        /* --------------- drag and drop ------------------- */
        imagenSubida = ''
        dropArea = null
        progressBar = null
        /* ------------------------------------------------- */

    constructor(renderTablaAlta, guardarProducto){
        this.inputsAlta = document.querySelectorAll('.input-alta')
        this.formAlta = document.querySelector('.form__alta')
        this.submitAlta = document.querySelector('.form__alta button')

        this.submitAlta.disabled = true

        this.inputsAlta.forEach((input,index) => {
            if(input.type != 'checkbox'){
                input.addEventListener('input', () => {
                    this.validar(input.value, this.regExpValidar[index], index)
                    if(renderTablaAlta) renderTablaAlta( !this.algunCampoNoValido(), productoController.productos)
                })
            }
        })

        this.formAlta.addEventListener('submit', e =>{
            e.preventDefault()

            let producto = this.leerProductoIngresado()
            this.limpiarFormulario()

            if(guardarProducto) guardarProducto(producto) //IF (esta declarado guardarProducto cuando se hizo el NEW = productoController.guardarProcuto(producto))
        })
    

    /* --------------- drag and drop ------------------- */
    this.dropArea = document.getElementById('drop-area')
    this.progressBar = document.getElementById('progress-bar')

    //Para cancelar el evento automática de drag and drop
    ;['dragenter','dragover','dragleave','drop'].forEach( eventName => {
        this.dropArea.addEventListener(eventName, e => e.preventDefault())
        document.body.addEventListener(eventName, e => e.preventDefault())
    })

    //Para remarcar la zona de drop al arrastrar una imagen dentro de ella
    ;['dragenter','dragover'].forEach( eventName => {
        this.dropArea.addEventListener(eventName, () => {
            this.dropArea.classList.add('highlight')
        })
    })

    //Para desmarcar la zona de drop al abandonar la zona de drop
    ;['dragleave','drop'].forEach( eventName => {
        this.dropArea.addEventListener(eventName, () => {
            this.dropArea.classList.remove('highlight')
        })
    })

    this.dropArea.addEventListener('drop', e => {
        var dt = e.dataTransfer
        var files = dt.files

        this.handleFiles(files)
    })
}
    /* ------------------------------------------------- */

    /*Mensaje de validación a insertar en div debajo de input*/
    setCustomValidityJS = function(mensaje, index){
        let divs = document.querySelectorAll('.container-alta div')
        divs[index].innerHTML = mensaje
        divs[index].style.display = mensaje? 'block' : 'none'
    }

    algunCampoNoValido(){
        let valido = 
            this.camposValidos[0] && 
            this.camposValidos[1] && 
            this.camposValidos[2] && 
            this.camposValidos[3] && 
            this.camposValidos[4] && 
            this.camposValidos[5] 
        return !valido
    }

    validar (valor, validador, index) {
        
        if(!validador.test(valor)) {
            this.setCustomValidityJS('Este campo es requerido', index)
            this.camposValidos[index] = false
            this.submitAlta.disabled = true
            return null
        }

        this.camposValidos[index] = true
        this.submitAlta.disabled = this.algunCampoNoValido() //Analiza si hay algun campo no valido, para retornar true o false al disabled del boton submit

        this.setCustomValidityJS('', index)
        return valor
    }

    leerProductoIngresado() {
        return {
            nombre: this.inputsAlta[0].value,
            precio: this.inputsAlta[1].value,
            stock: this.inputsAlta[2].value,
            marca: this.inputsAlta[3].value,
            categoria: this.inputsAlta[4].value,
            origen: this.inputsAlta[5].value,
            foto: this.imagenSubida? `/uploads/${this.imagenSubida}` : '',
        }
    }

    limpiarFormulario(){
        this.inputsAlta.forEach(input => {
            if(input.type != 'checkbox') input.value = ''
            else if(input.type == 'checkbox') input.checked = false
        })

        this.submitAlta.disabled = true
        this.camposValidos = [false,false,false,false,false,false]

        let img = document.querySelector('#gallery img')
        img.src = ''

        this.initializeProgress()
        this.imagenSubida = ''
    }

    /* --------------- drag and drop ------------------- */
    initializeProgress() {
        this.progressBar.value = 0
    }

    updateProgress(porcentaje) {
        this.progressBar.value = porcentaje
    }

    previewFile(file) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function() {
            let img = document.querySelector('#gallery img')
            img.src = reader.result
        }
    }

    handleFiles = files => {
        let file = files[0]
        this.initializeProgress()
        this.uploadFile(file)
        this.previewFile(file)
    }

    uploadFile = file => {
        var url = '/upload'

        var xhr = new XMLHttpRequest()
        var formdata = new FormData()

        xhr.open('POST', url)

        xhr.upload.addEventListener('progress', e => {
            let porcentaje = (((e.loaded * 100.0) / e.total) || 100)
            this.updateProgress(porcentaje)
        })

        xhr.addEventListener('load', () => {
            if(xhr.status == 200) {
                this.imagenSubida = JSON.parse(xhr.response).nombre
            }
        })

        formdata.append('foto', file)
        xhr.send(formdata)
    }
    /* ------------------------------------------------- */
}

function renderTablaAlta (validos, productos){    
    const xhr = new XMLHttpRequest
    xhr.open('get', 'plantillas/alta.hbs')
    xhr.addEventListener('load', () => {
        if(xhr.status == 200) {
            let plantillaHbs = xhr.response
            //console.log(plantillaHbs)
            
            var template = Handlebars.compile(plantillaHbs); /*Le pasamos la respuesta de AJAX, el string en HBS*/
            let html = template({ productos: productos });

            document.getElementById('listado-productos').innerHTML = html
        }
    })
    xhr.send()
}


/*----------------------------------------------------------------------*/
/*          Inicializaciones para el funcionamiento del Modulo          */
/*----------------------------------------------------------------------*/

let formularioAlta = null

async function initAlta() {
    console.warn('initAlta()')

    formularioAlta = new FormularioAlta(renderTablaAlta, productoController.guardarProducto)

    let productos = await productoController.obtenerProductos()
    renderTablaAlta(null, productos)
}






