const Razorpay = require('razorpay')

export default instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

export const getCurrentDateFormatted = function () {
    const date = new Date();
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = String(date.getFullYear()).slice(-2); // Get the last 2 digits of the year
  
    return `${day}-${month}-${year}`;
  }