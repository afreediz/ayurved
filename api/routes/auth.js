const router = require('express').Router()
const { login, register, forgetPassword, verifyUser, changePassword, forwardMail } = require('../controllers/auth')
const { loginValidation, registerValidation, passwordValidation, emailValidation} = require('../helpers/validators')
const rateLimit = require('express-rate-limit')

const emailLimiter = rateLimit({
    windowMs: 1 * 60 * 60 * 1000, // 1 hour
    max: 5, // limit each IP to 3 email requests per windowMs
    message: {message:'You can only send 5 messages per hour'}
});

router.post('/sendmail', emailLimiter, forwardMail)
router.post('/register', registerValidation, register)
router.post('/login', loginValidation, login)
router.post('/forget-password', emailValidation, forgetPassword)
router.post('/change-password', passwordValidation,  changePassword)
router.get('/verify/:token', verifyUser)

module.exports = router