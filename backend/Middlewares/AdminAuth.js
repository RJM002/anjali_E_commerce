const jwt=require('jsonwebtoken');
const UserModal = require('../Models/User');


const ensureAdminAuthentication=async (req,res,next)=>{
    const auth=req.headers['authorization'];
    if(!auth){
        return res.status(403)
        .json({message:'Unauthorised, JWT token is require'})
    }
    
    try{        
        const decoded=jwt.verify(auth,process.env.JWT_SECRET);
        const user=await UserModal.findById(decoded._id);
        console.log("ROHIT CHECK UPPER AUTH",user.role)
        if(!user){
            return res.status(401).json({message:"user not found"})
        }
        if(user.role !='admin' && user.role !='superAdmin'){
            return res.status(403).json({message:"Unauthrized User is not admin or SuperAdmin"})
        }
        req.user=decoded;
        next()
    }catch(err){
        return res.status(403)
        .json({message:'Unauthorised, JWT token is worng or expired'})
    }
}

module.exports=ensureAdminAuthentication;