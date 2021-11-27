const Admin = require("../model/adminModel");
const User = require("../model/userModel");
const Role = require("../model/rolesModel");

const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const path = require("path");
var countries = require("i18n-iso-countries");

// const Checkin = require("../model/userCheckin");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const multer = require("multer");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const multerStorage = multer.memoryStorage();

const Email = require("../utils/email");

let tokens = "";
// Support french & english languages.
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/fr.json"));

const videoStorage = multer.diskStorage({
    destination: "public/img/celebsvideos", // Destination to store video
    filename: (req, file, next) => {
        next(
            null,
            file.fieldname + "_" + Date.now() + path.extname(file.originalname)
        );
    },
});
exports.videoUpload = multer({
    storage: videoStorage,
    fileFilter(req, file, next) {
        // upload only mp4 and mkv format

        if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) {
            return next(new AppError("Please upload Videos", 401));
        }
        next(undefined, true);
    },
});
exports.checkHeader = catchAsync(async(req, res, next) => {
    req.headers["jwt"] = tokens;
    next();
});

const multerFilter = (req, file, cb) => {
    // console.log(file);
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(null, true);
    }
};
// exports.resizePhotos = catchAsync(async(req, res, next) => {
//     if (!req.file) return next();
//     console.log(req.file);
//     req.file.filename = `user-${Date.now()}.jpeg`;
//     await sharp(req.file.buffer)
//         .toFormat("jpeg")
//         .jpeg({ quality: 90 })
//         .toFile(`public/img/celebsphotos/${req.file.filename}`);
//     next();
// });
// exports.resizeUserPhoto = catchAsync(async(req, res, next) => {
//     if (!req.file) return next();
//     console.log(req.file);
//     req.file.filename = `user-${Date.now()}.jpeg`;
//     await sharp(req.file.buffer)
//         .toFormat("jpeg")
//         .jpeg({ quality: 90 })
//         .toFile(`public/img/users/${req.file.filename}`);
//     next();
// });
const upload = multer({
    storage: multerStorage,
});

exports.uploadUserPhoto = upload.single("photo");
exports.uploadCoverPhoto = upload.single("cover");
exports.uploadPhotos = upload.single("photos");

exports.protect = (model) =>
    catchAsync(async(req, res, next) => {
        console.log(req.headers.jwt);
        let token;

        const abc = await model.find({ token: { $in: [req.headers.jwt] } });
        console.log(model);
        // console.log(req.headers);
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            // console.log("111");
            token = req.headers.authorization.split(" ")[1];
        } else if (abc.length > 0) {
            // console.log("222");
            token = req.headers.jwt;
        }
        // else if (req.cookies.jwt) {
        //   token = req.cookies.jwt;
        // }
        // console.log(req.cookies);
        if (!token) {
            return next(
                new AppError("You are not logged in! please login to get access", 401)
            );
        }

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const freshUser = await model.findById(decoded.id);
        if (!freshUser) {
            const err = new AppError(
                "The user belonging to this token no longer exist!",
                401
            );
            err.name = "User Deleted";
            return next(err);
        }
        // if (freshUser.changePasswordAfter(decoded.iat)) {
        //   const err = new AppError(
        //     "User Recently Changed Password. please login again!",
        //     401
        //   );
        //   err.name = "Change Password";
        //   return next(err);
        // }
        req.user = freshUser;
        res.locals.user = freshUser;

        next();
    });

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const createSendToken2 = async(user, statusCode, req, res) => {
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
    res.cookie("jwt", token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 100
        ),
        httpOnly: true,
        secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });
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
exports.loginAdmin2 = catchAsync(async(req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError("please provide email and password!", 400));
    }

    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin || !(await admin.correctPassword(password, admin.password))) {
        return next(new AppError("Incorrect email or password!", 401));
    }
    createSendToken2(admin, 200, req, res);
});
exports.createCelebrity = catchAsync(async(req, res, next) => {
    if (req.file) req.body.photo = req.file.filename;
    console.log(req.body);
    const category = await Category.findById(req.body.category);
    console.log(category);
    if (!category) {
        return next(new AppError("Category id Invalid", 401));
    }
    console.log(req.body);
    const celebrity = await Celebrity.create(req.body);
    await CelebrityTiming.create({
        celebrity: celebrity._id,
    });
    createSendToken(celebrity, 201, req, res);
});
exports.updateUser = catchAsync(async(req, res, next) => {
    if (req.body.location) {
        const ObjectId = mongoose.Types.ObjectId;
        let check = [];
        let oks = false;
        let newUser = {};
        if (req.file) req.body.photo = req.file.filename;
        check = req.user.locations.filter((item) => {
            if (String(ObjectId(item._id)) === String(ObjectId(req.body.location))) {
                return true;
            }
            return;
        });
        if (req.body.role) {
            let role = await Role.findById(req.body.role);
            if (!role) {
                return next(new AppError("Invalid role id", 500));
            }
            // console.log(role);
        }
        console.log(check);
        if (check.length > 0) {
            if (check[0].teams.length > 0) {
                if (req.body.team) {

                    let ac = check[0].teams.filter((item) => {
                        if (String(ObjectId(item._id)) === String(ObjectId(req.body.team))) {
                            oks = true;
                            return true;
                        }
                        return;
                    });
                    if (oks === true) {
                        const userr = await User.findByIdAndUpdate(req.params.id, req.body);

                        res.status(200).json({
                            status: "success",
                            data: userr,
                        });
                    } else {
                        return next(new AppError("Invalid Team", 500));
                    }
                } else {
                    console.log(req.user.id)
                    const userr = await User.findByIdAndUpdate(req.params.id, req.body);

                    res.status(200).json({
                        status: "success",
                        data: userr,
                    });
                }
            } else {
                let userr = await User.findById(req.params.id);
                userr.team = undefined;
                await userr.save();
                userr = await User.findByIdAndUpdate(req.params.id, req.body);
                res.status(200).json({
                    status: "success",
                    data: userr,
                });
            }
        } else {
            return next(new AppError("No Location exist", 500));
        }
    } else {
        if (req.body.role) {
            let role = await Role.findById(req.body.role);
            if (!role) {
                return next(new AppError("Invalid role id", 500));
            }
            console.log(role);
            const userr = await User.findByIdAndUpdate(req.params.id, req.body);

            res.status(200).json({
                status: "success",
                data: userr,
            });
        }
    }
});
exports.addUser = catchAsync(async(req, res, next) => {
    const ObjectId = mongoose.Types.ObjectId;
    let check = [];
    let oks = false;
    let newUser = {};
    if (req.file) req.body.photo = req.file.filename;
    check = req.user.locations.filter((item) => {
        if (String(ObjectId(item._id)) === String(ObjectId(req.body.location))) {
            return true;
        }
        return;
    });
    let role = await Role.findById(req.body.role);
    if (!role) {
        return next(new AppError("Invalid role id", 500));
    }
    console.log(role);
    if (check.length > 0) {
        oks = true;

        if (check[0].teams.length > 0) {
            check[0].teams.filter((item) => {
                if (String(ObjectId(item._id)) === String(ObjectId(req.body.team))) {
                    oks = true;
                }
            });
            if (oks === true) {
                newUser = await User.create({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: req.body.password,
                    passwords: req.body.password,
                    location: req.body.location,
                    team: req.body.team,
                    role: req.body.role,
                    Company: req.user._id,
                });
                createSendToken(newUser, 201, req, res);
            } else {
                return next(new AppError("Invalid  Team", 500));
            }
        } else {
            newUser = await User.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password,
                passwords: req.body.password,
                location: req.body.location,
                role: req.body.role,
                Company: req.user._id,
            });
            createSendToken(newUser, 201, req, res);
        }
    } else {
        return next(new AppError("No Location exist", 500));
    }
});
exports.loginAdmin = catchAsync(async(req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError("please provide email and password!", 400));
    }

    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) {
        return next(new AppError("Incorrect Email. Contact your Administrator.", 401));
    }
    if (!(await admin.correctPassword(password, admin.password))) {
        return next(new AppError("Incorrect Password. Please retry.", 401));
    }
    createSendToken(admin, 200, req, res);
});
exports.loginCeleb = catchAsync(async(req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError("please provide email and password!", 400));
    }

    const user = await Celebrity.findOne({ email }).select("+password");
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError("Incorrect email or password!", 401));
    }
    createSendToken(user, 200, req, res);
});
exports.forgotpassword = catchAsync(async(req, res, next) => {
    const user = await User.find({ email: req.params.email });
    if (user.length == 0) {
        return next(new AppError("Email is incorrect", 401));
    }

    console.log(user[0].email);
    const resetcode = Math.floor(100000 + Math.random() * 900000);
    await new Email(user[0], resetcode).sendPassword();
    res.status(200).json({
        status: "Email sent successfully",
        verificationcode: resetcode,
        userid: user[0]._id,
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
exports.resetpassword = catchAsync(async(req, res, next) => {
    // console.log();
    // const user = await User.findById();
    if (req.body.password) {
        console.log("hi");
        req.body.password = await bcrypt.hash(req.body.password, 12);
    }
    const user = await User.findByIdAndUpdate(req.params.userid, req.body, {
        new: true,
        runValidators: true,
    }).select("+password");

    res.status(200).json({
        status: "success",
        data: user,
    });
});
exports.createAdmin2 = catchAsync(async(req, res, next) => {
    let newUser = {};
    if (req.file) req.body.photo = req.file.filename;
    console.log(req.body.photo);
    newUser = await Admin.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwords: req.body.password,
    });
    createSendToken2(newUser, 201, req, res);
});
exports.createAdmin = catchAsync(async(req, res, next) => {
    let newUser = {};
    if (req.file) req.body.photo = req.file.filename;
    console.log(req.body.photo);
    newUser = await Admin.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwords: req.body.password,
    });
    createSendToken(newUser, 201, req, res);
});

exports.loginUSer = catchAsync(async(req, res, next) => {
    const ObjectId = mongoose.Types.ObjectId;

    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError("please provide email and password!", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    // if (!user || !(await user.correctPassword(password, user.password))) {
    //     return next(new AppError("Incorrect email or password!", 401));
    // }
    if (!user) {
        return next(new AppError("Incorrect email. Contact your Administrator", 400));
    }
    if (!(await user.correctPassword(password, user.password))) {
        return next(new AppError("Incorrect password. Please retry", 400));
    }
    let role = await Role.findById(user.role);
    // console.log(role);
    user.role = role;
    let admin = await Admin.findById(user.Company);
    // console.log(admin.locations, user.location);
    let abc = admin.locations.filter((item) => {
        if (String(ObjectId(item._id)) === String(user.location)) {
            console.log("hi");
            return true;
        }
        return false;
    });
    user.locationss = abc[0];
    // console.log(user.locations);
    // await user.save();
    createSendToken(user, 200, req, res);
});