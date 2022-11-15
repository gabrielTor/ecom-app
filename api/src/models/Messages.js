const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messagesSchema = new Schema({
    chat: {
        user1: {
            type: String,
            messages: [String]
        },
        user2: {
            type: String,
            messages: [String]
        }
    }
})

module.exports = mongoose.model('Messages', messagesSchema)