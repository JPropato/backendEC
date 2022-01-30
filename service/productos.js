import config from '../config.js'

import ProductoModel from '../model/productos.js'
import ProductoValidation from '../model/validaciones/productos.js'

const model = ProductoModel.get(config.TIPO_DE_PERSISTENCIA_PRODUCTOS)

const obtenerProducto = async id => {
    let producto = await model.readProductos()
    return producto
}

const obtenerProductos = async () => {
    let productos = await model.readProductos()
    return productos
}

const guardarProducto = async producto => {
    const errorValidacion = ProductoValidation.validar(producto)
    if(!errorValidacion) {
        let productoGuardado = await model.createProducto(producto)
        return productoGuardado
    }
    else {
        console.log('Error en guardarProducto', errorValidacion.details[0].message)
        return {}
    }
}

const actualizarProducto = async (id, producto) => {
    const errorValidacion = ProductoValidation.validar(producto)
    if(!errorValidacion) {
        let productoActualizado = await model.updateProducto(id,producto)
        return productoActualizado
    }
    else {
        console.log('Error en actualizarProducto', errorValidacion.details[0].message)
        return {}
    }
}

const borrarProducto = async id => {
    let productoEliminado = await model.deleteProducto(id)
    return productoEliminado
}

export default {
    obtenerProducto,
    obtenerProductos,
    guardarProducto,
    actualizarProducto,
    borrarProducto
}