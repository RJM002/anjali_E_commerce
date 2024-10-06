const joi=require('joi');

const signupValidation=(req,res,next)=>{
    const schema=joi.object({
        name:joi.string().min(3).max(50).required(),
        email:joi.string().email({ tlds: { allow: false } }).required(),
        password:joi.string().min(7).max(50).required()
    })


    const {error}=schema.validate(req.body);

    if(error){
        return res.status(400)
            .json({message:"Bad Request",error})
    }
    next();
}


const loginValidation=(req,res,next)=>{
    const schema=joi.object({
        email:joi.string().email({ tlds: { allow: false } }).required(),
        password:joi.string().min(7).max(50)
    })

    const {error}=schema.validate(req.body);

    if(error){
        return res.status(400)
            .json({message:"Bad Request",error})
    }
    next();
}

module.exports={
    signupValidation,
    loginValidation
}
