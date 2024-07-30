module.exports = (err, req, res, next)=> {
    console.log(err);
    if(err.code == 11000){
        err.message = "Duplicate Field Value Enter"
    }
    switch(err.name){
        case "SyntaxError":
            err.message = "Unexpected syntax"
        case "CastError":
            err.message = "Please provide a valid id"
        case "TokenExpiredError":
            err.message = "Session expired. Please signin again"
        case "JsonWebTokenError":
            err.message = "Signin required"
        default:
    }
    if (err.message && err.message.startsWith("CUSTOM ERROR: ")) {
        return res.status(400).json({
            success: false,
            message: err.message.replace("CUSTOM ERROR: ", "")
        })
    }else{
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}