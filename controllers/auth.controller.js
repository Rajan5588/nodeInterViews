const userModel = require("../models/user.models");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")



 const register=async(req,res)=>{

try {
     
const {email,username,password}=req.body;

    const user=await userModel.findOne({email});
    if(user){
     return res.status(401).json("user allready exist");
    } 

    const hashPass=await  bcrypt.hash(password,10);

     const newuser=userModel.create({
          email,
          username,
          password:hashPass
     })

     
     const generateAccessToken=jwt.sign({id:newuser._id},"secure",{
          expiresIn:"1m"
     })


   
     const refressToken=jwt.sign(newuser._id,"refress",{
          expiresIn:"7d"
     })

res.cookie("refressToken",refressToken)

return res.status(201).json({message:"user Created successFully"})
        


} catch (error) {
     return res.status(401).json({message:"error"})
}


}


 const login =async(req,res)=>{
      try{
       const {email,password}=req.body
      
       const user=await userModel.findOne({email});
       if(!user){
          return res.json({message:"user does not exist"})
       }
       
      await bcrypt.compare(password, user.password,(error,result)=>{
          if(error){
               console.log("error",error)
               return
          }

       });

       const accessToken=jwt.sign({id:user._id},"secure",{
          expiresIn:"1m"
       })
       const refresToken=jwt.sign({id:user._id},"refres",{expiresIn:"7d"})
           res.cookie("refresToken", refresToken);
       return res.status(200).json({message:"user login successfully ",accessToken,refresToken});


          


      }catch(error){
return res.status(401).json({message:"error"})
      }
}
 const resfressToken=(req,res)=>{
      try{
          const {refresToken}=req.cookie;
      if(!refresToken){
     return res.status(401).json({message:"require refressToken"});

      }
    const decoded= jwt.verify(refresToken,"refres");
       if(!decoded){
          return res.json({message:"invalide refress token "})
       }
    
       const newAccessToken=jwt.sign({id:decoded},"secure",{expiresIn:"1m"})

   return res.json({accessToken:newAccessToken});
      }catch(err){
return res.status(401).json({message:"error"})
      }

}



module.exports={register,login,resfressToken};