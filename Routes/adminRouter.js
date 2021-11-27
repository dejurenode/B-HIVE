const express = require("express");

const adminController = require("../controller/adminController");
const authenticationController = require("../controller/authenticationController");
const Admin = require("../model/adminModel");
const router = express.Router({ mergeParams: true });

router
    .route("/signup")
    .post(adminController.uploadFieldsUser, authenticationController.createAdmin);

router
    .route("/signup2")
    .post(
        adminController.uploadFieldsUser,
        authenticationController.createAdmin2
    );
router
    .route("/login")
    .post(adminController.uploadFieldsUser, authenticationController.loginAdmin);

router
    .route("/login2")
    .post(adminController.uploadFieldsUser, authenticationController.loginAdmin2);
router
    .route("/logout")
    .post(authenticationController.protect(Admin), adminController.logouts);
router
    .route("/logouts")
    .post(authenticationController.protect(Admin), adminController.logout);
router
    .route("/deleteuser/:userid")
    .delete(authenticationController.protect(Admin), adminController.delete);
router
    .route("/deleteroll/:rollid")
    .delete(authenticationController.protect(Admin), adminController.deleterole);
router
    .route("/deletecolorbar/:colorbarid")
    .delete(
        authenticationController.protect(Admin),
        adminController.deletecolorbar
    );
router
    .route("/Locations")
    .post(
        authenticationController.protect(Admin),
        adminController.uploadFieldsUser,
        adminController.addLocations
    )
    .get(
        authenticationController.protect(Admin),
        adminController.uploadFieldsUser,
        adminController.getLocations
    );
router
    .route("/Team/:teamid/:locationid")
    .patch(
        authenticationController.protect(Admin),
        adminController.uploadFieldsUser,
        adminController.updateteam
    )
    .delete(
        authenticationController.protect(Admin),
        adminController.uploadFieldsUser,
        adminController.deleteteam
    );
router
    .route("/deleteLocation/:locationid")
    .delete(
        authenticationController.protect(Admin),
        adminController.uploadFieldsUser,
        adminController.deletelocation
    );
router
    .route("/me")
    .get(
        authenticationController.protect(Admin),
        adminController.uploadFieldsUser,
        adminController.ME
    )
    .patch(
        authenticationController.protect(Admin),
        adminController.uploadFieldsUser,
        adminController.UpdateME
    );

router
    .route("/updatepassword")
    .patch(
        authenticationController.protect(Admin),
        adminController.uploadFieldsUser,
        adminController.UpdatePassword
    );
router
    .route("/getadminbyid")
    .get(
        authenticationController.protect(Admin),
        adminController.uploadFieldsUser,
        adminController.AdminByID
    );
router
    .route("/Locations/:id")
    .get(
        authenticationController.protect(Admin),
        adminController.uploadFieldsUser,
        adminController.getLocation
    )
    .patch(
        authenticationController.protect(Admin),
        adminController.uploadFieldsUser,
        adminController.updateLocation
    );

router
    .route("/getusers")
    .get(
        authenticationController.protect(Admin),
        adminController.uploadFieldsUser,
        adminController.getUsers
    );
router
    .route("/searchlocation/:keyword")
    .get(
        authenticationController.protect(Admin),
        adminController.uploadFieldsUser,
        adminController.searchLocation
    );

router
    .route("/Role")
    .post(
        authenticationController.protect(Admin),
        adminController.uploadFieldsUser,
        adminController.addRole
    )
    .get(
        authenticationController.protect(Admin),
        adminController.uploadFieldsUser,
        adminController.getRole
    );

router
    .route("/Role/:id")
    .patch(
        authenticationController.protect(Admin),
        adminController.uploadFieldsUser,
        adminController.updateRole
    )
    .get(
        authenticationController.protect(Admin),
        adminController.uploadFieldsUser,
        adminController.getRoleById
    );

router
    .route("/user")
    .post(
        authenticationController.protect(Admin),
        adminController.uploadFieldsUser,
        authenticationController.addUser
    );
router
    .route("/user/:id")
    .patch(
        authenticationController.protect(Admin),
        adminController.uploadFieldsUser,
        authenticationController.updateUser
    );

router
    .route("/user/changepassword/:id")
    .patch(
        authenticationController.protect(Admin),
        adminController.uploadFieldsUser,
        adminController.changepassword
    );
router
    .route("/customizedtheme")
    .patch(
        authenticationController.protect(Admin),
        adminController.uploadFieldsUser,
        adminController.changeCustomized
    )
    .get(
        authenticationController.protect(Admin),
        adminController.uploadFieldsUser,
        adminController.getchangeCustomized
    );
router.route("/forgotpassword/:email").post(adminController.forgotpassword);
router
    .route("/forgotpasswordverify/:entercode")
    .post(adminController.forgotpasswordVerify);
router
    .route("/resetpassword/:adminid")
    .post(adminController.uploadFieldsUser, adminController.resetpassword);
router
    .route("/AddColorBar")
    .patch(
        authenticationController.protect(Admin),
        adminController.uploadFieldsUser,
        adminController.AddColorBar
    );
router
    .route("/ColorBar/:id")
    .patch(
        authenticationController.protect(Admin),
        adminController.uploadFieldsUser,
        adminController.UpdateColorBar
    );

module.exports = router;