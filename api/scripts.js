const { default: mongoose } = require('mongoose')
const env = require('dotenv').config({
    path:"./config/.env"
})
const connection = require('./config/connection')
const Products = require('./models/product')

Products.updateMany({},{
    $set: {highlighted:true}
}, {runValidators:true}).then(()=>{
    console.log('done');
})