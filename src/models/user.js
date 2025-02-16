
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String
    },
    emailId : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type : String,
        required : true,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "other"].includes(value)) {
                throw new Error("Gender data is not valid");
            }
        },
    },
    skills: {
        type: [String],
    },

},
{
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);