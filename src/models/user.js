
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email address" + value);
            }
        },
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
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
            if (!["male", "female", "other"].includes(value)) {
                throw new Error("Gender data is not valid");
            }
        },
    },
    skills: {
        type: [String],
    },
    photoUrl: {
        type: String,
    },
    about: {
        type: String,
    },
},
    {
        timestamps: true,
    });

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({ _id: user._id }, "@DevTinder17", {
         expiresIn: "7d",
         });

    return token;
};
userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isPasswordValid;
};
module.exports = mongoose.model("User", userSchema);