const mongoose = require('mongoose')
const cloudinary = require('cloudinary')

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    shortdesc:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:'categories',
        required:true
    },
    solutions:[{
        type:mongoose.Types.ObjectId,
        ref:'solutions',
        required:false
    }],
    quantity:{
        type:Number,
        default:1,
        min:0
    },
    image:{
        type:String,
        required:true
    },
    highlighted:{
        type:Boolean,
        default:false
    },
    contents:{
        type:String,
        required:false
    }
}, {timstamps:true})

module.exports = mongoose.model('products', productSchema)