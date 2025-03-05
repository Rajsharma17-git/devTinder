
const express= require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());


app.post("/signup", async (req, res) => {
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

//login 
app.post("/login", async (req, res) => {
   try {
    const{emailId, password} = req.body;
    const user = await User.findOne({ emailId: emailId });
    if(!user) {
        throw new Error("invalid ");
    }
    const isPasswordValid  = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
        //create jwt token
        const token = await jwt.sign({ _id: user._id}, "@DevTinder17", {expiresIn: "1d" })
        
        
        //add token to cookie
        res.cookie("token", token, {
            expires: new Date(Date.now() +8 * 3600000),
        });
        res.send("Login Successfully!!!");
    } else {
        throw new Error("invalid");
    }
}catch (err){
    res.status(400).send("ERROR : " + err.message);
}  
});

app.get("/profile", userAuth, async (req, res) => {
    try {

    const user = req.user;

    res.send(user);
    }
    catch (err){
        res.status(400).send("ERROR : " + err.message);
    }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;
    //sending a connection request
    console.log("Sending a connection request");

    res.send(user.firstName + "send Connection Request!!");
});

connectDB()
.then(() => {
    console.log("Database is connected....");
    app.listen(7777, () => {
        console.log("server is successfully listening on port 7777...");
    });
})
.catch((err) => {
    console.error("Database is not connected...");
})





