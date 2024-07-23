const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    slug:{
        type:String,
        required:true
    },
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('blogs', blogSchema)