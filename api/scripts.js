const { default: mongoose } = require('mongoose')
const env = require('dotenv').config({
    path:"./config/.env"
})
const connection = require('./config/connection')
const Products = require('./models/product')

Products.updateMany({},{
    $unset: {associatedBlog:""}
}, {runValidators:true}).then(()=>{
    console.log('done');
})