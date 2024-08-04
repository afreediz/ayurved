const jwt = require('jsonwebtoken')
const CustomError = require('../utils/CustomError')

const generateToken = (data, expires) => {
    return jwt.sign({...data}, process.env.JWT_SECRET, { expiresIn:expires })
}

const validateToken = (token) => {
    try{
        return jwt.verify(token, process.env.JWT_SECRET)
    }
    catch(err){
        throw new CustomError('CUSTOM ERROR: Signin required', 400)
    }
}

module.exports = {
    generateToken,
    validateToken
}