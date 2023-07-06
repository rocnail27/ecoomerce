const Cart = require("../models/Cart")
const User = require("../models/User")
const catchError = require("../utils/catchError")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const createUser = catchError(async(req,res) => {
    console.log("hola")
    const user = req.body
    const resData = await User.create(user)
    res.json(resData)

})

const deleteUser = catchError(async(req,res) => {

    const {id} = req.params
    const resData = await User.destroy({where:{id}})
    res.json(resData)

})

const updateUser = catchError(async(req,res) => {
    const {id} = req.params
    const user = req.body
    delete user.password
    delete user.phone

    const resData = await User.update(user,{where:{id}, returning: true})
    if(resData[0] == 0) return res.sendStatus(400)
    res.json(resData[1][0])

})

const getAllUsers = catchError(async(req,res) => {
    const users = await User.findAll()
    res.json(users)
})

const logging = catchError(async(req,res) => {

    const {email, password} = req.body
    const user = await User.findOne({where:{email}})
    if(!User) return res.sendStatus(401)
    
    const isPassword = await bcrypt.compare(password,user.password)
    if(!isPassword) return res.sendStatus(401)
    
    const payload = {
        user
    }

    const token = jwt.sign(payload, process.env.TOKEN,{
        expiresIn: 3600
    })

    if(!token )return res.sendStatus(403)
    res.json({user,token})
    
})

module.exports = {
    createUser,
    getAllUsers,
    deleteUser,
    updateUser,
    logging
}