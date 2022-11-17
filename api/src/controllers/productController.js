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

const searchProducts = async(req, res) => {
    let { search } = req.query
    try {
        if(search){
            const products = await Product.find()
            let find = search.toLowerCase()
            let found = products.filter(prod => prod.title.toLowerCase().includes(find))
            let found1 = products.filter(prod => prod.category.mainCategory.toLowerCase().includes(find))
            let found2 = products.filter(prod => prod.category.subCategory.toLowerCase().includes(find))
            let foundInDescrip = products.filter(prod => {
                for (let i = 0; i < prod.description.length; i++) {
                    prod.description[i].toLowerCase().includes(find)
                }
            })
            return res.json((found.length && found) || (found1.length && found1) || (found2.length && found2) || (foundInDescrip.length && foundInDescrip) || {message: 'No results found'})
            }
        return res.status(400).json({message: 'Insert a value to search'})
    } catch (error) {
        console.error(error)
    }
}

const getProductInfo = async(req, res) => {
    const { id } = req.params
    try {
        const product = await Product.findById(id)
        res.json(product)
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

module.exports = {getCategories, getProducts, createProduct, getProductInfo, searchProducts}