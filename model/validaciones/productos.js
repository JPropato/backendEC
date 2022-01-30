//https://www.npmjs.com/package/joi
//https://joi.dev/

import Joi from 'joi'

class ProductoValidation {
    static validar(producto) {
        const productoSchema = Joi.object({
            nombre: Joi.string().min(3).max(20).required(),
            precio: Joi.number().required(),
            stock: Joi.number().required(),
            marca: Joi.string().required(),
            categoria: Joi.string().required(),
            origen: Joi.string().required(),
            foto: Joi.string().empty(''),
        })

        //const error = productoSchema.validate(producto).error
        const { error } = productoSchema.validate(producto)

        return error
    }
}

/*
let error = ProductoValidation.validar({
    nombre: "Reloj",
    precio: 123,
    stock: 77,
    marca: "Seiko",
    categoria: "Hogar",
    detalles: "Color celeste, analógico",
    foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-128.png",
    envio: true
})

console.log(error?.details[0].message)
*/

export default ProductoValidation
