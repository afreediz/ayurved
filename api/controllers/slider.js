const asyncErrorHandler = require('express-async-handler')
const CustomError = require('../utils/CustomError')
const {uploadImage, deleteImage} = require('../helpers/image')
const Slider = require('../models/slider')

const getSliders = asyncErrorHandler(async (req, res)=>{
    const sliders = await Slider.find({})
    res.status(200).json({
        success:true,
        sliders:sliders
    })
})

const createSlider = asyncErrorHandler(async (req, res)=>{
    const { name, url, image } = req.body

    const result = await uploadImage(image)

    console.log('r',result);
    

    const slider = await Slider({
        name:name,
        url: url,
        image:result.url
    }).save()

    res.status(200).json({
        success:true,
        slider
    })
})

const deleteSlider = asyncErrorHandler(async (req, res)=>{
    const { id } = req.params

    const slider = await Slider.findById(id).select('image')

    await deleteImage(slider.image)

    await Slider.deleteOne({_id:id})

    res.status(200).json({
        success:true
    })
})

module.exports = {
    getSliders,
    createSlider,
    deleteSlider
}