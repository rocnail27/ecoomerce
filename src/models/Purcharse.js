const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Purcharse = sequelize.define('purcharse', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    //userid
    //productid
});

module.exports = Purcharse ;