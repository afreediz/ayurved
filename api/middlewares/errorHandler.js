module.exports = (err, req, res, next)=> {
    if (err.message && err.message.startsWith("CUSTOM ERROR: ")) {
        return res.status(400).json({
            success: false,
            message: err.message.replace("CUSTOM ERROR: ", "")
        })
    }else{
        switch(err.name){
            case "SyntaxError":
                err.message = "Unexpected syntax"
                break
            case "CastError":
                err.message = "Please provide a valid id"
                break
            case "TokenExpiredError":
                err.message = "Session expired. Please signin again"
                break
            case "JsonWebTokenError":
                err.message = "Signin required"
                break
            default:
                err.message = "Internal server error"    
                
                if(err.code == 11000){
                    err.message = "Duplicate Field Value Enter"
                }
                break
        }
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}