const jwt=require('jsonwebtoken')


const ensureAuthentication=(req,res,next)=>{
    const auth=req.headers['authorization'];
    if(!auth){
        return res.status(403)
        .json({message:'Unauthorised, JWT token is require'})
    }
    
    try{        
        const decoded=jwt.verify(auth,process.env.JWT_SECRET);
        req.user=decoded;
        console.log("ROHIT AUTH CHECK",req.user)
        next()
    }catch(err){
        return res.status(403)
        .json({message:'Unauthorised, JWT token is worng or expired'})
    }
}

module.exports=ensureAuthentication;