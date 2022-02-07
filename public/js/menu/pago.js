// Agrega credenciales de SDK
const mercadopago = new MercadoPago("TEST-f8e075f7-32c1-4b17-8442-b7805b8976e0", {
    locale: "es-AR",
});


async function renderPago(preference) {
    let html = await fetch('vistas/pago.html').then(r => r.text())

    document.querySelector('main').style.display = 'none'
    document.querySelector('.section-pago').innerHTML = html

    createCheckoutButton(preference.id)

    // Go back
    document.getElementById("go-back").addEventListener("click", function () {
        document.querySelector('main').style.display = 'block'
        document.querySelector('.section-pago').innerHTML = ''
    });
}


// Create preference when click on checkout button
function createCheckoutButton(preferenceId) {
    // Initialize the checkout
    mercadopago.checkout({
        preference: {
            id: preferenceId
        },
        render: {
            container: '#button-checkout', // Class name where the payment button will be displayed
            label: 'Pagar', // Change the payment button text (optional)
        }
    });
}
