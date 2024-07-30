const asyncErrorHandler = require("express-async-handler")
const CustomError = require('../utils/CustomError')
const instance = require('../utils/razorpay')
const {getCurrentDateFormatted} = require('../utils/razorpay')

const Order = require("../models/order")
const Product = require("../models/product")
const User = require("../models/user")

const createOrder = asyncErrorHandler(async(req, res)=>{
    const { cart } = req.body
    const user = await User.findById(req.user._id).select('ph_verified address')
    
    if (!user.ph_verified) throw new CustomError("CUSTOM ERROR: Please verify your phone number before placing order", 400)
    if (!user.address) throw new CustomError("CUSTOM ERROR: Please add your address before placing order", 400)
    if (cart.length == 0) throw new CustomError("CUSTOM ERROR: Cart is empty", 400)

    let totalAmount = 0
    for (let p of cart){
        const product = await Product.findById(p.product)

        if(!product) throw new CustomError("CUSTOM ERROR: Product not found", 400)

        if(product.quantity < p.cart_quantity) throw new CustomError("CUSTOM ERROR: Product quantity is not available", 400)
        
        totalAmount += product.price * p.cart_quantity
        // product.quantity -= p.cart_quantity
        // await product.save()
    }

    const options = {
        amount: totalAmount * 100,
        currency: 'INR',
        receipt: `receipt_${getCurrentDateFormatted()}_${req.user.email}`,
        payment_capture: 1
    }
    const orders = await instance.orders.create(options)
    if (!orders) throw new CustomError("CUSTOM ERROR: Something went wrong", 500)
    for (let p of cart){
        await Order.create({user:req.user._id,product:p.product, cart_quantity:p.cart_quantity, order_id:orders.id})
    }

    res.status(200).json({success:true, message:"", order_id:orders.id})
})

const verifyOrder = asyncErrorHandler(async(req, res)=>{
    // lgoic
    const { orderid } = req.params
    const order = await Order.findByIdAndUpdate(orderid, {payment:"Paid"}, {new:true, runValidators:true})
    res.status(200).json({
        success:true,
        message:"Order verified succesfully",
        order
    })
})

const deleteOrder = asyncErrorHandler(async(req, res)=>{
    const { id } = req.params
    await Order.findByIdAndDelete(id)
    res.status(200).json({success:true, message:"Order deleted successfully"})
})

const userOrders = asyncErrorHandler(async(req, res)=>{
    const user = req.user._id
    const orders = await Order.find({user}).populate({
        path:'product',
        select:'name shortdesc price image'
    }).sort({createdAt:-1})
    res.status(200).json({success:true, message:"Orders", orders:orders})
})

const allOrders = asyncErrorHandler(async(req, res)=>{
    const orders = await Order.find({}).populate({
        path:'product user',
        select:'name shortdesc price'
    }).sort({createdAt:-1})
    res.status(200).json({success:true, message:"All orders",orders:orders})
})

const cancelOrder = asyncErrorHandler(async(req, res)=>{
    const { id } = req.params
    const order = await Order.findByIdAndUpdate(id, {status:"Canceled"}, {new:true, runValidators:true})
    res.status(200).json({
        success:true,
        message:"Order cancelled succesfully",
        order
    })
})

const orderStatus = asyncErrorHandler(async(req, res)=>{
    const { id } = req.params
    const { status } = req.body

    const order = await Order.findByIdAndUpdate(id, {status}, {new:true, runValidators:true})

    res.status(200).json({
        success:true,
        message:"Order updated succesfully",
        order
    })
})
const dashboardDetails = asyncErrorHandler(async(req, res)=>{
    const orders_count = await Order.estimatedDocumentCount()
    const recent_orders = await Order.find({}).populate({
        path:'product user',
        select:'name shortdesc price'
    }).limit(6).sort({createdAt:-1})
    const orders = await Order.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                number_of_orders: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                day: "$_id",
                number_of_orders: 1
            }
        },
        {
            $sort: { day: 1 }
        },
        {
            $limit: 20
        }
    ]);
    res.status(200).json({
        success:true, 
        message:"Dashboard orders details", 
        orders_count,
        orders:orders,
        recent_orders:recent_orders
    })
})

module.exports = { orderStatus, createOrder, userOrders, allOrders, deleteOrder, cancelOrder, dashboardDetails }