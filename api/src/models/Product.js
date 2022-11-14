const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    price: Number,
    sold: {
        type: Number,
        default: 0
    },
    image: [URL],
    category: {
        mainCategory: {type: String},
        sucbCategory: {type: String}
    },
    stock: {
        type: Number,
        default: 1
    },
    rating: {
        rate: Number,
        amount: Number
    },
    description: [Text],
    specialOffer: Boolean,
    userId: String
})

module.exports = mongoose.model('Product', productSchema)