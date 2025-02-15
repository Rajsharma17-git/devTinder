const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://sharmaraj172005:acy6wVPviCM8Gskn@cluster0.vx3wf.mongodb.net/devTinder" //acy6wVPviCM8Gskn
    );
};

module.exports = connectDB;



