const jwt = require("jsonwebtoken")


const auth = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const isCostomAuth = token.length < 500

        let decodeData;

        if(token && isCostomAuth){
            decodeData = jwt.verify(token, "secret_key")
            req.userId = decodeData?.id
        }else{
            decodeData = jwt.verify(token)
            req.userId = decodeData?.sub
        }
    next()
    } catch (er) {
        console.log(er)
    }
}

module.exports = {
    auth
}
