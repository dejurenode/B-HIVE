export const form_addLocation = async(data) => {
    try {
        const cud = localStorage.getItem("jwt");
        console.log("akajsjjjsjsjjsjsjaqkajsjskjakajsjj");
        const res = await axios({
            method: "POST",
            url: `https://bhivee.herokuapp.com/api/v1/admins/Locations`,
            data,
            headers: {
                jwt: cud,
            },
        });

        if (res.data.status === "success") {
            document.querySelector(".noload").classList.remove("d-none");
            document.querySelector(".load").classList.add("d-none");
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Location Added!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 5000);
            window.setTimeout(() => {
                location.assign(`/locations`);
            }, 1000);
        }
    } catch (err) {
        document.querySelector(".noload").classList.remove("d-none");
        document.querySelector(".load").classList.add("d-none");
        document.querySelector(".as").classList.add("anim");
        document.querySelector(".as").textContent = err.response.data.message;
        setTimeout(function() {
            document.querySelector(".as").classList.remove("anim");
        }, 3000);
    }
};
export const form_addrole = async(data) => {
    try {
        const cud = localStorage.getItem("jwt");
        console.log("akajsjjjsjsjjsjsjaqkajsjskjakajsjj");
        const res = await axios({
            method: "POST",
            url: `https://bhivee.herokuapp.com/api/v1/admins/Role`,
            data,
            headers: {
                jwt: cud,
            },
        });

        if (res.data.status === "success") {
            document.querySelector(".noload").classList.remove("d-none");
            document.querySelector(".load").classList.add("d-none");
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Role Added!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 5000);
            window.setTimeout(() => {
                location.assign(`/roles`);
            }, 1000);
        }
    } catch (err) {
        document.querySelector(".noload").classList.remove("d-none");
        document.querySelector(".load").classList.add("d-none");
        document.querySelector(".as").classList.add("anim");
        document.querySelector(".as").textContent = err.response.data.message;
        setTimeout(function() {
            document.querySelector(".as").classList.remove("anim");
        }, 3000);
    }
};

export const form_customized = async(data) => {
    try {
        const cud = localStorage.getItem("jwt");
        console.log("akajsjjjsjsjjsjsjaqkajsjskjakajsjj");
        const res = await axios({
            method: "PATCH",
            url: `https://bhivee.herokuapp.com/api/v1/admins/customizedtheme`,
            data,
            headers: {
                jwt: cud,
            },
        });

        if (res.data.status === "success") {
            const rest = await axios({
                method: "GET",
                url: `https://bhivee.herokuapp.com/api/v1/admins/customizedtheme`,
                data,
                headers: {
                    jwt: cud,
                },
            });
            console.log(rest.data.data.logo);
            document.querySelector(".noload84").classList.remove("d-none");
            document.querySelector(".load84").classList.add("d-none");
            if (rest.data.data.logo) {
                document.querySelector(".logos").value = "";
                console.log("hahah");
                document.querySelector(".liga").src = rest.data.data.logo;
            }
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Theme Changed!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 5000);
            document.querySelector(".okssssss").setAttribute("readonly", "readonly");
            // window.setTimeout(() => {
            //     location.assign(`/customizedtheme`);
            // }, 1000);
            // window.setTimeout(() => {
            //     location.assign(`/customizedtheme`);
            // }, 1000);
        }
    } catch (err) {
        document.querySelector(".noload").classList.remove("d-none");
        document.querySelector(".load").classList.add("d-none");
        document.querySelector(".as").classList.add("anim");
        document.querySelector(".as").textContent = err.response.data.message;
        setTimeout(function() {
            document.querySelector(".as").classList.remove("anim");
        }, 3000);
        // let erur = err.response.data.message;
        // const regEx = /^User validation failed: email:/;
        // if (regEx.test(erur)) {
        //     document.querySelector(".as").classList.add("anim");
        //     document.querySelector(".as").textContent = erur.split("email:")[1];
        //     setTimeout(function() {
        //         document.querySelector(".as").classList.remove("anim");
        //     }, 3000);
        // }
        // // showAlert("error", err.response.data.message);
    }
};

export const form_colorbars = async(data) => {
    try {
        const cud = localStorage.getItem("jwt");
        console.log("akajsjjjsjsjjsjsjaqkajsjskjakajsjj");
        const res = await axios({
            method: "PATCH",
            url: `https://bhivee.herokuapp.com/api/v1/admins/AddColorBar`,
            data,
            headers: {
                jwt: cud,
            },
        });
        if (res.data.status === "success") {
            document.querySelector(".noload").classList.remove("d-none");
            document.querySelector(".load").classList.add("d-none");
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Colorbar Added!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 5000);
            window.setTimeout(() => {
                location.assign(`/customizedtheme`);
            }, 1000);
            window.setTimeout(() => {
                location.assign(`/customizedtheme`);
            }, 1000);
        }
    } catch (err) {
        document.querySelector(".noload").classList.remove("d-none");
        document.querySelector(".load").classList.add("d-none");
        document.querySelector(".as").classList.add("anim");
        document.querySelector(".as").textContent = err.response.data.message;
        setTimeout(function() {
            document.querySelector(".as").classList.remove("anim");
        }, 3000);
        // let erur = err.response.data.message;
        // const regEx = /^User validation failed: email:/;
        // if (regEx.test(erur)) {
        //     document.querySelector(".as").classList.add("anim");
        //     document.querySelector(".as").textContent = erur.split("email:")[1];
        //     setTimeout(function() {
        //         document.querySelector(".as").classList.remove("anim");
        //     }, 3000);
        // }
        // // showAlert("error", err.response.data.message);
    }
};
export const form_passes = async(data) => {
    try {
        const cud = localStorage.getItem("jwt");
        const userid = localStorage.getItem("usedidse");
        console.log("akajsjjjsjsjjsjsjaqkajsjskjakajsjj");
        console.log(userid);
        const res = await axios({
            method: "PATCH",
            url: `https://bhivee.herokuapp.com/api/v1/admins/user/changepassword/${userid}`,
            data,
            headers: {
                jwt: cud,
            },
        });
        if (res.data.status === "success") {
            document.querySelector(".noload2").classList.remove("d-none");
            document.querySelector(".load2").classList.add("d-none");
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Password Updated!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
            window.setTimeout(() => {
                location.assign(`/staff`);
            }, 500);
        }
    } catch (err) {
        document.querySelector(".noload2").classList.remove("d-none");
        document.querySelector(".load2").classList.add("d-none");
        document.querySelector(".as").classList.add("anim");
        document.querySelector(".as").textContent = err.response.data.message;
        setTimeout(function() {
            document.querySelector(".as").classList.remove("anim");
        }, 3000);
        // let erur = err.response.data.message;
        // const regEx = /^User validation failed: email:/;
        // if (regEx.test(erur)) {
        //     document.querySelector(".as").classList.add("anim");
        //     document.querySelector(".as").textContent = erur.split("email:")[1];
        //     setTimeout(function() {
        //         document.querySelector(".as").classList.remove("anim");
        //     }, 3000);
        // }
        // // showAlert("error", err.response.data.message);
    }
};
export const form_editastaff = async(data) => {
    try {
        const cud = localStorage.getItem("jwt");
        const userid = localStorage.getItem("useriod");
        console.log(cud);
        const res = await axios({
            method: "PATCH",
            url: `https://bhivee.herokuapp.com/api/v1/admins/user/${userid}`,
            data,
            headers: {
                jwt: cud,
            },
        });
        if (res.data.status === "success") {
            document.querySelector(".noload").classList.remove("d-none");
            document.querySelector(".load").classList.add("d-none");
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Staff Edited!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
            window.setTimeout(() => {
                location.assign(`/staff`);
            }, 500);
        }
    } catch (err) {
        document.querySelector(".noload3").classList.remove("d-none");
        document.querySelector(".load3").classList.add("d-none");
        console.log(err.response.data.message);
        document.querySelector(".as").classList.add("anim");
        document.querySelector(".as").textContent = err.response.data.message;
        setTimeout(function() {
            document.querySelector(".as").classList.remove("anim");
        }, 3000);
        // let erur = err.response.data.message;
        // const regEx = /^User validation failed: email:/;
        // if (regEx.test(erur)) {
        //     document.querySelector(".as").classList.add("anim");
        //     document.querySelector(".as").textContent = erur.split("email:")[1];
        //     setTimeout(function() {
        //         document.querySelector(".as").classList.remove("anim");
        //     }, 3000);
        // }
        // // showAlert("error", err.response.data.message);
    }
};

export const form_addstaff = async(data) => {
    try {
        const cud = localStorage.getItem("jwt");
        console.log(cud);
        const res = await axios({
            method: "POST",
            url: `https://bhivee.herokuapp.com/api/v1/admins/user`,
            data,
            headers: {
                jwt: cud,
            },
        });
        if (res.data.status === "success") {
            document.querySelector(".noload").classList.remove("d-none");
            document.querySelector(".load").classList.add("d-none");
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Staff Added!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
            window.setTimeout(() => {
                location.assign(`/staff`);
            }, 500);
            // // localStorage.removeItem("asdf");

            // // console.log(res.data);
            // document.querySelector(".noload2").classList.remove("d-none");
            // document.querySelector(".load2").classList.add("d-none");
            // // document.querySelector(".as").classList.add("anim");
            // // document.querySelector(".as").textContent = "Code Verified!";
            // // setTimeout(function() {
            // //     document.querySelector(".as").classList.remove("anim");
            // // }, 3000);
            // // window.setTimeout(() => {
            // //     location.assign(`/Resetpassword`);
            // // }, 500);
            // // window.setTimeout(() => {
            // //     location.assign("/dashboard");
            // // }, 1500);

            // //aa
            // // showAlert("success", "Logged In Successfully!");
        }
        // console.log(res);
    } catch (err) {
        document.querySelector(".noload").classList.remove("d-none");
        document.querySelector(".load").classList.add("d-none");
        // console.log(err.response.data.message);
        // document.querySelector(".noload2").classList.remove("d-none");
        // document.querySelector(".load2").classList.add("d-none");
        // console.log(err.response.data.message);
        let erur = err.response.data.message;
        const regEx = /^User validation failed: email:/;
        if (regEx.test(erur)) {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = erur.split("email:")[1];
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        }
        // // showAlert("error", err.response.data.message);
    }
};

export const form_profilePassword = async(data) => {
    try {
        const cud = localStorage.getItem("jwt");
        console.log(cud);
        const res = await axios({
            method: "PATCH",
            url: `https://bhivee.herokuapp.com/api/v1/admins/updatepassword`,
            data,
            headers: {
                jwt: cud,
            },
        });
        if (res.data.status === "success") {
            console.log("updated");
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Password Updated!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
            // localStorage.removeItem("asdf");

            // console.log(res.data);
            document.querySelector(".noload2").classList.remove("d-none");
            document.querySelector(".load2").classList.add("d-none");
            // document.querySelector(".as").classList.add("anim");
            // document.querySelector(".as").textContent = "Code Verified!";
            // setTimeout(function() {
            //     document.querySelector(".as").classList.remove("anim");
            // }, 3000);
            // window.setTimeout(() => {
            //     location.assign(`/Resetpassword`);
            // }, 500);
            // window.setTimeout(() => {
            //     location.assign("/dashboard");
            // }, 1500);

            //aa
            // showAlert("success", "Logged In Successfully!");
        }
        // console.log(res);
    } catch (err) {
        document.querySelector(".noload2").classList.remove("d-none");
        document.querySelector(".load2").classList.add("d-none");
        console.log(err.response.data.message);
        document.querySelector(".as").classList.add("anim");
        document.querySelector(".as").textContent = err.response.data.message;
        setTimeout(function() {
            document.querySelector(".as").classList.remove("anim");
        }, 3000);
        // showAlert("error", err.response.data.message);
    }
};

export const form_profile = async(data) => {
    try {
        const cud = localStorage.getItem("jwt");
        console.log(cud);
        const res = await axios({
            method: "PATCH",
            url: `https://bhivee.herokuapp.com/api/v1/admins/me`,
            data,
            headers: {
                jwt: cud,
            },
        });
        if (res.data.status === "success") {
            console.log("updated");
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Profile Updated!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
            // localStorage.removeItem("asdf");

            // console.log(res.data);
            document.querySelector(".noload").classList.remove("d-none");
            document.querySelector(".load").classList.add("d-none");
            // document.querySelector(".as").classList.add("anim");
            // document.querySelector(".as").textContent = "Code Verified!";
            // setTimeout(function() {
            //     document.querySelector(".as").classList.remove("anim");
            // }, 3000);
            // window.setTimeout(() => {
            //     location.assign(`/Resetpassword`);
            // }, 500);
            // window.setTimeout(() => {
            //     location.assign("/dashboard");
            // }, 1500);

            //aa
            // showAlert("success", "Logged In Successfully!");
        }
        // console.log(res);
    } catch (err) {
        document.querySelector(".noload").classList.remove("d-none");
        document.querySelector(".load").classList.add("d-none");
        console.log(err);
        // document.querySelector(".as").classList.add("anim");
        // document.querySelector(".as").textContent = "Invalid Code!";
        // setTimeout(function() {
        //     document.querySelector(".as").classList.remove("anim");
        // }, 3000);
        // showAlert("error", err.response.data.message);
    }
};
export const form_Resets = async(data, data3) => {
    try {
        const cud = localStorage.getItem("adminid");
        const res = await axios({
            method: "POST",
            url: `https://bhivee.herokuapp.com/api/v1/admins/resetpassword/${cud}`,
            data,
        });
        let data2 = "";
        let pass = "";
        console.log(res);
        console.log(res.data.status);

        if (res.data.status === "success") {
            document.querySelector(".noload").classList.remove("d-none");
            document.querySelector(".load").classList.add("d-none");
            // console.log(res.data);
            data2 = res.data.data;

            let ema = String(data2.email);
            pass = data.get("password");
            let pa = String(pass);
            ema = ema.replace(/\s+/g, ""); // "thiscontainsspaces"
            pa = pa.replace(/\s+/g, ""); // "thiscontainsspaces"
            data3.append("email", ema);
            data3.append("password", pa);
            console.log(data3.get("email"));
            console.log(data3.get("password"));
            const res2 = await axios({
                method: "POST",
                url: `https://bhivee.herokuapp.com/api/v1/admins/login2`,
                data: data3,
            });
            console.log(res2);
            localStorage.setItem("jwt", res2.data.token);

            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent =
                "Password Reset Successfully!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
            window.setTimeout(() => {
                location.assign("/profile");
            }, 1500);
            // //aa
            // // showAlert("success", "Logged In Successfully!");
        }

        // console.log(res);
    } catch (err) {
        // document.querySelector(".noload").classList.remove("d-none");
        // document.querySelector(".load").classList.add("d-none");
        // let error = err.response.data.message;
        console.log(err.response.data);
        // error = error.split(".");
        // error = error[1];
        // error = error.replace(/\s+/g, " ").trim();
        // document.querySelector(".as").classList.add("anim");
        // document.querySelector(".as").textContent = error;
        // setTimeout(function() {
        //     document.querySelector(".as").classList.remove("anim");
        // }, 3000);
        // showAlert("error", err.response.data.message);
    }
};
export const form_code = async(code) => {
    try {
        const cud = localStorage.getItem("asdf");
        const res = await axios({
            method: "POST",
            url: `https://bhivee.herokuapp.com/api/v1/admins/forgotpasswordverify/${code}`,
            headers: {
                code: cud,
            },
        });
        if (res.data.status === "success") {
            localStorage.removeItem("asdf");

            console.log(res.data);
            document.querySelector(".noload").classList.remove("d-none");
            document.querySelector(".load").classList.add("d-none");
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Code Verified!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
            window.setTimeout(() => {
                location.assign(`/Resetpassword`);
            }, 500);
            // window.setTimeout(() => {
            //     location.assign("/dashboard");
            // }, 1500);

            //aa
            // showAlert("success", "Logged In Successfully!");
        }
        // console.log(res);
    } catch (err) {
        document.querySelector(".noload").classList.remove("d-none");
        document.querySelector(".load").classList.add("d-none");
        console.log(err);
        document.querySelector(".as").classList.add("anim");
        document.querySelector(".as").textContent = "Invalid Code!";
        setTimeout(function() {
            document.querySelector(".as").classList.remove("anim");
        }, 3000);
        // showAlert("error", err.response.data.message);
    }
};

export const form_email = async(email) => {
    try {
        const res = await axios({
            method: "POST",
            url: `https://bhivee.herokuapp.com/api/v1/admins/forgotpassword/${email}`,
        });
        console.log(res.data);

        if (res.data.status === "Email sent successfully") {
            document.querySelector(".noload").classList.remove("d-none");
            document.querySelector(".load").classList.add("d-none");
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Email sent successfully";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
            localStorage.setItem("asdf", res.data.verificationcode);
            localStorage.setItem("adminid", res.data.adminid);
            // document.querySelector(".asdf").textContent = res.data.verificationcode;
            window.setTimeout(() => {
                location.assign(`/VerificationCode`);
            }, 500);
        }
        // console.log(res);
    } catch (err) {
        console.log(err.response.data.message);
        if (err.response.data.message === "Email is incorrect") {
            document.querySelector(".noload").classList.remove("d-none");
            document.querySelector(".load").classList.add("d-none");
            document.querySelector(".as").classList.add("anim");
            document.querySelector(
                ".as"
            ).textContent = `${err.response.data.message}`;
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        }
    }
};

export const form_signup = async(data) => {
    try {
        const res = await axios({
            method: "POST",
            url: "https://bhivee.herokuapp.com/api/v1/admins/signup2",
            data,
        });
        console.log();
        if (res.data.status === "success") {

            localStorage.setItem("jwt", res.data.token);

            window.setTimeout(() => {
                location.assign("/Profile");
            }, 1500);
            document.querySelector(".noload").classList.remove("d-none");
            document.querySelector(".load").classList.add("d-none");
            console.log(res.data);
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Signup Successful";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
            window.setTimeout(() => {
                location.assign("/profile");
            }, 1500);

            //aa
            // showAlert("success", "Logged In Successfully!");
        }
        // console.log(res);
    } catch (err) {
        document.querySelector(".noload").classList.remove("d-none");
        document.querySelector(".load").classList.add("d-none");
        let error = err.response.data.message;
        console.log(error);
        error = error.split(".");
        error = error[1];
        error = error.replace(/\s+/g, " ").trim();
        document.querySelector(".as").classList.add("anim");
        document.querySelector(".as").textContent = error;
        setTimeout(function() {
            document.querySelector(".as").classList.remove("anim");
        }, 3000);
        // showAlert("error", err.response.data.message);
    }
};

export const form_login = async(data) => {
    try {
        const res = await axios({
            method: "POST",
            url: "https://bhivee.herokuapp.com/api/v1/admins/login2",
            data,
        });
        if (res.data.status === "success") {
            console.log(res.data);
            localStorage.setItem("jwt", res.data.token);

            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Login Successful";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
            document.querySelector(".noload").classList.remove("d-none");
            document.querySelector(".load").classList.add("d-none");
            window.setTimeout(() => {
                location.assign("/Profile");
            }, 1500);

            //aa
            // showAlert("success", "Logged In Successfully!");
        }
        // console.log(res);
    } catch (err) {
        document.querySelector(".as").classList.add("anim");
        document.querySelector(".as").textContent = err.response.data.message;
        setTimeout(function() {
            document.querySelector(".as").classList.remove("anim");
        }, 3000);
        document.querySelector(".noload").classList.remove("d-none");
        document.querySelector(".load").classList.add("d-none");
        console.log(err);
        // showAlert("error", err.response.data.message);
    }
};