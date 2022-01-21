const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const axios = require("axios");


exports.getroles = catchAsync(async(req, res, next) => {
    if (req.user) {
        let role = await axios.get(
            `https://bhivee.herokuapp.com/api/v1/admins/Role/`, {
                headers: {
                    jwt: req.jwt,
                },
            }
        );
        role = role.data.data;
        res.status(200).render("roles", {
            title: "All",
            role,
        });
    } else {
        res.status(200).render("login", {
            title: "All",
            role,
        });
    }
});

exports.editroles = catchAsync(async(req, res, next) => {
    if (req.user) {

        let role = await axios.get(
            `https://bhivee.herokuapp.com/api/v1/admins/Role/`, {
                headers: {
                    jwt: req.jwt,
                },
            }
        );
        console.log(
            "HAHAHAHAHAHHAHAHAHAHHAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa"
        );
        console.log(req.params.id);

        role = role.data.data;
        let finalrole = role.filter((item) => {
            if (String(item._id) === String(req.params.id)) {
                return true;
            }
            return false;
        });
        let rolecomplete = await axios.get(
            `https://bhivee.herokuapp.com/api/v1/admins/Role/${req.params.id}`, {
                headers: {
                    jwt: req.jwt,
                },
            }
        );
        console.log(rolecomplete.data.data);
        res.status(200).render("rolesedit", {
            title: "All",
            role,
            finalrole: finalrole[0]._id,
            finalrolename: finalrole[0].name,
            finalofs: rolecomplete.data.data,
        });
    } else {
        res.status(200).render("login", {
            title: "All",
            role,
        });
    }
});
exports.customizedtheme = catchAsync(async(req, res, next) => {
    if (req.user) {
        let theme = await axios.get(
            `https://bhivee.herokuapp.com/api/v1/admins/customizedtheme`, {
                headers: {
                    jwt: req.jwt,
                },
            }
        );
        theme = theme.data.data;
        res.status(200).render("customizedtheme", {
            title: "All",
            theme,
        });
    } else {
        res.status(200).render("login", {
            title: "All",
            role,
        });
    }
});

exports.staff = catchAsync(async(req, res, next) => {
    if (req.user) {

        console.log("hiiiiiiiiiiiiiiiiiiiiiiii");
        // let staff = await axios.get(
        //     `https://bhivee.herokuapp.com/api/v1/admins/getusers`, {
        //         headers: {
        //             jwt: req.jwt,
        //         },
        //     }
        // );
        let staff = await axios.get(
            `https://bhivee.herokuapp.com/api/v1/admins/getusers`, {
                headers: {
                    jwt: req.jwt,
                },
            }
        );

        staff = staff.data.data;
        let roles = await axios.get(
            `https://bhivee.herokuapp.com/api/v1/admins/Role/`, {
                headers: {
                    jwt: req.jwt,
                },
            }
        );

        roles = roles.data.data;
        console.log("pqoqowoowqoqoqoqoo");
        console.log(roles);
        res.status(200).render("staff", {
            title: "All",
            staff,
            roles,
            locations: req.user.locations,
        });
    } else {
        res.status(200).render("login", {
            title: "All",
            role,
        });
    }
});
exports.editlocation = catchAsync(async(req, res, next) => {
    if (req.user) {

        const location = await axios({
            method: "GET",
            url: `https://bhivee.herokuapp.com/api/v1/admins/Locations/${req.params.id}`,
            headers: {
                jwt: req.jwt,
            },
        });
        console.log(location.data.data[0]);
        res.status(200).render("editlocations", {
            title: "All",
            location: location.data.data[0],
        });
    } else {
        res.status(200).render("login", {
            title: "All",
            role,
        });
    }
});
exports.locations = catchAsync(async(req, res, next) => {
    if (req.user) {

        let locations = await axios.get(
            `https://bhivee.herokuapp.com/api/v1/admins/Locations`, {
                headers: {
                    jwt: req.jwt,
                },
            }
        );
        console.log(locations.data.data);
        res.status(200).render("locations", {
            title: "All",
            locations: locations.data.data,
        });
    } else {
        res.status(200).render("login", {
            title: "All",
            role,
        });
    }
});
exports.getLogin = catchAsync(async(req, res, next) => {
    if (req.user) {
        res.status(200).render("profile", {
            title: "All",
            admin: req.user,
        });
    } else {
        console.log("hiiiiiiiiiiiiiiiiiiiiiiii");

        res.status(200).render("login", {
            title: "All",
        });
    }
});
exports.getSignUp = catchAsync(async(req, res, next) => {
    if (req.user) {
        res.status(200).render("profile", {
            title: "All",
            admin: req.user,

        });

    } else {
        res.status(200).render("signup", {
            title: "All",
        });
    }
});
exports.emailVerification = catchAsync(async(req, res, next) => {
    if (req.user) {
        res.status(200).render("profile", {
            title: "All",
            admin: req.user,

        });

    } else {
        console.log("hahahhahahahahah");
        res.status(200).render("email", {
            title: "Aop",
        });
    }
});
exports.verifyCode = catchAsync(async(req, res, next) => {
    if (req.user) {
        res.status(200).render("profile", {
            title: "All",
            admin: req.user,
        });

    } else {
        console.log("hahahhahahahahah");
        // if (localStorage.getItem("asdf")) {
        res.status(200).render("verifycode", {
            title: "All",
        });
        // } else {
        //     res.status(200).render("email", {
        //         title: "Aop",
        //     });
        // }
    }
});
exports.resetCode = catchAsync(async(req, res, next) => {
    if (req.user) {
        res.status(200).render("profile", {
            title: "All",
            admin: req.user,

        });

    } else {
        console.log("hahahhahahahahah");
        res.status(200).render("resetpassword", {
            title: "All",
        });
    }
});
exports.profile = catchAsync(async(req, res, next) => {
    console.log("hahahhahahahahah");
    // if (req.user) {
    console.log("hahahhahahahahah-------------------------------");

    console.log(req.user);
    res.status(200).render("profile", {
        admin: req.user,
    });
    // } else {
    //     res.status(200).render("login", {
    //         title: "All",
    //     });
    // }
});