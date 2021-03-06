/* https://mongoosejs.com/ */
import mongoose from 'mongoose'
import DB_Mongo from './DB_Mongo.js'


/* ------------------------------------------------------------- */
/* Esquema del documento producto */
const productoSchema = mongoose.Schema({
    nombre: String,
    precio: Number,
    stock: Number,
    marca: String,
    categoria: String,
    origen: String,
    foto: String,
})

/* Modelo del documento almacenado en una colección de MongoDB */
const ProductoModel = mongoose.model('productos', productoSchema)
/* ------------------------------------------------------------- */


class ProductoModelMongoDB {

    // -----------------------------------------------------------------------------------
    /* CRUD -> C : Create -> http method POST */
    async createProducto(producto) {
        if(!DB_Mongo.conexionOk) return {}

        try{
            const productoSave = new ProductoModel(producto)
            await productoSave.save()

            let productos = await ProductoModel.find({}).lean() //Busca todos los productos. lean() forma eficiente
            let productoGuardado = productos[productos.length-1] //
            return DB_Mongo.genIdKey(productoGuardado) // _id = id

        }
        catch{
            console.log(`Error en createProducto: ${error.message}`)
            return {}
        }
    }

    /* CRUD -> R : Read ALL -> http method GET */
    async readProductos() {
        if(!DB_Mongo.conexionOk) return {}

        try{
            let productos = await ProductoModel.find({}).lean()
            return DB_Mongo.genIdKey(productos)
        }
        catch (error) {
            console.log(`Error en readProductos: ${error.message}`)
            return {}
        }
    }

    /* CRUD -> R : Read ONE -> http method GET */
    async readProducto(id) {
        if(!DB_Mongo.conexionOk) return {}

        try{
            let producto = await ProductoModel.findOne({_id:id}).lean()
            return DB_Mongo.genIdKey(producto)
        }
        catch (error) {
            console.log(`Error en readProducto: ${error.message}`)
            return {}
        }
    }

    
    /* CRUD -> U : Update -> http method PUT */
    async updateProducto(id,producto) {
        if(!DB_Mongo.conexionOk) return {}

        try {
            await ProductoModel.updateOne({_id:id},{$set: producto})

            let productoActualizado = await ProductoModel.findOne({_id:id}).lean()
            return DB_Mongo.genIdKey(productoActualizado)
        }
        catch(error) {
            console.log(`Error en updateProducto: ${error.message}`)
            return {}
        }
    }

    /* CRUD -> D : Delete -> http method DELETE */
    async deleteProducto(id) {
        if(!DB_Mongo.conexionOk) return {}
        
        try {
            let productoBorrado = await ProductoModel.findOne({_id:id}).lean()
            await ProductoModel.deleteOne({_id:id})

            return DB_Mongo.genIdKey(productoBorrado)
        }
        catch(error) {
            console.log(`Error en deleteProducto: ${error.message}`)
            return {}
        }
    }

}

export default ProductoModelMongoDB