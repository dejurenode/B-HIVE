const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/appError");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const recordSchema = new mongoose.Schema({
    field1: {
        type: String,
    },
    field2: {
        type: String,
    },
    field3: {
        type: String,
    },
    field4: {
        type: String,
    },
    photos: [{
        name: {
            type: String,
        },
        userid: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
    }, ],
    videos: [{
        name: {
            type: String,
        },
        userid: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
    }, ],
    audios: [{
        name: {
            type: String,
        },
        userid: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
    }, ],
    supplies: [{
        QR: {
            type: String,
        },
        name: {
            type: String,
        },
        userid: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
    }, ],
    Barcode: {
        type: String,
        default: "nocode",
    },
    BarcodeImage: {
        type: String,
        default: "nocode",
    },
    lock: {
        type: Number,
        enum: [0, 1],
        default: 0,
    },
    company: {
        type: mongoose.Schema.ObjectId,
        ref: "Admin",
    },
    supplyno: {
        type: Number,
        default: 0,
    },
    colorbar: {
        type: mongoose.Schema.ObjectId,
    },
    auditLogs: [{
        username: {
            type: String,
        },
        whatadd: {
            type: String,
        },
        ip: {
            type: String,
        },
        version: {
            type: String,
        },
        createdAt: {
            type: String,
            default: Date.now,
        },
    }, ],
    createdAt: {
        type: String,
        default: Date.now,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;