const router = require('express').Router()
const authRoutes = require('./auth')
const userRoutes = require('./user')
const productRoutes = require('./product')
const categoryRoutes = require('./category')
const orderRoutes = require('./order')
const solutionRoutes = require('./solution')

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/products', productRoutes)
router.use('/category', categoryRoutes)
router.use('/category', categoryRoutes)
router.use('/orders', orderRoutes)
router.use('/solutions', solutionRoutes)

module.exports = router