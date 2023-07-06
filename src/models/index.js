const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const ProductImg = require("./ProductImg");
const Purcharse = require("./Purcharse");
const User = require("./User");



Product.belongsTo(Category)
Category.hasMany(Product)

Cart.belongsTo(User)
User.hasOne(Cart)

Cart.belongsTo(Product)
Product.hasMany(Cart)


Purcharse.belongsTo(User)
User.hasMany(Purcharse)


Purcharse.belongsTo(Product)
Product.hasMany(Purcharse)


ProductImg.belongsTo(Product)
Product.hasMany(ProductImg)