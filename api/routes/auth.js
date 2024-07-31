const router = require('express').Router()
const { login, register, forgetPassword, verifyUser, changePassword, forwardMail } = require('../controllers/auth')
const { loginValidation, registerValidation, passwordValidation, emailValidation} = require('../helpers/validators')

router.post('/sendmail', forwardMail)
router.post('/register', registerValidation, register)
router.post('/login', loginValidation, login)
router.post('/forget-password', emailValidation, forgetPassword)
router.post('/change-password', passwordValidation,  changePassword)
router.get('/verify/:token', verifyUser)

module.exports = router