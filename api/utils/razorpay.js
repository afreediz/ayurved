const Razorpay = require('razorpay')

const instance = new Razorpay({
    key_id: process.env.RP_KEY_ID,
    key_secret: process.env.RP_SECRET_KEY
})



module.exports = { instance,  }