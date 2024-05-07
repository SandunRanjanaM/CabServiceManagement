const userModel = require("../models/userModels.js");
const { genSalt, hash, compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register callback
const registerController = async(req,res) => {
    try{
        const existingUser = await userModel.findOne({email:req.body.email});
        if(existingUser){
            return res.status(200).send({message:'User Already Exists',success:false})
        }
        const password=req.body.password;
        const salt=await genSalt(10);
        const hashedPassword=await hash(password,salt);
        req.body.password=hashedPassword;
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({message:`Register Successfully`, success:true});
    }catch(error){
        console.log(error)
        res.status(500).send({success:false,message:`Register Controller ${error.message}`});
    };
};
//login callback
const loginController =async(req,res) => {
    try{
        const user = await userModel.findOne({email:req.body.email});
        if(!user){
            return res.status(200).send({message:'User Not Found',success:false})
        }
        const isMatch = await compare (req.body.password,user.password);
        if(!isMatch){
            return res.status(200).send({message:'Invalid Credentials',success:false})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        res.status(200).send({message:'Login Successfully',success:true,token});
    }catch(error){
        console.log(error)
        res.status(500).send({message:`Error in Login CTRL ${error.message}`});
    };
};
const authController = async(req,res) =>{
    try {
        const user = await userModel.findOne({_id:req.body.userID})
        if(!user){
            return res.status(200).send({
                message:"User Not Found",
                success:false
            })
        }else{
            res.status(200).send({
                success:true,
                data:{
                    name:user.name,
                    email:user.email,
                }
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"Error in Auth Controller",
            success:false,
             error
        })
    }; 
};


module.exports = { loginController, registerController, authController };