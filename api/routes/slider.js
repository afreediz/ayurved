const router = require('express').Router()
const { getSliders, createSlider, deleteSlider } = require('../controllers/slider')
const { isAuthenticated, isAdmin } = require('../middlewares/isAuth')

router.get('/', isAuthenticated, isAdmin, getSliders)
router.post('/', isAuthenticated, isAdmin, createSlider)
router.delete('/:id', isAuthenticated, isAdmin, deleteSlider)

module.exports = router