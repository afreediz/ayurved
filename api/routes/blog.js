const router = require('express').Router()
const {createBlog, getBlog, getAllBlogs, updateBlog, deleteBlog} = require('../controllers/blog')
const { isAuthenticated, isAdmin } = require('../middlewares/isAuth')

router.get('/', getAllBlogs)
router.get('/:slug', getBlog)

router.post('/', isAuthenticated, isAdmin, createBlog)
router.put('/:id', isAuthenticated, isAdmin,  updateBlog)
router.delete('/:id', isAuthenticated, isAdmin,  deleteBlog)


module.exports = router