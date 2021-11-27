const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/appError");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "first Name is required"],
    },
    phone: {
        type: String,
    },
    lastname: {
        type: String,
        required: [true, "last Name is required"],
    },
    passwords: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Please provide your Email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, " Please Provide a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please provide your Password"],
        select: false,
    },
    location: { type: mongoose.Schema.ObjectId, ref: "Role" },
    team: { type: mongoose.Schema.ObjectId },
    role: { type: mongoose.Schema.ObjectId, ref: "Role" },
    Company: { type: mongoose.Schema.ObjectId, ref: "Admin" },

    active: {
        type: Boolean,
        default: true,
        select: false,
    },
    joinedAt: {
        type: String,
        default: Date.now,
    },
    token: [{
        type: String,
    }, ],
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// for bcrypt the password
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    if (this.password) {
        this.password = await bcrypt.hash(this.password, 12);
        this.passwordConfirm = undefined;
    }
    next();
});
userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.pre(/^find/, function(next) {
    this.find({ active: { $ne: false } });
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;