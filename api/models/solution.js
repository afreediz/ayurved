const mognoose = require('mongoose')

const SoltionSchema = mognoose.Schema({
    name:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        lowercase:true,
        unique:true
    }
})

module.exports = mognoose.model('solutions', SoltionSchema)