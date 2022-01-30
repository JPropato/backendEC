class Main{
    async ajax(url, metodo='get') {
        return await fetch(url, { method: metodo }).then(r => r.text())
    }

    getNombreArchivo(id) { /*Creamos una funcion nos retorne la ruta al archivo*/
        return 'vistas/' + id + '.html'
    }

    marcarLink(id) {
        let links = document.querySelectorAll('.nav-bar__nav-link')
        links.forEach( link => {
            if (link.id == id ) link.classList.add('selected')
            else link.classList.remove('selected')
        })
    }

    initJS(id) { /*Creamos una funcion para iniciar cada pagina */
        if(id == 'alta') {
            initAlta()
        }
        else if(id == 'inicio') {
            initInicio()
        }
        else if(id == 'nosotros') {
            initNosotros()
        }
        else if(id == 'contacto') {
            initContacto()
        }
    }

    async cargarPlantilla(id){ /*Creamos una funcion para cargar cada plantilla de vistas e inyectarla en el main */
        let archivo = this.getNombreArchivo(id)

        let plantilla = await this.ajax(archivo) 
        // Carga del código de vista (HTML) de la plantilla
        let main = document.querySelector('main')
        main.innerHTML = plantilla //SE INYECTA PLANTILLA EN EL MAIN

        // Carga del código script (JS) de la plantilla
        this.initJS(id)
    }

    async cargarPlantillas (){
        /*Carga inicial de la vista determinada por la url visitada*/
        let id = location.hash.slice(1) || 'inicio'
        this.marcarLink(id)
        await this.cargarPlantilla(id) 


        /*Carga de cada uno de los contenidos segun la navegacion local*/
        let links = document.querySelectorAll('.nav-bar__nav-link')
        //console.log(links)

        links.forEach( link => {
            link.addEventListener('click', e => {                        //Evento a ejecutar cada vez que le hagamos click a cada link
                e.preventDefault()

                let id = link.id                                         //Ante cada click a cada link, recupero el id del elemento clickeado
                console.log(id + ' - click en el link')
                location.hash = id                                       //El ID recuperado lo incluyo en la navegacion mediante hash y logramos tener historial
            })
        })

        /*Codigo a ejecutar cuando haya un cambio en el hash*/
        window.addEventListener('hashchange', async () =>{ 
            //console.log('Cambió la url - hashchange')

            let id = location.hash.slice(1) || 'inicio'
            this.marcarLink(id)
            await this.cargarPlantilla(id)
        })
    }

    async start() {
        await this.cargarPlantillas()
    }
}

const main = new Main()
main.start()