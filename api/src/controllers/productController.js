const Product = require('../models/Product')
const categories = require('../models/categories')

const getCategories = (req, res) => {
    res.json(categories)
}

const getProducts = async(req, res) => {
    const { page } = req.query || 0
    const limit = 12
    try {
        const products = await Product.find().skip(page*limit).limit(limit)
        if(!products.length) return res.status(400).json({message: 'there are no products'})
        res.json(products)
    } catch (error) {
        console.error(error)
    }
}

const createProduct = async(req, res) => {
    const {title, price, image, category, stock, description, userId, used} = req.body
    try {
        await Product.create({
           title,
           price,
           image,
           category,
           stock,
           description,
           userId,
           used
        })
        res.json({message: 'new product created'})
    } catch (error) {
        console.error(error)
    }
}

module.exports = {getCategories, getProducts, createProduct}