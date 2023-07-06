const { getAll, create, getOne, remove, update,setImagesProduct } = require('../controllers/product.controller');
const express = require('express');
const authToken = require("../middleware/authToken")

const productRouter = express.Router();

productRouter.route('/')
    .get(getAll)
    .post(authToken,create);

productRouter.route("/:id/product_image")
.post(authToken,setImagesProduct)    

productRouter.route('/:id')
    .get(getOne)
    .delete(authToken,remove)
    .put(authToken,update);

module.exports = productRouter;