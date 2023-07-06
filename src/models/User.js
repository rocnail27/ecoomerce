const sequelized = require("../utils/connection")
const {DataTypes} = require("sequelize") 
const bcrypt = require("bcrypt")

const User = sequelized.define("user",{

    firstName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phone:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

})


User.prototype.toJSON = function () {
    const user = Object.assign({}, this.get())
    delete user.password
    delete user.phone
    return user
}

User.beforeCreate(async(user) => {
    const {password} = user
    user.password = await bcrypt.hash(password,10)
 
})



module.exports = User