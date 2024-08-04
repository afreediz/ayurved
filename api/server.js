const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('morgan')
const errorHandler = require('./middlewares/errorHandler')
const bodyParser = require('body-parser')
const path = require('path')
const helmet = require('helmet')
const rateLimiter = require('express-rate-limit')

require('dotenv').config()
require('./config/connection')

const PORT = process.env.PORT || 3001
const route = require('./routes/index')

app.use(cors(
    // {
    //     origin:true,
    //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
    //     allowedHeaders: ['Content-Type', 'Authorization'],
    // }
))

app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({limit:'50mb', extended:true, parameterLimit:50000}))
app.use(logger('dev'))
// app.use(helmet())
// app.use(helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       imgSrc: ["'self'", '*'],
//       scriptSrc: ["'self'", "https://checkout.razorpay.com"],
//       frameSrc: ["'self'", "https://api.razorpay.com"],
//       connectSrc: ["'self'", "https://lumberjack-cx.razorpay.com"]
//     }
//   }));

const apiLimiter = rateLimiter({
    windowMs: 30 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 100 requests per windowMs
    message: {message:'Too many requests from this IP, please try again later.'}
});

// app.use('/api', apiLimiter)
app.use('/api', route)

// app.use(express.static(path.join(__dirname, 'build')))
// app.get('*', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'build', 'index.html'))
// })

app.use((req, res)=>{
    res.status(404).json({success:false, message:`path doesnot exist ${req.url}`})
})
app.use(errorHandler)

app.listen(PORT, (err)=>{
    if(err) return console.log(`ERROR OCCURED WHILE STARTING THE SERVER ${err}`);
    console.log(`SERVER STARTED ON PORT ${PORT}`);
})