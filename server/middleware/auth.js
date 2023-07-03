const jwt = require('jsonwebtoken');
const token = process.env.TOKEN_KEY

const fetchuser = ( req, res, next ) =>{

    const tokens = req.header("auth-token")

    if(!tokens){
        return res.status(400),json({ error: "No auth token found" })
    }

    const authToken = jwt.verify(tokens, token)
    req.user = authToken.user

    next()

}

module.exports = fetchuser