const sequelize = require("../utils/connection")
const createUser = require("./user/createUser")
require("../models")


const main = async() => {

    try {
      await sequelize.sync({force: true})
     
       console.log("corriendo servidor")
       await createUser()
       console.log("user creado") 
       process.exit() 
    } catch (error) {
        console.log(error)
    }

}

main()


module.exports = main