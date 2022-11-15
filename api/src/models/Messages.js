const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messagesSchema = new Schema(
    {
        message: {
            userId: String,
            text: String,
            sentTo: String
        }
    },
    {
    timestamps: true
    }
)

module.exports = mongoose.model('Messages', messagesSchema)