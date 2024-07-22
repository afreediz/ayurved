const router = require('express').Router()
const { login, register, forgetPassword, verifyUser, changePassword, forwardMail } = require('../controllers/auth')
const { loginValidation, registerValidation} = require('../helpers/validators')

router.post('/sendmail', forwardMail)
router.post('/register', registerValidation, register)
router.post('/login', loginValidation, login)
router.post('/forget-password', forgetPassword)
router.post('/change-password', changePassword)
router.get('/verify/:token', verifyUser)

module.exports = router