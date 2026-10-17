
const reqRole=(...roles)=>{
    return (req,res,next)=>{
        if(!req.user){
            return res.status(404).json({
                success:false,
                message:"Authentication Required"
            })
        }

        if(!roles.includes(res.user.roles)){
            return res.status(404).json({
                success:false,
                message:"You do not have the access for this page"
            })
        }
        next();
    }
}

export default reqRole;