const { createSolutions, getSolutions, updateSolutions, deleteSolutions, getAllSolutions } = require('../controllers/solution')
const { isAuthenticated, isAdmin } = require('../middlewares/isAuth')
const router = require('express').Router()

router.get('/', getAllSolutions)
router.get('/:slug', getSolutions)
router.post('/', isAuthenticated, isAdmin,createSolutions)
router.put('/:id', isAuthenticated, isAdmin, updateSolutions)
router.delete('/:id',isAuthenticated, isAdmin, deleteSolutions)

module.exports = router