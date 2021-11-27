const express = require("express");

const adminController = require("../controller/adminController");
const recordController = require("../controller/recordController");
const authenticationController = require("../controller/authenticationController");
const User = require("../model/userModel");
const router = express.Router({ mergeParams: true });

router
    .route("/addrecord/:ip/:version")
    .post(
        authenticationController.protect(User),
        recordController.uploadFieldsUser,
        recordController.addrecord
    );
router
    .route("/editrecord/:id/:ip/:version")
    .patch(
        authenticationController.protect(User),
        recordController.uploadFieldsUser2,
        recordController.updaterecord
    );
router
    .route("/deleterecord/:id/:ip/:version")
    .delete(
        authenticationController.protect(User),
        recordController.uploadFieldsUser2,
        recordController.deleterecord
    );
router
    .route("/lockrecord/:id/:ip/:version")
    .patch(
        authenticationController.protect(User),
        recordController.uploadFieldsUser2,
        recordController.lockrecord
    );
router
    .route("/merge/:id/:toid")
    .patch(
        authenticationController.protect(User),
        recordController.uploadFieldsUser2,
        recordController.mergerecord
    );
router
    .route("/getrecords/:companyid")
    .get(
        authenticationController.protect(User),
        recordController.uploadFieldsUser2,
        recordController.companyrecords
    );
router
    .route("/getrecord/:id/:ip/:version")
    .post(
        authenticationController.protect(User),
        recordController.uploadFieldsUser9,
        recordController.record
    );
router
    .route("/getrecordfirst/:id/:ip/:version")
    .post(
        authenticationController.protect(User),
        recordController.uploadFieldsUser9,
        recordController.record2
    );
router
    .route("/getrecordbyid/:id")
    .get(
        authenticationController.protect(User),
        recordController.uploadFieldsUser9,
        recordController.recordbyid
    );
router
    .route("/addBAR/:id/:ip/:version")
    .patch(
        authenticationController.protect(User),
        recordController.uploadFieldsUser9,
        recordController.addBarcode
    );

module.exports = router;