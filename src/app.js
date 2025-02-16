
const express= require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());


app.post("/signup", async (req, res) => {
    const user = new User(req.body);
try {
    await user.save();
    res.send("User added successfully!");
} catch (err){
    res.status(400).send("Error in saving user" + err.message);
}  
});

// get user by email
app.get("/user", async(req, res) => {
    const userEmail = req.body.emailId;
    try{
        const users = await User.find({ emailId: userEmail });
        if(users.length === 0) {
            res.status(404).send("user not found");
        }else {
            res.send(users);
        }
    } catch(err) {
        res.status(400).send("something went wrong");
    }
});

//feed
app.get("/feed", async(req, res) => {
    try{
        const users = await User.find({});
        res.send(users);
    }catch(err) {
        res.status(400).send("something went wrong");
    }
});

//delete
app.delete("/user",async (req, res) => {
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("user deleted successfully");
    }catch(err) {
        res.status(400).send("something went wrong");
    }
});

//update
app.patch("/user", async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;
    try{
        await User.findByIdAndUpdate({ _id: userId}, data);
        runValidators: true,
        res.send("user updated successfully");
    } catch(err) {
        res.status(400).send("something went wrong");
    }
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





