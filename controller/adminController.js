const Admin = require("../model/adminModel");
const Role = require("../model/rolesModel");
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const multer = require("multer");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const multerStorage = multer.memoryStorage();
const Email = require("../utils/email");
let tokens = "";

const multerStorageUser = multer.diskStorage({
    destination: "public/img/admins/", // Destination to store video
    filename: (req, file, next) => {
        if (file.fieldname === "logo") {
            next(null, file.fieldname + "_" + Date.now() + ".jpg");
        } else {
            next();
        }
    },
});
const uploadsUser = multer({
    storage: multerStorageUser,
});

exports.uploadFieldsUser = uploadsUser.fields([{ name: "logo", maxCount: 1 }]);

exports.logout = async(req, res) => {
    res.cookie("jwt", "loggedout", {
        expires: new Date(Date.now() + 2 * 1000),
        httpOnly: true,
    });
    res.status(200).json({ status: "success" });
};

exports.logouts = catchAsync(async(req, res) => {
    let abc = await Admin.findById(req.user.id);

    let ali = abc.token.filter((item) => {
        if (String(item) == String(req.headers.jwt)) {
            return false;
        }
        return true;
    });
    abc.token = ali;

    const dele = await abc.save({ validateBeforeSave: false });
    // console.log(dele);
    res
        .status(200)
        .json({ status: "success", message: `${dele.name} logout successfully !` });
});
exports.deletecolorbar = catchAsync(async(req, res, next) => {
    let abc = [];
    let oks = "";
    abc = req.user.colorbars.filter((item) => {
        if (String(item._id) === String(req.params.colorbarid)) {
            oks = "deleted";
            return false;
        }
        return true;
    });
    req.user.colorbars = abc;
    await req.user.save();
    if (oks === "deleted") {
        res.status(200).json({
            status: "success",
            data: "Color Bar deleted successfully !",
        });
    } else {
        return next(new AppError("Colorbar not exist", 401));
    }
});
exports.deleterole = catchAsync(async(req, res, next) => {
    let roll = await Role.findById(req.params.rollid);
    if (!roll) {
        return next(new AppError("Role not exist", 401));
    }
    await roll.remove();
    res.status(200).json({
        status: "success",
        message: `${roll.name} deleted succesfully`,
    });
});
exports.delete = catchAsync(async(req, res, next) => {
    let user = await User.findById(req.params.userid);
    if (!user) {
        return next(new AppError("Staff not exist", 401));
    }
    await user.remove();
    res.status(200).json({
        status: "success",
        message: `${user.firstname} ${user.lastname} deleted succesfully`,
    });
});
exports.UpdatePassword = catchAsync(async(req, res, next) => {
    const admin = await Admin.findById(req.user.id).select("+password");
    console.log(admin);
    if (!admin) {
        return next(new AppError("No Admin Found With That Id", 404));
    }
    if (req.body.password && req.body.passwordCurrent) {
        console.log("hi");
        if (!(await admin.correctPassword(req.body.passwordCurrent, admin.password))) {
            return next(new AppError("Your Current Password Is Wrong", 401));
        }
        req.body.passwords = req.body.password;
        req.body.password = await bcrypt.hash(req.body.password, 12);
    } else {
        return next(new AppError("Password or confirm password is missing!", 404));
    }
    const userr = await User.findByIdAndUpdate(req.params.id, req.body).select(
        "+password"
    );
    res.status(200).json({
        status: "success",
        data: userr,
    });
});
exports.AdminByID = catchAsync(async(req, res, next) => {
    let admin = await Admin.findById(req.user._id);
    res.status(200).json({
        status: "success",
        data: admin,
    });
});
exports.changeCustomized = catchAsync(async(req, res, next) => {
    // console.log(req.files);
    if (req.files) {
        // console.log(req.files);

        Object.keys(req.files).map(async function(key, index) {
            req.body[
                req.files[key][0].fieldname
            ] = `https://bhivee.herokuapp.com/img/admins/${req.files[key][0].filename}`;
        });
    }
    console.log(req.body.logo);
    let admin = await Admin.findByIdAndUpdate(req.user.id, req.body);

    res.status(200).json({
        status: "success",
        data: admin,
    });
});
exports.getchangeCustomized = catchAsync(async(req, res, next) => {
    res.status(200).json({
        status: "success",
        data: {
            color: req.user.color,
            companyname: req.user.companyname,
            logo: req.user.logo,
            colorbars: req.user.colorbars,
            uniqueidentifierterm: req.user.uniqueidentifierterm,
            unitnameterm: req.user.unitnameterm,
            firstscanterm: req.user.firstscanterm,
            datafield1: req.user.datafield1,
            datafield2: req.user.datafield2,
            datafield3: req.user.datafield3,
            datafield4: req.user.datafield4,
        },
    });
});
exports.forgotpassword = catchAsync(async(req, res, next) => {
    const admin = await Admin.find({ email: req.params.email });
    if (admin.length == 0) {
        return next(new AppError("Email is incorrect", 401));
    }

    console.log(admin[0].email);
    const resetcode = Math.floor(100000 + Math.random() * 900000);
    await new Email(admin[0], resetcode).sendPassword();
    res.status(200).json({
        status: "Email sent successfully",
        verificationcode: resetcode,
        adminid: admin[0]._id,
    });
});
exports.resetpassword = catchAsync(async(req, res, next) => {
    // console.log();
    // const user = await User.findById();
    if (req.body.password) {
        console.log("hi");
        req.body.password = await bcrypt.hash(req.body.password, 12);
    }
    const user = await Admin.findByIdAndUpdate(req.params.adminid, req.body, {
        new: true,
        runValidators: true,
    }).select("+password");

    res.status(200).json({
        status: "success",
        data: user,
    });
});
exports.forgotpasswordVerify = catchAsync(async(req, res, next) => {
    if (req.headers.code !== req.params.entercode) {
        return next(new AppError("Invalid Verification code", 401));
    }
    res.status(200).json({
        status: "success",
    });
});
exports.UpdateColorBar = catchAsync(async(req, res, next) => {
    console.log(req.params.id);
    req.user.colorbars = req.user.colorbars.map((item) => {
        if (String(item._id) === String(req.params.id)) {
            if (req.body.color) {
                item.color = req.body.color;
            }
            if (req.body.name) {
                item.name = req.body.name;
            }
            return item;
        }
        return item;
    });
    await req.user.save();
    res.status(200).json({
        status: "success",
        message: "Color bar successfully Updated!",
    });
});
exports.AddColorBar = catchAsync(async(req, res, next) => {
    console.log("hi");

    if (req.body.color || req.body.name) {
        let obj = {
            name: req.body.name,
            color: req.body.color,
        };

        req.user.colorbars.push(obj);
        req.body.colorbars = req.user.colorbars;
        req.body.name = undefined;
        req.body.color = undefined;
        let admin = await Admin.findByIdAndUpdate(req.user.id, req.body);

        res.status(200).json({
            status: "success",
            data: admin,
        });
    }
});
exports.getRoleById = catchAsync(async(req, res, next) => {
    const userr = await Role.findById(req.params.id);

    res.status(200).json({
        status: "success",
        data: userr,
    });
});
exports.updateRole = catchAsync(async(req, res, next) => {
    const userr = await Role.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
        status: "success",
        data: userr,
    });
});
exports.changepassword = catchAsync(async(req, res, next) => {
    const user = await User.findById(req.params.id).select("+password");
    console.log(user);
    if (!user) {
        return next(new AppError("No User Found With That Id", 404));
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
    const userr = await User.findByIdAndUpdate(req.params.id, req.body).select(
        "+password"
    );
    res.status(200).json({
        status: "success",
        data: userr,
    });
});
exports.getRole = catchAsync(async(req, res, next) => {
    const ObjectId = mongoose.Types.ObjectId;

    let docs = await Role.aggregate([{
        $match: { admin: { $eq: ObjectId(req.user.id) } },
    }, ]);
    if (docs.length > 0) {
        docs = docs.map((item) => {
            item.create = undefined;
            item.edit = undefined;
            item.Lock = undefined;
            item.view = undefined;
            item.admin = undefined;
            return item;
        });
    }
    res.status(200).json({
        status: "success",
        data: docs,
    });
});
exports.getUsers = catchAsync(async(req, res, next) => {
    const ObjectId = mongoose.Types.ObjectId;

    let docs = await User.aggregate([{
            $match: { Company: { $eq: ObjectId(req.user.id) } },
        },

        {
            $project: {
                firstname: 1,
                lastname: 1,
            },
        },
    ]);
    res.status(200).json({
        status: "successs",
        data: docs,
    });
});
exports.UpdateME = catchAsync(async(req, res, next) => {
    const admin = await Admin.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
        runValidators: true,
    }).select("+password");
    res.status(200).json({
        status: "success",
        data: admin,
    });
});

exports.ME = catchAsync(async(req, res, next) => {
    console.log(req.user);
    // let newobj = req.user;
    let obj = {
        name: req.user.name,
        email: req.user.email,
        phone: req.user.phone,
        password: req.user.passwords,
    };
    // for (const [key, value] of Object.entries(newobj)) {
    //     console.log(key);
    //     if (`${key}` in obj) {
    //         obj[key] = value;
    //         console.log(obj[key], value);
    //     } else {
    //         // return next(new AppError(`${key} cannot be update here!`, 400));
    //     }
    // }

    res.status(200).json({
        status: "success",
        data: obj,
    });
});

exports.addRole = catchAsync(async(req, res, next) => {
    console.log(req.user.id);
    let role = await Role.create({
        admin: req.user._id,
        name: req.body.name,
    });
    res.status(200).json({
        status: "success",
        data: role,
    });
});
exports.searchLocation = catchAsync(async(req, res, next) => {
    console.log(req.params.keyword);
    if (req.user.locations.length > 0) {
        req.user.locations = req.user.locations.filter((item) => {
            if (
                item.name.toLowerCase().startsWith(req.params.keyword.toLowerCase())
            ) {
                item.lat = undefined;
                item.lng = undefined;
                item.teams = undefined;
                return true;
            }
        });
    } else {
        return next(new AppError("No Location exist", 500));
    }
    res.status(200).json({
        status: "success",
        data: req.user.locations,
    });
});

exports.getLocations = catchAsync(async(req, res, next) => {
    if (req.user.locations.length > 0) {
        req.user.locations = req.user.locations.map((item) => {
            item.lat = undefined;
            item.lng = undefined;
            item.teams = undefined;
            return item;
        });
    }
    res.status(200).json({
        status: "success",
        data: req.user.locations,
    });
});
exports.deleteteam = catchAsync(async(req, res, next) => {
    req.user.locations = req.user.locations.map((item) => {
        if (String(item.id) === String(req.params.locationid)) {
            item.teams = item.teams.filter((item) => {
                if (String(item.id) === String(req.params.teamid)) {
                    return false;
                }
                return true;
            });
            return item;
        }
        return item;
    });
    await req.user.save();
    res.status(200).json({
        status: "success",
        message: "team deleted!",
    });
});
exports.deletelocation = catchAsync(async(req, res, next) => {
    req.user.locations = req.user.locations.filter((item) => {
        if (String(item.id) === String(req.params.locationid)) {
            return false;
        }
        return true;
    });
    await req.user.save();
    res.status(200).json({
        status: "success",
        message: "Location deleted!",
    });
});
exports.updateteam = catchAsync(async(req, res, next) => {
    req.user.locations = req.user.locations.map((item) => {
        if (String(item.id) === String(req.params.locationid)) {
            item.teams.map((item) => {
                if (String(item.id) === String(req.params.teamid)) {
                    item.name = req.body.name;
                }
            });
            return item;
        }
        return item;
    });
    await req.user.save();
    res.status(200).json({
        status: "success",
        message: "team updated!",
    });
});
exports.updateLocation = catchAsync(async(req, res, next) => {
    const ObjectId = mongoose.Types.ObjectId;
    let finals;
    if (req.user.locations.length > 0) {
        finals = req.user.locations.filter((item) => {
            if (String(item._id) === String(ObjectId(req.params.id))) {
                return true;
            }
        });
    }
    console.log(finals);
    if (req.body.name) {
        finals[0].name = req.body.name;
    }
    if (req.body.lat) {
        finals[0].lat = req.body.lat;
    }
    if (req.body.lng) {
        finals[0].lng = req.body.lng;
    }
    if (req.body.team) {
        if (Array.isArray(req.body.team) === true) {
            let NewTeams = req.body.team.map((item) => {
                let obj = {
                    name: item,
                };
                finals[0].teams.push(obj);
                return obj;
            });
        } else {
            let obj = {
                name: req.body.team,
            };
            finals[0].teams.push(obj);
        }
    }

    if (req.user.locations.length > 0) {
        req.user.locations = req.user.locations.map((item) => {
            if (String(item._id) === String(ObjectId(req.params.id))) {
                item = finals[0];
                return item;
            }
            return item;
        });
    }
    await req.user.save();
    res.status(200).json({
        status: "success",
        data: finals,
    });
});
exports.getLocation = catchAsync(async(req, res, next) => {
    console.log(req.params.id);
    const ObjectId = mongoose.Types.ObjectId;
    let finals;
    if (req.user.locations.length > 0) {
        finals = req.user.locations.filter((item) => {
            console.log(item);
            if (String(item._id) === String(ObjectId(req.params.id))) {
                return true;
            }
        });
    }
    console.log(ObjectId(req.params.id));
    res.status(200).json({
        status: "success",
        data: finals,
    });
});
exports.addLocations = catchAsync(async(req, res, next) => {
    let { name, lat, lng, team } = req.body;
    console.log(req.body);
    if (team) {
        if (team.length > 0) {
            if (Array.isArray(team) === true) {
                team = team.map((item) => {
                    let obj = {
                        name: item,
                    };
                    return obj;
                });
            } else {
                let obj = {
                    name: req.body.team,
                };
                team = obj;
            }
            let obj = {
                name,
                lat: Number(lat),
                lng: Number(lng),
                teams: team,
            };
            req.user.locations.push(obj);
        } else {
            let obj = {
                name,
                lat: Number(lat),
                lng: Number(lng),
                teams: team,
            };
            req.user.locations.push(obj);
        }

        // console.log(req.user);
        await req.user.save();
    } else {
        let obj = {
            name,
            lat: Number(lat),
            lng: Number(lng),
        };
        req.user.locations.push(obj);
        // console.log(req.user);
        await req.user.save();
    }
    res.status(201).json({
        status: "success",
        data: {
            admin: req.user,
        },
    });
});

exports.checkHeader = catchAsync(async(req, res, next) => {
    req.headers["jwt"] = tokens;
    next();
});