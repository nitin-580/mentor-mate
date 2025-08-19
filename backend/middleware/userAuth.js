import jwt from 'jsonwebtoken';

const userAuth = async (req, res , next)=>{

    const {token} = req.cookies;

    if(!token){
         return res.json({success:false, message:'not authorised login again'});
    }

    try {

        const tokenDecode = jwt.verify(token , process.env.JWT_SECRET);

        if(tokenDecode){
            // req.body.userId = tokenDecode.id;
            req.user = { id: tokenDecode.id };

        }else{
             return res.json({success:false, message:'not authrised login again'})
        }

        next();
        
    } catch (error) {
         return res.json({success:false, message:error.message})
    }

}

export default userAuth;