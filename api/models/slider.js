const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
        unique:true
    },
})

module.exports = mongoose.model('sliders', blogSchema)