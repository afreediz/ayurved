const asyncErrorHandler = require("express-async-handler")
const CustomError = require('../utils/CustomError')
const twilio = require('twilio')
const smsClient = twilio(process.env.TWILIO_ACC_SID, process.env.TWILIO_AUTH_TOKEN)

const User = require('../models/user')

const getUser = asyncErrorHandler(async(req, res)=>{
    res.status(200).json({
        success:true,
        message:"Authorized",
        user:req.user
    })
})
const profile = asyncErrorHandler(async(req, res)=>{
    const id = req.user._id
    
    const user = await User.findById(id)
    
    res.status(200).json({
        success:true,
        message:"Profile",
        user
,    })
})
const updateProfile = asyncErrorHandler(async(req, res)=>{
    const id = req.user._id
    const {name, phone, address} = req.body
    
    const user = await User.findById(id).select('phone ph_verified');
    var ph_verified = user.ph_verified
    if (phone != user.phone) ph_verified = false
    const updated_user = await User.findByIdAndUpdate(id, {name, phone, address, ph_verified},{runValidators:true, new:true})
    
    res.status(200).json({
        success:true,
        message:"Profile updated",
        user:updated_user
    })
})
const deleteProfile = asyncErrorHandler(async(req, res)=>{
    const id = req.user._id

    const user = await User.findById(id)
    if(user.role == "admin") throw new CustomError("CUSTOM ERROR: Admin profile can't be deleted", 400)
    await User.deleteOne({_id:id})
    
    res.status(200).json({
        success:true,
        message:"User profile deleted successfully",
    })
})

const sendVerificationCode = asyncErrorHandler(async (req, res) => {
    const userId = req.user._id
    const user = await User.findById(userId)
    if(user.ph_verified) throw new CustomError("CUSTOM ERROR: Phone number is already verified", 400)
    const phoneNumber = user.phone
    smsClient.verify.v2.services(process.env.TWILIO_SERVICE_ID)
        .verifications.create({ 
            to: `+${phoneNumber}`, 
            channel: 'sms' })
        .then((verification)=>{ 
            res.json({ success: true, verification })
        })
        .catch((error)=>{
            throw new CustomError(error.message, 500)
        });
})

const verifyCode = asyncErrorHandler(async (req, res)=>{
    const userId = req.user._id
    const {code} = req.body
    const user = await User.findById(userId)
    const phoneNumber = user.phone
    try{
        smsClient.verify.v2.services(process.env.TWILIO_SERVICE_ID)
        .verificationChecks.create({ to: `+${phoneNumber}`, code })
        .then((verification_check) => {
            if (verification_check.status === 'approved') {
                user.ph_verified = true
                user.save()
                res.json({ success: true, message:"Verification Successfull" });
            } else {
                res.status(400).json({ success: false, message: 'Invalid code' });
            }
        })
        .catch((error) => {
            res.status(500).json({ success: false, message:"Code expired, Please resend the code and try again" })
        });
    }catch(error){
        console.log(error);
        res.status(500).json({ success: false, message:"Something went wrong, please try again later" })
    }

})




const deleteUser = asyncErrorHandler(async(req, res)=>{
    const id = req.params.id

    const user = await User.findById(id)
    if(user.role == "admin") throw new CustomError("CUSTOM ERROR: Admin profile can't be deleted", 400)
    await User.deleteOne({_id:id})
    
    res.status(200).json({
        success:true,
        message:"User deleted successfully",
    })
})
const userStatus = asyncErrorHandler(async(req, res)=>{
    const { id } = req.params
    const { status } = req.body

    const user = await User.findByIdAndUpdate(id, {status}, {new:true, runValidators:true})

    res.status(200).json({
        success:true,
        message:"User updated succesfully",
        user
    })
})

// admin operations
const getAdmin = asyncErrorHandler(async(req, res)=>{
    res.status(200).json({
        success:true,
        message:"Authorized",
        authorized:true
    })
})
const getUserForAdmin = asyncErrorHandler(async(req, res)=>{
    const email = req.params.email
    const user = await User.findOne({email})
    res.status(200).json({
        success:true,
        message:"User",
        user
    })
})
const getAllUsers = asyncErrorHandler(async(req, res)=>{
    const users = await User.find({}).sort({createdAt:-1})
    res.status(200).json({
        success:true,
        message:"All users",
        users
    })
})
const dashboardDetails = asyncErrorHandler(async(req, res)=>{
    const users_count = await User.estimatedDocumentCount()
    const users = await User.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                number_of_users: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
                day: "$_id",
                number_of_users: 1
            }
        },
        {
            $sort: { day: 1 }
        },
        {
            $limit: 20
        }
    ]);
    res.status(200).json({
        success:true,
        message:"Dashboard details",
        users_count,
        users
    })
})



module.exports = { getUser, 
    getAdmin, 
    profile, 
    updateProfile, 
    deleteProfile, 
    getAllUsers, 
    userStatus, 
    deleteUser, 
    dashboardDetails, 
    getUserForAdmin,
    sendVerificationCode,
    verifyCode }