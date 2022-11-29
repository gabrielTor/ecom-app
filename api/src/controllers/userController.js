const User = require('../models/User')

const getUsers = async(req, res) => {
    const users = await User.find()
    res.json(users)
}

const createUser = async(req, res) => {
    const {email} = req.body
    try {
        let loginUser = await User.findOne({ email })
        if(loginUser){
            loginUser.active = true
            await loginUser.save()
            return res.json(loginUser)
        }
        const newUser = await User.create({ email })
        res.json(newUser)
    } catch (error) {
        console.error(error)
    }
}

const logout = async(req, res) => {
    const {email} = req.body
    try {
        let user = await User.findOne({email})
        user.active = false
        await user.save()
        res.json({message: `user ${email} has logged out`})
    } catch (error) {
        console.error(error)
    }
}

const updateUser = async(req, res) => {
    const { name, socialMedia, id } = req.body
    try {
        await User.findByIdAndUpdate(id, {
            name,
            socialMedia
        })
        res.json({message: `user id ${id} updated successful`})
    } catch (error) {
        console.error(error)
    }
}

const addToFavorites = async(req, res) => {
    const { product_id, email } = req.body
    try {
        let user = await User.findOne({email})
        const condition = user.favorites.includes(product_id)
        condition ?
        user.favorites = user.favorites.filter(f => f !== product_id) :
        user.favorites = [...user.favorites, product_id]
        await user.save()
        res.json({message: `${!condition ? 'added to' : 'removed from'} favorites`})
    } catch (error) {
        console.error(error)
    }
}

module.exports = {getUsers, createUser, logout, updateUser, addToFavorites}