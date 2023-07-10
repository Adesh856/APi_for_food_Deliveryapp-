const jwt = require('jsonwebtoken');

module.exports = async (req,res,next)=>{
    const token = req.headers?.authorization.split(" ")[1]
    if(token){
        var decoded = jwt.verify(token, 'FoodAPP');
        if(decoded){
            req.user=decoded.UserID
            next()
        }else{
            res.status(401).send({"msg":"Invalid password"})
        }
    }else{
        res.status(401).send({"msg":"Invalid Token"})
    }
}