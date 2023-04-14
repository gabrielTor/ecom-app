const mercadopago = require('mercadopago')
require('dotenv').config()

mercadopago.configure({
    access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
})

const mcPayment = async (req, res) => {
    try {
        const preference = {
            items: [
                {
                    title: 'Product name',
                    description: 'Product description',
                    quantity: 1,
                    currency_id: 'ARS',
                    unit_price: 100,
                    picture_url: 'https://firebasestorage.googleapis.com/v0/b/carpentry-web-app.appspot.com/o/Gallery%2FPhoto%2024-04-15%2004%2000%2044%20p.m..jpg?alt=media&token=06de62ec-4042-47c2-b030-7512fd580fd1'
                }
            ],
            back_urls: {
                "success": "https://ecom-app-phi.vercel.app",
                "failure": "https://ecom-app-phi.vercel.app",
                "pending": "https://ecom-app-phi.vercel.app"
            },
            auto_return: "approved",
        }
        const response = await mercadopago.preferences.create(preference)
        const preferenceId = response.body.id
        res.redirect(preferenceId)

    } catch (error) {
        console.log(error.response)
    }
}

module.exports = { mcPayment }