const asyncErrorHandler = require("express-async-handler")
const CustomError = require('../utils/CustomError')
const slugify = require('slugify')

const Product = require('../models/product')
const Category = require("../models/category")
const Solution = require("../models/solution")

const {uploadImage, deleteImage} = require("../helpers/image")

const getAllProducts = asyncErrorHandler(async(req, res)=>{
    const products = await Product.find({}).populate('category').select('_id name shortdesc price slug quantity').sort({createdAt:-1})

    res.status(200).json({
        success:true,
        message:"All products",
        products,
        countTotal:products.length
    })
})
const highlightedProducts = asyncErrorHandler(async(req, res)=>{
    const products = await Product.find({ highlighted:true}).populate('category').select('_id name shortdesc price slug quantity image').sort({createdAt:-1})

    res.status(200).json({
        success:true,
        message:"All products",
        products,
        countTotal:products.length
    })
})
const getProduct = asyncErrorHandler(async(req, res)=>{
    const slug = req.params.slug
    const product = await Product.findOne({slug}).populate('category').populate('solutions');
    res.status(200).json({
        success:true,
        message:"Product",
        product
    })
})

const getShortDetails = asyncErrorHandler(async(req, res)=>{
    const id = req.params.id
    const product = await Product.findById(id).select('_id name slug price shortdesc');
    res.status(200).json({
        success:true,
        message:"Product",
        product
    })
})

const getCartDetails = asyncErrorHandler(async(req, res)=>{
    const cart = req.body.cart
    var cartDetails = []
    for(let i=0;i<cart.length;i++){
        const product = await Product.findById(cart[i]._id).select('_id name slug price shortdesc image').lean();
        cartDetails.push({...product, cart_quantity:cart[i].cart_quantity})
    }
    res.status(200).json({
        success:true,
        message:"Cart Details",
        cartDetails
    })
})

const createProduct = asyncErrorHandler(async(req, res)=>{
    const { name, description, price, category, quantity, image, shortdesc, solutions } = req.body
    if( !name || !description || !price || !category || !shortdesc || !image ) throw new CustomError('CUSTOM ERROR: Necessary details are not filled', 404)    
    const result = await uploadImage(image)

    try{
        const product = await new Product({name, slug:slugify(name), shortdesc,description, price, category, quantity, image:result.url, solutions:[...solutions]}).save()
        res.status(200).json({
            success:true,
            message:"Product added successfully",
            product
        })
    }catch(err){
        await deleteImage(result.url)
        throw new CustomError(`CUSTOM ERROR: ${err.message}`, 500)
    }
})
const updateProduct = asyncErrorHandler(async(req, res)=>{
    const id = req.params.id
    const { name, description, price, category, quantity, image, old_image, shortdesc, solutions, highlighted, contents } = req.body
    var result = image
    if(image !== old_image){ 
        await deleteImage(old_image)
        result = await uploadImage(image)
    }
    const product = await Product.findByIdAndUpdate(id, {$set:{name, slug:slugify(name), shortdesc,description, price, category, quantity, image:result.url, solutions, highlighted, contents}}, {runValidators:true, new:true})

    res.status(200).json({
        success:true,
        message:"Product updated successfully",
        product
    })
})
const deleteProduct = asyncErrorHandler(async(req, res)=>{
    const id = req.params.id
    const {image} = await Product.findOne({_id:id}).select('image')
    deleteImage(image)
    await Product.deleteOne({_id:id})

    res.status(200).json({
        success:true,
        message:"Product deleted successfully"
    })
})
const filterProducts = asyncErrorHandler(async(req, res)=>{
    const { checked, radio } = req.body;
    let args = {}
    if(checked.length > 0) args.category = checked
    if(radio.length) args.price = {$gte:radio[0], $lte:radio[1]}
    const products = await Product.find(args)
    res.status(200).json({
        success:true,
        message:"Filtered products",
        products
    })
})

const getProductCount = asyncErrorHandler(async(req, res)=>{
    const total = await Product.find({}).estimatedDocumentCount()
    res.status(200).json({
        success:true,
        message:"Total count",
        total
    })
})
const productList = asyncErrorHandler(async(req, res)=>{
    const perPage = 8
    const page = req.params.page? req.params.page : 1
    const products = await Product.find({}).populate('category')
    .select('_id name shortdesc price slug quantity image')
    .skip((page - 1)*perPage)
    .limit(perPage)
    .sort({createdAt:-1})
    res.status(200).json({
        success:true,
        message:`Products of page ${page}`,
        products
    })
})
const productSearch = asyncErrorHandler(async(req, res)=>{
    const { keyword } = req.params
    const products = await Product.find({
        $or:[
            {name:{$regex:keyword, $options:'i'}},
            {description:{$regex:keyword, $options:'i'}},
            {shortdesc:{$regex:keyword, $options:'i'}}
        ]
    })
    res.status(200).json({
        success:true,
        message:"Result",
        products
    })
})
const productsRelated = asyncErrorHandler(async(req, res)=>{
    const { pid, cid } = req.params
    const products = await Product.find({
        category:cid,
        _id:{$ne:pid}
    }).limit(5)
    res.status(200).json({
        success:true,
        message:"Related Products",
        products
    })
})
const categoryProducts = asyncErrorHandler(async(req, res)=>{
    const { slug } = req.params
    const perPage = 8
    const page = req.params.page? req.params.page : 1

    const category = await Category.findOne({slug})
    if(!category) throw new CustomError("CUSTOM ERROR: Invalid category", 404)

    const products = await Product.find({category:category._id})
    .populate('category')
    .select('-photo')
    .skip((page - 1)*perPage)
    .limit(perPage)
    .sort({createdAt:-1})

    res.status(200).json({
        success:true,
        message:`Products of category : ${category.name}`,
        products
    })
})
const categoryProductsCount = asyncErrorHandler(async(req, res)=>{
    const { slug } = req.params
    const category = await Category.findOne({slug})
    if(!category) throw new CustomError("CUSTOM ERROR: Invalid category", 404)
    const total = await Product.find({category:category._id}).count()
    res.status(200).json({
        success:true,
        message:`number of products of category : ${slug}`,
        total
    })
})
const solutionProducts = asyncErrorHandler(async(req, res)=>{
    const { slug } = req.params
    const perPage = 8
    const page = req.params.page? req.params.page : 1

    const solution = await Solution.findOne({slug})
    if(!solution) throw new CustomError("CUSTOM ERROR: Invalid Solution", 404)

    const products = await Product.find({solutions:{'$in':[solution._id]}})
    .populate('solutions')
    .select('-photo')
    .skip((page - 1)*perPage)
    .limit(perPage)
    .sort({createdAt:-1})

    res.status(200).json({
        success:true,
        message:`Products of solution : ${solution.name}`,
        products
    })
})
const solutionProductsCount = asyncErrorHandler(async(req, res)=>{
    const { slug } = req.params
    const solution = await Category.findOne({slug})
    if(!solution) throw new CustomError("CUSTOM ERROR: Invalid solution", 404)
    const total = await Product.find({solution:{'$in':[solution._id]}}).count()
    res.status(200).json({
        success:true,
        message:`number of products of solution : ${slug}`,
        total
    })
})
const dashboardDetails = asyncErrorHandler(async(req, res)=>{
    const products_count = await Product.estimatedDocumentCount()
    const products = await Product.aggregate([
        {
            $group: {
                _id: "$category",
                number_of_products: { $sum: 1 }
            }
        },
        {
            $lookup: {
                from: "categories",
                localField: "_id",
                foreignField: "_id",
                as: "categoryDetails"
            }
        },
        {
            $unwind: "$categoryDetails"
        },
        {
            $project: {
                _id: 0,
                category: "$categoryDetails.slug",
                number_of_products: 1
            }
        },
        {
            $sort: { number_of_products: -1 }
        },
        {
            $limit: 5
        }
    ]);
    res.status(200).json({
        success:true,
        message:"Dashboard product details",
        products_count,
        products
    })
})
module.exports = { 
    getAllProducts, 
    getProduct, 
    createProduct, 
    updateProduct, 
    deleteProduct, 
    filterProducts,
    getProductCount,
    productList,
    productSearch,
    productsRelated,
    categoryProducts,
    categoryProductsCount,
    dashboardDetails,
    solutionProducts,
    solutionProductsCount,
    highlightedProducts,
    getShortDetails,
    getCartDetails
}