// const nodemailer = require('nodemailer');
// require('dotenv').config();

// const transporter = nodemailer.createTransport({
//   host: "smtp.hostinger.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: 'ecommerce@navjeevana.com',
//     pass: 'Navjeevana@1446',
//   },
// });

// const sendVerificationEmail = async (email, verificationLink) => {
//   try {
//     const info = await transporter.sendMail({
//         from:'ecommerce@navjeevana.com',
//       to: email,
//       subject: 'Email Verification',
//       html: `<p>Please verify your email by clicking on the link below:</p>
//              <a href="${verificationLink}">Verify Email</a>`,
//     });
//   } catch (error) {
//     console.error('Error sending email: ', error);
//   }
// };

// sendVerificationEmail('afreedisulfiker@gmail.com', 'hello')

// // const readLine = require('readline')

// // const rl = readLine.createInterface({
// //   input: process.stdin,
// //   output: process.stdout
// // })

const available_currencies = {
"INDIA":"INR",
"USA":"USD",
"EUROPE":"EUR",
"UAE":"AED",
}

const exchange_rates = {
"INR": 1,
"USD": 0.012,
"EUR": 0.011,
"AED": 0.044
}

const currency_symbols = {
"INR":"₹",
"USD":"$",
"EUR":"€",
"AED":"AED"
}

// // rl.question('Enter the currency: ', (currency) => {
// //     console.log(currency);
// //   const rate = exchange_rates[currency]
// //   console.log(rate);
// //   rl.close()
// // })


module.exports = {available_currencies, exchange_rates, currency_symbols}