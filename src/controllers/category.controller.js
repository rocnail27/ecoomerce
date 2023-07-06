const Category = require("../models/Category")
const Product = require("../models/Product")
const ProductImg = require("../models/ProductImg")
require("../models")
const catchError = require("../utils/catchError")

const createCategory = catchError(async(req,res) => {

    const body = req.body
    const category = await Category.create(body) 

    res.status(201).json(category)

})

const getAllCategories = catchError(async(req, res) => {

    const categories = await  Category.findAll({include: {
        model: Product,
        include: [ProductImg]
    }})
    res.json(categories)

})


const deleteCategory = catchError(async(req,res) => {

    const {id} = req.params

    const resData = await Category.destroy({where:{id}})
    if(res.data == 0) return res.sendStatus(400)

    res.json(resData)
})



module.exports = {

    deleteCategory,
    createCategory,
    getAllCategories

}