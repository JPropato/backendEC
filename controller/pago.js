// SDK de Mercado Pago
import mercadopago from "mercadopago"

// Agrega credenciales
mercadopago.configure({
    access_token: "TEST-6680086214444626-020701-1d915e9423b53150159678f14d581793-62264025",
});

console.log('----- configuración de SDK de mercadopago ok! -----')

const feedBack = (req, res) => {
    let infoPago = {
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id
    };

    console.log(infoPago)

    res.redirect('/')
}

export default {
    feedBack
}