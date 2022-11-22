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
    image: [{url: String, cloudId: String}],
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
    userId: {
        type: String,
        required: true
    }
},{ timestamps: true })

module.exports = mongoose.model('Product', productSchema)