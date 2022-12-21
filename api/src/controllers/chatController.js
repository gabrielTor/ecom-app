const Chat = require('../models/Chat')
const Product = require('../models/Product')

const getChats = async(req, res) => {
    const {userId} = req.query
    try {
        let data = []
        const chats = await Chat.find().where(({userId})).select('productId messages')
        const sellerChats = await Chat.find().where(({sellerUserId: userId})).select('productId messages')
        for(let chat of chats){
            const product = await Product.findById(chat.productId).select('image title')
            data.push({product, chat})
        }
        if(data.length) return res.json(data)
        for(let chat of sellerChats){
            const product = await Product.findById(chat.productId).select('image title')
            data.push({product, chat})
        }
        res.json(data)
    } catch (error) {
        console.error(error)
    }
}

const newChat = async(req, res) => {
    const {userId, sellerUserId, productId} = req.body
    if(userId === sellerUserId) return res.status(400).json({message: 'you cannot chat with yourself'})
    try {
        const chatFound = await Chat.findOne({userId, sellerUserId, productId})
        if(chatFound) return res.json(chatFound)
        const createChat = await Chat.create({
            userId,
            sellerUserId,
            productId
        })
        res.json(createChat)
    } catch (error) {
        console.error(error)
    }
}

module.exports = {getChats, newChat}