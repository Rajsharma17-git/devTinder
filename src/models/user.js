
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String
    },
    emailId : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid Email address" + value);
            }
        },
    },
    password: {
        type : String,
        required : true,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error("Enter a stronge passwaord" + value);
            }
        },
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
    photoUrl: {
        type: String,
       // default: "/home/shree/Downloads/149071.png ",
        //validate(value) {
           // if(!validator.isURL(value)) {
             //   throw new Error("Invalid photo url" + value);
           // }
       // },
    },

},
{
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);