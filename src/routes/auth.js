const express = require("express");
const {validateSignUpData} = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");  

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    //validator
    try {
    validateSignUpData(req);
    // ENcrpyt password
    
    const { firstName,lastName, emailId, password} = req.body;
    
    const passwordHash = await bcrypt.hash(password, 10);
    
    
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });
    
        await user.save();
        res.send("User added successfully!");
    } catch (err){
        res.status(400).send("ERROR : " + err.message);
    }  
    });

authRouter.post("/login", async (req, res) => {
   try {
    const{emailId, password} = req.body;

    const user = await User.findOne({ emailId: emailId });
    if(!user) {
        throw new Error("invalid creadit ");
    }
    const isPasswordValid  = await user.validatePassword(password);
    if (isPasswordValid) {
        const token = await user.getJWT();    

        res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000),
        });
        res.send("Login Successfully!!!");
    } else {
        throw new Error("invalid Login");
    }
}catch (err){
    res.status(400).send("ERROR : " + err.message);
}  
});

module.exports = authRouter;