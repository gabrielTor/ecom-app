const User = require('../models/User')

const getUsers = async(req, res) => {
    const users = await User.find()
    res.json(users)
}

const createUser = async(req, res) => {
    const {email} = req.body
    try {
        const loginUser = await User.findOne({ email })
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
        const user = await User.findOne({email})
        user.active = false
        await user.save()
    } catch (error) {
        console.error(error)
    }
}

module.exports = {getUsers, createUser, logout}