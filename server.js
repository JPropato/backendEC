/* Importamos dependencias, configuramos router, middleware, ponemos en escucha al servidor */

import express from 'express'

import cors from 'cors'

import routerProductos from './router/productos.js'
import routerCarrito from './router/carrito.js'
import routerUpload from './router/upload.js'
import config from './config.js'

import DB_Mongo from './model/DB_Mongo.js'
DB_Mongo.conectarDB()

const app = express()

if (process.env.NODE_ENV == 'development') {
    app.use(cors())
    console.log('CORS HABILITADO!!!')
}

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)
app.use('/upload', routerUpload)


console.log('process.env.PORT:' + process.env.PORT)
console.log('process.env.TIPO_P:' + process.env.TIPO_P)
console.log('process.env.CNX:' + process.env.CNX)

const PORT = config.PORT
const server = app.listen(PORT, () => console.log(`Servidor express escuchando en el puerto ${PORT}`))
server.on('error', error => console.log(`Error en servidor express: ${error.message}`))