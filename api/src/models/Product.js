const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    used: {
        type: Boolean,
        default: false
    },
    price: Number,
    sold: {
        type: Number,
        default: 0
    },
    image: [String],
    category: {
        mainCategory: {type: String},
        subCategory: {type: String}
    },
    stock: {
        type: Number,
        default: 1
    },
    rating: {
        rate: Number,
        amount: {
            type: Number,
            default: 0
        }
    },
    description: [String],
    specialOffer: {
        type: Boolean,
        default: false
    },
    userId: String
})

module.exports = mongoose.model('Product', productSchema)