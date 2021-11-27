const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/appError");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Role Name is required"],
    },
    create: {
        type: Boolean,
        default: false,
    },
    edit: {
        type: Boolean,
        default: false,
    },
    view: {
        type: Boolean,
        default: false,
    },
    Lock: {
        type: Boolean,
        default: false,
    },
    admin: { type: mongoose.Schema.ObjectId, ref: "Admin" },

    createdAt: {
        type: String,
        default: Date.now,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;