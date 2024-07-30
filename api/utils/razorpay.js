const Razorpay = require('razorpay')

const instance = new Razorpay({
    key_id: process.env.RP_KEY_ID,
    key_secret: process.env.RP_SECRET_KEY
})

const getCurrentDateFormatted = function () {
    const date = new Date();
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = String(date.getFullYear()).slice(-2); // Get the last 2 digits of the year
  
    return `${day}-${month}-${year}`;
  }

module.exports = { instance, getCurrentDateFormatted }