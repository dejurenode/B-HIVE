const express = require("express");

const userController = require("../controller/userController");
const adminController = require("../controller/adminController");
const authenticationController = require("../controller/authenticationController");
const User = require("../model/userModel");
const Admin = require("../model/adminModel");
const router = express.Router({ mergeParams: true });

router
    .route("/login")
    .post(adminController.uploadFieldsUser, authenticationController.loginUSer);
router
    .route("/customizedtheme")
    .get(
        authenticationController.protect(User),
        userController.uploadFieldsUser,
        userController.getchangeCustomized
    );
router
    .route("/ME")
    .patch(
        authenticationController.protect(User),
        userController.uploadFieldsUser,
        userController.updateUser
    )
    .get(
        authenticationController.protect(User),
        userController.uploadFieldsUser,
        userController.getMe
    );
router
    .route("/Role")
    .get(
        authenticationController.protect(User),
        userController.uploadFieldsUser,
        userController.getRole
    );
router
    .route("/changepassword")
    .patch(
        authenticationController.protect(User),
        adminController.uploadFieldsUser,
        userController.changepassword
    );
router.route("/forgotpassword/:email").post(userController.forgotpassword);
router
    .route("/forgotpasswordverify/:entercode")
    .post(userController.forgotpasswordVerify);
router
    .route("/resetpassword/:userid")
    .post(userController.uploadFieldsUser, userController.resetpassword);
router
    .route("/:id")
    .get(
        authenticationController.protect(Admin),
        userController.uploadFieldsUser,
        userController.getUser
    );
module.exports = router;