const router = require('express').Router()
const { getUser, getAdmin, profile, updateProfile, deleteProfile, getAllUsers, userStatus, deleteUser, dashboardDetails, getUserForAdmin, sendVerificationCode, verifyCode } = require('../controllers/user');
const { phoneValidation } = require('../helpers/validators');
const { isAuthenticated, isAdmin } = require('../middlewares/isAuth')
const rateLimit = require('express-rate-limit')

const otpRateLimiter = rateLimit({
    windowMs: 1 * 60 * 60 * 1000, // 1 hour
    max: 5, // limit each IP to 3 email requests per windowMs
    message: {message:'You can only resend/verify otp 3 times per hour, Please try again after some time.'}
});


router.get('/get-user', isAuthenticated, getUser)
router.get('/profile', isAuthenticated, profile)
router.put('/profile', isAuthenticated, phoneValidation, updateProfile)
router.delete('/profile', isAuthenticated, deleteProfile)
router.post('/sendVerificationCode', otpRateLimiter, isAuthenticated, sendVerificationCode)
router.post('/verifyCode', otpRateLimiter, isAuthenticated, verifyCode)

// admin
router.get('/admin-get-user/:email', isAuthenticated, isAdmin, getUserForAdmin)
router.get('/get-admin', isAuthenticated, isAdmin, getAdmin)
router.get('/dashboard', isAuthenticated, isAdmin, dashboardDetails)
router.delete('/:id', isAuthenticated, isAdmin, deleteUser)
router.put('/status/:id', isAuthenticated, isAdmin, userStatus)
router.get('/all-users', isAuthenticated, isAdmin, getAllUsers)

module.exports = router