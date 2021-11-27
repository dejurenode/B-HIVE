const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/appError");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Admin Name is required"],
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
    passwords: {
        type: String,
    },
    color: {
        type: String,
        default: "#568cf7",
    },
    companyname: {
        type: String,
    },
    logo: {
        type: String,
    },
    colorbars: [{
        name: {
            type: String,
        },
        color: {
            type: String,
        },
    }, ],
    uniqueidentifierterm: {
        type: String,
    },
    unitnameterm: {
        type: String,
    },
    firstscanterm: {
        type: String,
    },
    datafield1: {
        type: String,
    },
    datafield2: {
        type: String,
    },
    datafield3: {
        type: String,
    },
    datafield4: {
        type: String,
    },
    phone: {
        type: String,
    },
    locations: [{
        name: { type: String },
        lat: { type: Number },
        lng: { type: Number },
        teams: [{ name: { type: String } }],
    }, ],

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
adminSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    if (this.password) {
        this.password = await bcrypt.hash(this.password, 12);
        this.passwordConfirm = undefined;
    }
    next();
});
adminSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};
adminSchema.pre(/^find/, function(next) {
    this.find({ active: { $ne: false } });
    next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;