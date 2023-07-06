const express = require("express")
const userRouter = express.Router()
const {createUser,deleteUser,getAllUsers,updateUser, logging} = require("../controllers/user.controllers")
const authToken = require("../middleware/authToken")


userRouter.route("/")
.post(createUser)
.get(authToken,getAllUsers)

userRouter.route("/logging")
.post(logging)

userRouter.route("/:id")
.put(authToken,updateUser)
.delete(authToken,deleteUser)



module.exports = userRouter