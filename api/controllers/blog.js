const Blog = require('../models/blog')
const asyncErrorHandler = require('express-async-handler')
const CustomError = require('../utils/CustomError')
const {uploadImage, deleteImage} = require('../helpers/image')
const slugify = require('slugify')

const createBlog = asyncErrorHandler(async (req, res) => {
    const {image, title, content} = req.body
    if (!image || !title || !content) throw new CustomError('Necessary details are not filled', 404)

    const result = await uploadImage(image)
        
    const blog = await Blog.create({
        slug:slugify(title),
        image:result.url,
        title,
        content,
    })
    res.status(201).json({
        success: true,
        blog
    })
})

const getBlog = asyncErrorHandler(async (req, res) => {
    const slug = req.params.slug
    const blog = await Blog.findOne({slug})    
    res.status(200).json({
        success: true,
        blog
    })
})

const getAllBlogs = asyncErrorHandler(async (req, res) => {
    const blogs = await Blog.find({})
    console.log(blogs)
    res.status(200).json({
        success: true,
        blogs
    })
})

const updateBlog = asyncErrorHandler(async (req, res) => {
    const {image, title, content} = req.body

    const blog = await Blog.findByIdAndUpdate(req.params.id, {$set:{ image, title, content}}, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true,
        blog
    })
})

const deleteBlog = asyncErrorHandler(async (req, res) => {
    const blog = await Blog.findByIdAndDelete(req.params.id)
    await deleteImage(blog.image)
    res.status(200).json({
        success: true,
        blog
    })
})

module.exports = {
    createBlog,
    getBlog,
    getAllBlogs,
    updateBlog,
    deleteBlog
}