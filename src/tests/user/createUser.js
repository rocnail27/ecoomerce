const User = require("../../models/User")


const createUser = async() => {
try {
    const user = {
        firstName: "jose",
        lastName: "rojas",
        email: "jdanielrojas@gmail.com",
        password: "123456",
        phone: "04165458026"
    }

    await User.create(user) 

} catch (error) {
    console.log(error)
}
}


module.exports = createUser