const express = require('express');
const router = express.Router();
const userRouter  = require("./user.router")
const categoryRouter = require("./category.router")
const productRouter = require("./product.router")
const cartRouter = require("./cart.router")
const purcharseRouter = require("./purcharse.router")
const productImgRouter = require("./productimg.router")
const authToken = require("../middleware/authToken")

router.use("/users",userRouter)

router.use("/categories", categoryRouter)

router.use("/products",productRouter)

router.use("/cart", cartRouter)

router.use("/purcharses",purcharseRouter)

router.use("/product_images",authToken,productImgRouter)





module.exports = router;