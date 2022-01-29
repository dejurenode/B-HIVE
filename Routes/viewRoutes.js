const express = require("express");
const viewController = require("../controller/viewController");

const userController = require("../controller/userController");

const router = express.Router();
router.get("/", userController.isLoggedIn, viewController.getLandingpage);
router.get("/login", userController.isLoggedIn, viewController.getLogin);
router.get("/signup", userController.isLoggedIn, viewController.getSignUp);
router.get(
  "/emailVerification",
  userController.isLoggedIn,
  viewController.emailVerification
);
router.get(
  "/VerificationCode",
  userController.isLoggedIn,
  viewController.verifyCode
);
router.get(
  "/Resetpassword",
  userController.isLoggedIn,
  viewController.resetCode
);
router.get("/Profile", userController.isLoggedIn, viewController.profile);
router.get("/staff", userController.isLoggedIn, viewController.staff);
//ss
router.get(
  "/customizedtheme",
  userController.isLoggedIn,
  viewController.customizedtheme
);
router.get("/locations", userController.isLoggedIn, viewController.locations);
router.get(
  "/editlocation/:id",
  userController.isLoggedIn,
  viewController.editlocation
);
router.get("/roles", userController.isLoggedIn, viewController.getroles);
router.get(
  "/rolesedit/:id",
  userController.isLoggedIn,
  viewController.editroles
);

module.exports = router;
