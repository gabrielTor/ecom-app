const Product = require('../models/Product')

const categories = [
    'vehicles',
    'property',
    'electronic devices',
    'furniture',
    'sports',
    'clothes',
    'baby/kids',
    'muscic/ art / books',
    'pet stuff',
    'tools',
    'employment',
    'services'
]

const getCategories = (req, res) => {
    res.json(categories)
}

module.exports = {getCategories}