const Product = require('../models/Product')
const categories = require('../models/categories')
const cloudinary = require('../utils/cloudinary')

const getCategories = async(req, res) => {
    const {category} = req.query
    try {
        if(category){
            const findAll = await Product.find()
            const findByCateg = findAll.filter(prod => prod.category.mainCategory === category || prod.category.subCategory === category)
            if(!findByCateg.length) return res.status(404).json({message: `Sorry no products in the ${category} Category`})
            res.json(findByCateg)
        } else res.json(categories)
    } catch (error) {
        console.error(error)
    }
}

const getProducts = async(req, res) => {
    const { page } = req.query || 0
    const limit = 12
    try {
        const count = await Product.find().count()
        const products = await Product.find().sort({createdAt: -1}).skip(page*limit).limit(limit)
        if(!products.length) return res.status(400).json({message: 'there are no products'})
        res.json({products, count})
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

const deleteCloudImg = async(req, res) => {
    const { id } = req.body
  try {
    await cloudinary.uploader.destroy(id);
    res.json({message: `image cloudId ${id} was deleted from cloudinary`})
  } catch (error) {
    console.error(error)
  }
}

module.exports = {getCategories, getProducts, createProduct, getProductInfo, searchProducts, deleteCloudImg}