import dotenv from 'dotenv'


console.log('process.cwd(): ' + process.cwd())

dotenv.config({
    path: process.cwd() + '/' + process.env.NODE_ENV + '.env'
})

export default {
    PORT: process.env.PORT || 8080,
    TIPO_DE_PERSISTENCIA_PRODUCTOS: process.env.TIPO_P || 'MONGODB',    // 'MEM', 'FILE', 'MONGODB'
    TIPO_DE_PERSISTENCIA_CARRITO: process.env.TIPO_C || 'MONGODB',    // 'MEM', 'FILE', 'MONGODB'
    STR_CNX: process.env.CNX || 'mongodb://localhost/test'   // base local
}