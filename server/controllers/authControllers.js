const User = require("../models/User")
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateToken = (userId) =>{
 return jwt.sign({id:userId},process.env.JWT_SEC,{expiresIn:"1d"})
}

const register = async (req, res) => {
    try {

        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return  res.status(400).json({ success: false, message: "All fields are required." })
        }

        const user = await User.findOne({email})

        if(user){
            return  res.status(400).json({ success: false, message: "User already exist." });
        }

        if(!validator.isEmail(email)){
            return  res.status(400).json({ success: false, message: "Please enter valid email address." });
        }
        
        if(!validator.isStrongPassword(password)){
            return  res.status(400).json({ success: false, message: "Please enter strong password." });
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = new User({
            name,
            email,
            password:hashedPassword
        })
        const savedUser = await newUser.save()

        const token = generateToken(savedUser._id)

        res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:1*24*60*60*1000
        }).status(200).json({
            success:true,
            message:"Account created.",
        })


    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." })
    }
}

const login = async (req, res) => {
    try {

        const {email,password} = req.body;

        if(!email || !password){
            return  res.status(400).json({ success: false, message: "All fields are required." })
        }

        const user = await User.findOne({email})

        if(!user){
            return  res.status(404).json({ success: false, message: "User not found." });
        }

      

        const validPassword = await bcrypt.compare(password,user.password)

        if(!validPassword){
            return  res.status(404).json({ success: false, message: "Wrong email or password." });
        }

        const token = generateToken(user._id)

        res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:1*24*60*60*1000
        }).status(200).json({
            success:true,
            message:`Welcome back ${user.name}`,
        })

    } catch (error) {
        res.status(500).json({ success: false, message: "Server error." })
    }
}

const logout = async(req,res) => {
    try{

        return  res.cookie('token','',{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:0
        }).status(200).json({
            success:true,
            message:"Logout Successfull.",
        })

    }catch(error){
        res.status(500).json({ success: false, message: "Server error." })
    }
}

const getUser = async(req,res) => {
    try{
        const user = await User.findById(req.id).select("-password")
        if(!user){
            res.status(404).json({ success: false, message: "User not found." })
        }
       
        res.status(200).json({
            success:true,
            message:"User found.",
            user
        })

    }catch(error){
        res.status(500).json({ success: false, message: "Server error." })
    }
}

module.exports = {
    register,
    login,
    logout,
    getUser
}