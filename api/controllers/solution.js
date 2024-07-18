const asyncErrorHandler = require("express-async-handler")
const CustomError = require('../utils/CustomError')
const slugify = require('slugify')
const Solution = require('../models/solution')

const getSolutions = asyncErrorHandler(async(req, res)=>{
    const { slug } = req.params
    const solution = await Solution.findOne({slug})

    res.status(200).json({
        success:true,
        message:"Category",
        solution
    })
})
const getAllSolutions = asyncErrorHandler(async(req, res)=>{
    const solutions = await Solution.find({})
    res.status(200).json({
        success:true,
        message:"All solutions",
        solutions
    })
})
const createSolutions = asyncErrorHandler(async(req, res)=>{
    const { name } = req.body
    if(!name) throw new CustomError("Necessary details are not filled", 404)

    const isExist = await Solution.findOne({name})
    if(isExist) throw new CustomError("Category already exist, please choose a different name", 400)

    const solution = await new Solution({
        name:name,
        slug:slugify(name)
    }).save()
    
    res.status(200).json({
        success:true,
        message:"Solution added successfully",
        solution
    })
})
const updateSolutions = asyncErrorHandler(async(req, res)=>{
    const { id } = req.params
    const { name } = req.body
    if(!name) throw new CustomError("new name must be specified to update category", 400)

    const solution = await Solution.findByIdAndUpdate(id, {$set:{name, slug:slugify(name)}},{new:true})

    res.status(200).json({
        success:true,
        message:"Updated successfully",
        solution
    })
})
const deleteSolutions = asyncErrorHandler(async(req, res)=>{
    const { id } = req.params

    await Solution.deleteOne({_id:id})

    res.status(200).json({
        success:true,
        message:"Catergory deleted successfully"
    })
})

module.exports = {
    getSolutions,
    getAllSolutions,
    createSolutions,
    updateSolutions,
    deleteSolutions
}