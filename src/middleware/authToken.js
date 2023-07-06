const jwt = require("jsonwebtoken")


const authToken = (req, res,next) => {
    console.log(req.headers)
    let token = req.headers.Authorization || req.headers.authorization
    if(!token) return res.sendStatus(403)
    if(!token.startsWith("Bearer")) return res.sendStatus(403)
    token = token.split(" ")[1]
    
    const resJWT = jwt.verify(token,process.env.TOKEN)

    
    req.user = resJWT.user
  
    next()

}

module.exports = authToken







