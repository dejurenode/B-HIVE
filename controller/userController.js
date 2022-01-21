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
    }
  },
});
const uploadsUser = multer({
  storage: multerStorageUser,
});

exports.uploadFieldsUser = uploadsUser.fields([{ name: "logo", maxCount: 1 }]);

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  }).select("+password");
  res.status(200).json({
    status: "success",
    data: user,
  });
});
exports.getMe = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: req.user,
  });
});

exports.forgotpassword = catchAsync(async (req, res, next) => {
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
exports.forgotpasswordVerify = catchAsync(async (req, res, next) => {
  if (req.headers.code !== req.params.entercode) {
    return next(new AppError("Invalid Verification code", 401));
  }
  res.status(200).json({
    status: "success",
  });
});
exports.resetpassword = catchAsync(async (req, res, next) => {
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
exports.changepassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  console.log(user);
  if (!user) {
    return next(new AppError("No User Found With That Id", 404));
  }
  if (req.body.password && req.body.passwordCurrent) {
    console.log("hi");
    if (
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      return next(new AppError("Your Current Password Is Wrong", 401));
    }
    req.body.passwords = req.body.password;
    req.body.password = await bcrypt.hash(req.body.password, 12);
  } else {
    return next(new AppError("Password or confirm password is missing!", 404));
  }
  const userr = await User.findByIdAndUpdate(req.user.id, req.body).select(
    "+password"
  );
  res.status(200).json({
    status: "success",
    data: userr,
  });
});
exports.getRole = catchAsync(async (req, res, next) => {
  let role = await Role.findById(req.user.role);
  res.status(200).json({
    status: "success",
    data: role,
  });
});
exports.isLoggedIn = async (req, res, next) => {
  console.log("hii");
  if (req.cookies) {
    if (req.cookies.jwt) {
      try {
        const decoded = await promisify(jwt.verify)(
          req.cookies.jwt,
          process.env.JWT_SECRET
        );
        const freshUser = await Admin.findById(decoded.id);
        // console.log(freshUser);
        //s
        if (!freshUser) {
          return next();
        }

        res.locals.user = freshUser;
        req.user = freshUser;
        req.jwt = req.cookies.jwt;

        console.log(req.user);

        return next();
      } catch (err) {
        return next();
      }
    }
  }
  console.log("hii");

  next();
  // if (true) {
  //   if (true) {
  //     try {
  //       const decoded = await promisify(jwt.verify)(
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTYyOWIyNWY4Y2QxM2ZlOTU0YTc5MCIsImlhdCI6MTYzODAwODgxNCwiZXhwIjoxNjQ1Nzg0ODE0fQ.-XZm-vSZRMzkmjHFnJfCpgNA0AP6rpS918MF78VGU2s",
  //         process.env.JWT_SECRET
  //       );
  //       const freshUser = await Admin.findById(decoded.id);
  //       // console.log(freshUser);
  //       //s
  //       if (!freshUser) {
  //         return next();
  //       }

  //       res.locals.user = freshUser;
  //       req.user = freshUser;
  //       req.jwt =
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOTYyOWIyNWY4Y2QxM2ZlOTU0YTc5MCIsImlhdCI6MTYzODAwODgxNCwiZXhwIjoxNjQ1Nzg0ODE0fQ.-XZm-vSZRMzkmjHFnJfCpgNA0AP6rpS918MF78VGU2s";

  //       console.log(req.user);

  //       return next();
  //     } catch (err) {
  //       return next();
  //     }
  //   }
  // }
  // console.log("hii");

  // next();
};
exports.getUser = catchAsync(async (req, res, next) => {
  console.log(req.params.id);
  const ObjectId = mongoose.Types.ObjectId;

  let user = await User.aggregate([
    {
      $match: { _id: ObjectId(req.params.id) },
    },
    {
      $lookup: {
        from: "roles",
        let: { role: "$role" }, // consider as local key
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$_id", "$$role"] }, // $_id consider as foreign key
            },
          },
          // { $project: { name: 1, photo: 1, category: 1, age: 1 } },
        ],
        as: "role",
      },
    },
  ]);
  let admin = await Admin.aggregate([
    {
      $match: { _id: ObjectId(user[0].Company) },
    },
  ]);
  let location = admin[0].locations.filter((item) => {
    if (String(item._id) === String(user[0].location)) {
      return true;
    }
    return false;
  });
  if (location[0].teams.length > 0) {
    let team = location[0].teams.filter((item) => {
      if (String(item._id) === String(user[0].team)) {
        return true;
      }
      return false;
    });

    location[0].teams = undefined;
    user[0].location = location;
    // console.log(user[0].location[0].teams);

    if (team.length > 0) {
      user[0].location[0].teams = team;
    } else {
      user[0].team = undefined;
    }
  } else {
    user[0].location = location;
  }

  user[0].password = undefined;
  user[0].Company = undefined;
  user[0].token = undefined;
  user[0].active = undefined;
  user[0].joinedAt = undefined;
  res.status(200).json({
    status: "success",
    data: user,
  });
});
exports.getchangeCustomized = catchAsync(async (req, res, next) => {
  const ObjectId = mongoose.Types.ObjectId;
  const admin = await Admin.aggregate([
    {
      $match: { _id: ObjectId(req.user.Company) },
    },
  ]);
  console.log(admin);
  //ss
  //ss
  res.status(200).json({
    status: "success",
    data: {
      color: admin[0].color,
      companyname: admin[0].companyname,
      logo: admin[0].logo,
      colorbars: admin[0].colorbars,
      uniqueidentifierterm: admin[0].uniqueidentifierterm,
      unitnameterm: admin[0].unitnameterm,
      firstscanterm: admin[0].firstscanterm,
      datafield1: admin[0].datafield1,
      datafield2: admin[0].datafield2,
      datafield3: admin[0].datafield3,
      datafield4: admin[0].datafield4,
    },
  });
});

exports.checkHeader = catchAsync(async (req, res, next) => {
  req.headers["jwt"] = tokens;
  next();
});
