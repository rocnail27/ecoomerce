const express  = require("express")
const categoryRouter = express.Router()
const {createCategory,deleteCategory,getAllCategories} = require("../controllers/category.controller")
const authToken = require("../middleware/authToken")

categoryRouter.route("/")
.get(getAllCategories)
.post(authToken,createCategory)

categoryRouter.route("/:id")
.delete(authToken,deleteCategory)


module.exports = categoryRouter