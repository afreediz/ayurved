const { validateToken } = require('../helpers/jwt')
const asyncErrorHandler = require("express-async-handler")
const User = require('../models/user')
const CustomError = require('../utils/CustomError')

const isAuthenticated = asyncErrorHandler(async(req, res, next) => {
    const token = req.headers.authorization
    const decoded = validateToken(token)
    const user = await User.findById(decoded._id).select('_id name role status')
    if(!user) throw new CustomError("Signin required", 400)
    if( user.status == "inactive") throw new CustomError("Your account has been deactivated for some reasons, Please contact with our team for further clarifications.", 400)
    req.user = user
    next()
})

const isAdmin = asyncErrorHandler(async(req, res, next) => {
    if(req.user.role!='admin') throw new CustomError('UnAuthorized access', 400)
    next()
})

module.exports = {
    isAuthenticated,
    isAdmin
}