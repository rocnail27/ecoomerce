const catchError = require('../utils/catchError');
const ProductImg = require('../models/ProductImg');



const getAll = catchError(async(req, res) => {
    const result = await ProductImg.findAll()
    return res.json(result)
});

const create = catchError(async(req, res) => {
    const { url, filename } = req.body;  

    delete req.body.productId
    const body = { url, filename}
    const image = await ProductImg.create(body);
    return res.status(201).json(image);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    const deleteImage = await ProductImg.destroy({where:{id}})
    if(!deleteImage) return res.sendStatus(400)
    return res.sendStatus(204);
});

module.exports = {
    getAll,
    create,
    remove
}