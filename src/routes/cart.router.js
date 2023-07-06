const { getAll, create, remove, update } = require('../controllers/cart.controller');
const express = require('express');
const authToken = require("../middleware/authToken")

const cartRouter = express.Router();

cartRouter.route('/')
    .get(authToken,getAll)
    .post(authToken,create);

cartRouter.route('/:id')
    .delete(authToken,remove)
    .put(authToken,update);

module.exports = cartRouter;