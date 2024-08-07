const { default: mongoose } = require('mongoose')
const env = require('dotenv').config({
    path:"./config/.env"
})
const connection = require('./config/connection')
const Products = require('./models/product')

// Products.updateMany({},{
//     $unset: {associatedBlog:""}
// }, {runValidators:true}).then(()=>{
//     console.log('done');
// })
const jwt = require('jsonwebtoken');

// JWT and secret key
const secretKey = '123abc'; 
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmEwYzNjZmQxODA3NTVkZTg4NzNkYjciLCJpYXQiOjE3MjI5NjQ5NTYsImV4cCI6MTcyNzI4NDk1Nn0.DRV5fujqUrqCvJwPg4uzQKzzz7ETnEQis9Ca2SlX7ts';

try {
    const decoded = jwt.verify(token, secretKey);
    console.log('JWT is valid. Decoded payload:', decoded);
} catch (err) {
    console.error('JWT verification failed:', err.message);
}
