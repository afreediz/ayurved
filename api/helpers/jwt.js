const jwt = require('jsonwebtoken')
const CustomError = require('../utils/CustomError')
const asyncErrorHandler = require("express-async-handler")

const generateToken = (data, expires) => {
    return jwt.sign({...data}, process.env.JWT_SECRET, { expiresIn:expires, algorithm: 'HS256' })
}

const validateToken = (token) => {
    try{
        return jwt.verify(token, process.env.JWT_SECRET)
    }
    catch(err){
        throw new CustomError('CUSTOM ERROR: Invalid Token', 400)
    }
}

module.exports = {
    generateToken,
    validateToken
}