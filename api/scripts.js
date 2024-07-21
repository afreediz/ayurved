const { default: mongoose } = require('mongoose')
const env = require('dotenv').config({
    path:"./config/.env"
})
const connection = require('./config/connection')
const User = require('./models/user')

User.updateMany({},{
    $set: {ph_verified:false}
}, {runValidators:true}).then(()=>{
    console.log('done');
})