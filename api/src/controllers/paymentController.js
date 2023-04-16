const mercadopago = require('mercadopago')
require('dotenv').config()

mercadopago.configure({
    access_token: process.env.MERCADO_PAGO_ACCESS_TOKEN
})

const mcPayment = async (req, res) => {
    try {
        const preference = {
            items: req.body.map(({ title, price, amount, image }) => (
                {
                    title,
                    description: 'Product description',
                    quantity: Number(amount),
                    currency_id: 'ARS',
                    unit_price: price,
                    picture_url: image
                })
            ),
            back_urls: {
                "success": "https://ecom-app-phi.vercel.app",
                "failure": "https://ecom-app-phi.vercel.app",
                "pending": "https://ecom-app-phi.vercel.app"
            },
            auto_return: "approved",
        }
        const response = await mercadopago.preferences.create(preference)
        const preferenceId = response.body.id
        res.json(preferenceId)

    } catch (error) {
        console.log(error)
    }
}

module.exports = { mcPayment }