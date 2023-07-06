const catchError = require('../utils/catchError');
const Purcharse = require('../models/Purcharse');
const Product = require('../models/Product');
const Cart = require('../models/Cart');


const getAll = catchError(async(req, res) => {

    const userId = req.user.id

    const results = await Purcharse.findAll({
        where:{userId},
        include: Product
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {

    const userId = req.user.id

    const cart = await Cart.findAll({
        where:{userId},
        attributes:["userId", "productId", "quantity"],
        raw: true
    })

    const purcharse = await Purcharse.bulkCreate(cart);

    Cart.destroy({where:{userId}})

    return res.status(201).json(purcharse);
});




module.exports = {
    getAll,
    create
}