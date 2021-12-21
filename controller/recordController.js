const Record = require("../model/recordModel");
const Admin = require("../model/adminModel");
const QRCODE = require("qrcode");
const path = require("path");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const multer = require("multer");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Email = require("../utils/email");
var barcode = require("barcode");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new AppError("Not an image! Please upload only images.", 400), false);
    }
};
let tokens = "";
const QRcodeGenerate2 = catchAsync(async(text, record, body) => {
    // const qr = await QRCODE.toString(text, { type: "terminal" });
    const ObjectId = mongoose.Types.ObjectId;
    let userid = body.userid;
    let supplyno = Number(body.supplyno) + 1;

    console.log(body);
    body.userid = undefined;
    body.supplyno = undefined;
    const qr = await QRCODE.toFile(
        `./public/img/QRCODES/${record._id}${supplyno}.png`,
        text
    );

    if (body.supply) {
        let obj = {
            QR: `/img/QRCODES/${record._id}${supplyno}.png`,
            userid,
        };
        console.log(obj);
        record.supplies.push(obj);
    }
    record.supplyno = supplyno;
    // console.log(body);
    await record.save();
});
const QRcodeGenerate = catchAsync(async(text, id, body) => {
    // const qr = await QRCODE.toString(text, { type: "terminal" });
    const ObjectId = mongoose.Types.ObjectId;
    let userid = body.userid;
    console.log(body);
    body.userid = undefined;
    // const qr = await QRCODE.toFile(`./public/img/QRCODES/${id}.png`, text);
    const record = await Record.findById(id);
    // record.Qrcode = `/img/QRCODES/${id}.png`;
    if (body.image) {
        let obj = {
            name: `/img/records/${body.image}`,
            userid,
        };
        console.log(obj);
        record.photos.push(obj);
        record.company = body.company;
    } else {
        let obj = {
            name: `/img/records/${body.video}`,
            userid,
        };
        record.videos.push(obj);
        record.company = body.company;
    }
    // console.log(body);
    await record.save();
});
const multerStorageUser2 = multer.diskStorage({
    destination: "public/img/records/", // Destination to store video
    filename: (req, file, next) => {
        console.log("hi");
        if (file.fieldname === "video") {
            next(null, file.fieldname + "_" + Date.now() + ".mp4");
        } else if (file.fieldname === "image") {
            next(null, file.fieldname + "_" + Date.now() + ".jpg");
        } else if (file.fieldname === "audio") {
            next(null, file.fieldname + "_" + Date.now() + ".mp3");
        }
    },
});
const multerStorageUser = multer.diskStorage({
    destination: "public/img/records/", // Destination to store video
    filename: (req, file, next) => {
        console.log("hi");
        if (file.fieldname === "video") {
            next(null, file.fieldname + "_" + Date.now() + ".mp4");
        } else if (file.fieldname === "image") {
            next(null, file.fieldname + "_" + Date.now() + ".jpg");
        }
    },
});
const multerStorageUser9 = multer.diskStorage({
    destination: "public/img/records/", // Destination to store video
    filename: (req, file, next) => {
        console.log("hi");
        if (file.fieldname === "Image") {
            next(null, file.fieldname + "_" + Date.now() + ".jpg");
        } else {
            next();
        }
    },
});
const uploadsUser = multer({
    storage: multerStorageUser,
});
const uploadsUser2 = multer({
    storage: multerStorageUser2,
});
const uploadsUser9 = multer({
    storage: multerStorageUser9,
});
exports.uploadFieldsUser2 = uploadsUser2.fields([
    { name: "video", maxCount: 1 },
    { name: "image", maxCount: 1 },
    { name: "audio", maxCount: 1 },
]);
exports.uploadFieldsUser9 = uploadsUser9.fields([
    { name: "Image", maxCount: 1 },
]);
exports.uploadFieldsUser = uploadsUser.fields([
    { name: "video", maxCount: 1 },
    { name: "image", maxCount: 1 },
]);
var fieldss = async(req, number, fieldname) => {
    let record = await Record.findById(req.params.id);
    let admin = await Admin.findById(req.user.Company);
    let val = admin[`datafield${number}`];
    console.log(val);
    let obj = {
        username: req.user.name,
        whatadd: `${val} here ${fieldname}`,
        ip: req.params.ip,
        version: req.params.version,
    };
    record.auditLogs.push(obj);
    await record.save();
};
exports.addBarcode = catchAsync(async(req, res, next) => {
    let record = await Record.findById(req.params.id);
    let checks = await Record.find({ Barcode: req.body.Barcode });
    if (checks.length > 0) {
        res.status(200).json({
            status: "success",
            message: "Record already exist on this barcode.",
            record: checks[0],
        });
    } else {
        record.BarcodeImage = req.body.BarcodeImage;
        record.Barcode = req.body.Barcode;
        let obj = {
            username: req.user.name,
            whatadd: "Barcode",
            ip: req.params.ip,
            version: req.params.version,
        };
        record.auditLogs.push(obj);
        await record.save();
        res.status(200).json({
            status: "success",
            message: "Barcode Updated.",
            record,
        });
    }
});

exports.recordbyid = catchAsync(async(req, res, next) => {
    let record = await Record.findById(req.params.id);
    if (!record) {
        return next(new AppError("Image not available", 400));
    } else {
        res.status(200).json({
            status: "success",
            data: record,
        });
    }
});
exports.record = catchAsync(async(req, res, next) => {
    let record = await Record.find({ Barcode: req.params.id });

    console.log(record);
    if (record.length < 1) {
        let record = await Record.create({});

        record.BarcodeImage = req.body.BarcodeImage;
        record.Barcode = req.params.id;
        let obj = {
            username: req.user.name,
            whatadd: `Barcode here /img/records/${record.BarcodeImage}`,
            ip: req.params.ip,
            version: req.params.version,
        };
        record.auditLogs.push(obj);

        record.company = req.body.company;
        await record.save();

        res.status(200).json({
            status: "success",
            data: record._id,
        });
    } else {
        res.status(200).json({
            status: "success",
            data: record[0]._id,
        });
    }
});

exports.record2 = catchAsync(async(req, res, next) => {
    let record = await Record.find({ Barcode: req.params.id });

    console.log(record);
    if (record.length < 1) {
        return next(new AppError("Record not found", 400));
    } else {
        res.status(200).json({
            status: "success",
            data: record[0]._id,
        });
    }
});
exports.companyrecords = catchAsync(async(req, res, next) => {
    const ObjectId = mongoose.Types.ObjectId;
    let records = await Record.aggregate([{
            $match: { company: ObjectId(req.params.companyid) },
        },
        {
            $project: {
                field1: 1,
                field2: 1,
                field3: 1,
                field4: 1,
                Barcode: 1,
                BarcodeImage: 1,
            },
        },
    ]);
    let admin = await Admin.findById(req.params.companyid);

    res.status(200).json({
        status: "success",
        uniqueidentifierterm: admin.uniqueidentifierterm,
        data: records,
    });
});
exports.mergerecord = catchAsync(async(req, res, next) => {
    console.log(req.params.id, req.params.toid);
    let record = await Record.findById(req.params.id);
    let record2 = await Record.findById(req.params.toid);
    let photos = [];
    let videos = [];
    let audios = [];
    let supplies = [];
    let auditLogs = [];
    // FOR photos
    record.photos.filter((item) => {
        console.log(item);
        let abc = item;
        photos.push(abc);
    });
    record2.photos.filter((item) => {
        console.log(item);
        let abc = item;
        photos.push(abc);
    });
    record2.photos = photos;
    // FOR photos
    // FOR videos
    record.videos.filter((item) => {
        console.log(item);
        let abc = item;
        videos.push(abc);
    });
    record2.videos.filter((item) => {
        console.log(item);
        let abc = item;
        videos.push(abc);
    });
    record2.videos = videos;
    // FOR videos
    // FOR audios
    record.audios.filter((item) => {
        console.log(item);
        let abc = item;
        audios.push(abc);
    });
    record2.audios.filter((item) => {
        console.log(item);
        let abc = item;
        audios.push(abc);
    });
    record2.audios = audios;
    // FOR audios

    // FOR supplies
    record.supplies.filter((item) => {
        console.log(item);
        let abc = item;
        supplies.push(abc);
    });
    record2.supplies.filter((item) => {
        console.log(item);
        let abc = item;
        supplies.push(abc);
    });
    record2.supplies = supplies;
    // FOR supplies

    // FOR supplies
    record.auditLogs.filter((item) => {
        console.log(item);
        let abc = item;
        auditLogs.push(abc);
    });
    record2.auditLogs.filter((item) => {
        console.log(item);
        let abc = item;
        auditLogs.push(abc);
    });
    record2.auditLogs = auditLogs;
    // FOR supplies

    await record2.save();
    await record.remove();

    // record.photos;
    console.log(photos);
    res.status(200).json({
        status: "success",
        message: "Merged Successfully",
    });
});
exports.lockrecord = catchAsync(async(req, res, next) => {
    let okha = "";
    let record = await Record.findById(req.params.id);
    if (record.lock === 0) {
        record.lock = 1;
    } else {
        record.lock = 0;
    }
    let obj = {
        username: req.user.name,
        whatadd: "Lock Record",
        ip: req.params.ip,
        version: req.params.version,
    };
    record.auditLogs.push(obj);

    await record.save();
    res.status(200).json({
        status: "success",
        data: record,
    });
});
exports.deleterecord = catchAsync(async(req, res, next) => {
    if (req.body.image) {
        let okha = "";
        let record = await Record.findById(req.params.id);
        let deliphoto = ''
        record.photos = record.photos.filter((item) => {
            if (String(item._id) === String(req.body.image)) {
                okha = true;
                deliphoto = item.name;
                return false;
            } else {
                return true;
            }
        });
        if (okha != true) {
            return next(new AppError("Image not available", 400));
        }
        let obj = {
            username: req.user.name,
            whatadd: `delete image here ${deliphoto}`,
            ip: req.params.ip,
            version: req.params.version,
        };
        record.auditLogs.push(obj);

        await record.save();
        res.status(200).json({
            status: "success",
            data: record.photos,
        });
    } else if (req.body.video) {
        let okha = "";
        let record = await Record.findById(req.params.id);
        let delivideo = '';
        record.videos = record.videos.filter((item) => {
            if (String(item._id) === String(req.body.video)) {
                okha = true;
                delivideo = item.name;
                return false;
            } else {
                return true;
            }
        });
        if (okha != true) {
            return next(new AppError("Video not available", 400));
        }
        let obj = {
            username: req.user.name,
            whatadd: `delete video here ${delivideo}`,
            ip: req.params.ip,
            version: req.params.version,
        };
        record.auditLogs.push(obj);

        await record.save();
        res.status(200).json({
            status: "success",
            data: record.videos,
        });
    } else if (req.body.audio) {
        let okha = "";
        let record = await Record.findById(req.params.id);
        let deliaudio = '';
        record.audios = record.audios.filter((item) => {
            if (String(item._id) === String(req.body.audio)) {
                okha = true;
                deliaudio = item.name;
                return false;
            } else {
                return true;
            }
        });
        if (okha != true) {
            return next(new AppError("Audio not available", 400));
        }
        let obj = {
            username: req.user.name,
            whatadd: `delete audio here ${deliaudio}`,
            ip: req.params.ip,
            version: req.params.version,
        };
        record.auditLogs.push(obj);

        await record.save();
        res.status(200).json({
            status: "success",
            data: record.audios,
        });
    } else if (req.body.supplies) {
        let okha = "";
        let record = await Record.findById(req.params.id);
        let delisupplies = ''
        record.supplies = record.supplies.filter((item) => {
            if (String(item._id) === String(req.body.supplies)) {
                okha = true;
                delisupplies = item.QR;
                return false;
            } else {
                return true;
            }
        });
        if (okha != true) {
            return next(new AppError("Video not available", 400));
        }
        let obj = {
            username: req.user.name,
            whatadd: `delete supplies here ${delisupplies}`,
            ip: req.params.ip,
            version: req.params.version,
        };
        record.auditLogs.push(obj);

        await record.save();
        res.status(200).json({
            status: "success",
            data: record.supplies,
        });
    }
});
exports.checkAccount = catchAsync(async(req, res, next) => {
    let record = await Record.aggregate([{
        $match: { email: req.params.email }
    }]);
    if (record.length > 0) {
        res.status(200).json({
            status: "success",
            recordid: record[0]._id,
        });
    } else {
        return next(new AppError('record not found on this Email', 400));
    }
})
exports.getit = catchAsync(async(req, res, next) => {
    let record = await Record.findById(req.params.id);
    let admin = await Admin.findById(record.company);

    res.status(200).json({
        status: "success",
        fileldsname: {
            field1name: admin.datafield1,
            field2name: admin.datafield2,
            field3name: admin.datafield3,
            field4name: admin.datafield4,
        },
        data: record,
    })
})
exports.logouts = catchAsync(async(req, res) => {
    let abc = await Record.findById(req.user.id);

    let ali = abc.token.filter((item) => {
        if (String(item) == String(req.headers.jwt)) {
            return false;
        }
        return true;
    });
    abc.token = ali;

    const dele = await abc.save({ validateBeforeSave: false });
    console.log(dele);
    res
        .status(200)
        .json({ status: "success", message: `logout successfully !` });
});
exports.changePasswordss = catchAsync(async(req, res, next) => {
    const user = await Record.findById(req.user.id).select("+password");
    console.log(user);
    if (!user) {
        return next(new AppError("No Record Found With That Id", 404));
    }
    if (req.body.password && req.body.passwordCurrent) {
        console.log("hi");
        if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
            return next(new AppError("Your Current Password Is Wrong", 401));
        }
        req.body.passwords = req.body.password;
        req.body.password = await bcrypt.hash(req.body.password, 12);
    } else {
        return next(new AppError("Password or confirm password is missing!", 404));
    }
    const userr = await Record.findByIdAndUpdate(req.user.id, req.body).select(
        "+password"
    );
    res.status(200).json({
        status: "success",
        data: userr,
    });
})
exports.changepassword = catchAsync(async(req, res, next) => {
    req.body.password = await bcrypt.hash(req.body.password, 12)
    let record = await Record.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    createSendToken(record, 200, req, res);
})
exports.updaterecord = catchAsync(async(req, res, next) => {
    if (req.body.field1) {
        fieldss(req, 1, req.body.field1);
    }
    if (req.body.field2) {
        fieldss(req, 2, req.body.field2);
    }
    if (req.body.field3) {
        fieldss(req, 3, req.body.field3);
    }
    if (req.body.field4) {
        fieldss(req, 4, req.body.field4);
    }

    if (req.files.image) {
        req.body.image = req.files.image[0].filename;
        let record = await Record.findById(req.params.id);
        let obj = {
            username: req.user.name,
            whatadd: `image here /img/records/${req.body.image}`,
            ip: req.params.ip,
            version: req.params.version,
        };
        record.auditLogs.push(obj);
        let obj2 = {
            name: `/img/records/${req.body.image}`,
            userid: req.user.id,
        };
        console.log(obj2);
        record.photos.push(obj2);
        await record.save();
    }
    if (req.files.video) {
        let record = await Record.findById(req.params.id);
        req.body.video = req.files.video[0].filename;
        let obj = {
            username: req.user.name,
            whatadd: `video here /img/records/${req.body.video}`,
            ip: req.params.ip,
            version: req.params.version,
        };
        record.auditLogs.push(obj);
        let obj2 = {
            name: `/img/records/${req.body.video}`,
            userid: req.user.id,
        };
        console.log(obj2);
        record.videos.push(obj2);
        await record.save();
    }
    if (req.files.audio) {
        let record = await Record.findById(req.params.id);
        req.body.audio = req.files.audio[0].filename;
        let obj = {
            username: req.user.name,
            whatadd: `audio here /img/records/${req.body.audio}`,
            ip: req.params.ip,
            version: req.params.version,
        };
        record.auditLogs.push(obj);
        let obj2 = {
            name: `/img/records/${req.body.audio}`,
            userid: req.user.id,
        };
        console.log(obj2);
        record.audios.push(obj2);
        await record.save();
    }
    if (req.body.supply) {
        let record = await Record.findById(req.params.id);
        req.body.userid = req.user.id;
        req.body.supplyno = record.supplyno;
        let obj = {
            username: req.user.name,
            whatadd: `supplies here ${req.body.supply}`,
            ip: req.params.ip,
            version: req.params.version,
        };
        record.auditLogs.push(obj);
        let objss = {
            QR: req.body.supply,
            userid: req.user.id,
        };
        record.supplies.push(objss);

        await record.save();
        // QRcodeGenerate2(JSON.stringify(req.body.supply), record, req.body);
    }
    if (req.body.supplyname) {
        let record = await Record.findById(req.params.id);
        let obj = {
            name: req.body.supplyname,
        };
        record.supplies.push(obj);
        let obj2 = {
            username: req.user.name,
            whatadd: `supplies here ${req.body.supplyname}`,
            ip: req.params.ip,
            version: req.params.version,
        };
        record.auditLogs.push(obj2);
        await record.save();
    }
    if (req.body.colorbar) {
        const ObjectId = mongoose.Types.ObjectId;
        console.log(req.body);

        let record2 = await Record.findById(req.params.id);
        record2.colorbar = ObjectId(req.body.colorbar);
        // let record = await Record.findById(req.params.id);

        // console.log(record2.company);
        // let admin = 
        let obj2 = {
            username: req.user.name,
            whatadd: `ColorBar here ${req.body.colorbarcolor}`,
            ip: req.params.ip,
            version: req.params.version,
        };
        record2.auditLogs.push(obj2);
        await record2.save();
    }
    if (req.body.email) {
        let record2 = await Record.findById(req.params.id);
        let obj2 = {
            username: req.user.name,
            whatadd: `Email`,
            ip: req.params.ip,
            version: req.params.version,
        };
        record2.auditLogs.push(obj2);
        await record2.save();
    }

    let record = await Record.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.status(200).json({
        status: "success",
        data: record,
    });
});
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const createSendToken = async(user, statusCode, req, res) => {
    let token = signToken(user._id);
    tokens = token;
    const countToken = user.token.filter((item) => {
        if (item == token) {
            return true;
        }
    });
    if (countToken.length > 0) {} else {
        user.token.push(token);
    }
    let ons = "";
    if (user.locationss) {
        ons = user.locationss;
    }

    await user.save({ validateBeforeSave: false });
    // user.token = undefined;
    if (user.password) user.password = undefined;
    console.log(ons);
    if (typeof ons === "object") {
        res.status(statusCode).json({
            status: "success",
            token: tokens,
            locationname: ons.name,
            data: {
                user,
            },
        });
    } else {
        res.status(statusCode).json({
            status: "success",
            token: tokens,
            data: {
                user,
            },
        });
    }
};
exports.login = catchAsync(async(req, res, next) => {
    const ObjectId = mongoose.Types.ObjectId;

    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError("please provide email and password!", 400));
    }

    const user = await Record.findOne({ email }).select("+password");
    // if (!user || !(await user.correctPassword(password, user.password))) {
    //     return next(new AppError("Incorrect email or password!", 401));
    // }
    if (!user) {
        return next(new AppError("Incorrect email. Contact your Administrator", 400));
    }
    if (!(await user.correctPassword(password, user.password))) {
        return next(new AppError("Incorrect password. Please retry", 400));
    }

    createSendToken(user, 200, req, res);
})
exports.addrecord = catchAsync(async(req, res, next) => {
    console.log(req.body);
    let record = await Record.create({});
    if (req.files.image) {
        let obj = {
            username: req.user.name,
            whatadd: `image here /img/records/${req.files.image[0].filename}`,
            ip: req.params.ip,
            version: req.params.version,
        };
        record.auditLogs.push(obj);
        await record.save();
        req.body.image = req.files.image[0].filename;
    } else {
        let obj = {
            username: req.user.name,
            whatadd: `video here /img/records/${req.files.image[0].filename}`,
            ip: req.params.ip,
            version: req.params.version,
        };
        record.auditLogs.push(obj);
        await record.save();
        req.body.video = req.files.video[0].filename;
    }
    if (req.body.video) {
        // console.log(req.files["video"][0].filename);
        console.log("hahahahah");
        req.body.video = req.files["video"][0].filename;
    } else {
        // console.log(req.files["image"][0].filename);
        req.body.image = req.files["image"][0].filename;
    }
    const qrData = {
        RecordId: record._id,
        Bhive: "bhive",
    };
    console.log(req.user.id);
    req.body.userid = req.user.id;
    console.log(req.body);
    QRcodeGenerate(JSON.stringify(qrData), record._id, req.body);
    res.status(200).json({
        status: "success",
        data: record._id,
    });
});

exports.checkHeader = catchAsync(async(req, res, next) => {
    req.headers["jwt"] = tokens;
    next();
});