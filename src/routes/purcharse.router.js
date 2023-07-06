const { getAll, create } = require('../controllers/purcharse.controller');
const express = require('express');
const authToken = require('../middleware/authToken');

const routerName = express.Router();

routerName.route('/')
    .get(authToken,getAll)
    .post(authToken,create);



module.exports = routerName;