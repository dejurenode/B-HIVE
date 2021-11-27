import {
    form_login,
    form_signup,
    form_email,
    form_code,
    form_Resets,
    form_profile,
    form_profilePassword,
    form_addstaff,
    form_editastaff,
    form_passes,
    form_colorbars,
    form_customized,
    form_addrole,
    form_addLocation,
} from "./axiosrequests.js";
const formlogin = document.querySelector(".form-login");
const formsignup = document.querySelector(".form-signup");
const emails = document.querySelector(".emails");
const verifys = document.querySelector(".verify");
const resetdone = document.querySelector(".resetdone");
const profileupdate = document.querySelector(".profileupdate");
const passwordprof = document.querySelector(".passwordprof");
const addingssta = document.querySelector(".addingssta");
const editsStuff = document.querySelector(".editsStuff");
const chungPussword = document.querySelector(".chungPussword");
const addcolabur = document.querySelector(".addcolabur");
const addTheme = document.querySelector(".addTheme");
const addrule = document.querySelector(".addroles");
const addlocation = document.querySelector(".addlocations");
if (addlocation) {
    addlocation.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData();
        if (document.querySelector(".alifing").value) {
            data.append("name", document.querySelector(".alifing").value);
            data.append("lat", 2);
            data.append("lng", 2);
            document.querySelector(".noload").classList.add("d-none");
            document.querySelector(".load").classList.remove("d-none");
            form_addLocation(data);
        } else {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Please enter location name";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        }
    });
}
if (addrule) {
    addrule.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData();
        if (document.querySelector(".alifing").value) {
            data.append("name", document.querySelector(".alifing").value);
            document.querySelector(".noload").classList.add("d-none");
            document.querySelector(".load").classList.remove("d-none");
            form_addrole(data);
        } else {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Please enter roll name";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        }
    });
}

function isHexColor(hex) {
    return typeof hex === 'string' &&
        hex.length === 6 &&
        !isNaN(Number('0x' + hex))
}
if (addTheme) {
    addTheme.addEventListener("submit", (e) => {
        e.preventDefault();

        const data = new FormData();
        if (document.querySelector(".okssssss").value) {
            data.append("companyname", document.querySelector(".okssssss").value);
        }
        if (document.querySelector(".uniqueidentifier").value) {
            data.append(
                "uniqueidentifierterm",
                document.querySelector(".uniqueidentifier").value
            );
        }

        if (document.querySelector(".uniquenameterm").value) {
            data.append(
                "unitnameterm",
                document.querySelector(".uniquenameterm").value
            );
        }
        if (document.querySelector(".firstscanterm").value) {
            data.append(
                "firstscanterm",
                document.querySelector(".firstscanterm").value
            );
        }
        if (document.querySelector(".datafield1").value) {
            data.append("datafield1", document.querySelector(".datafield1").value);
        }
        if (document.querySelector(".datafield2").value) {
            data.append("datafield2", document.querySelector(".datafield2").value);
        }
        if (document.querySelector(".datafield3").value) {
            data.append("datafield3", document.querySelector(".datafield3").value);
        }
        if (document.querySelector(".datafield4").value) {
            data.append("datafield4", document.querySelector(".datafield4").value);
        }
        if (document.querySelector(".appencolo").value) {
            data.append("color", document.querySelector(".appencolo").value);
        }

        console.log(document.querySelector(".logos").files[0]);
        let coltofind = document.querySelector(".appencolo").value;
        console.log(isHexColor(coltofind.substring(1)));
        let io = isHexColor(coltofind.substring(1));

        if (document.querySelector(".logos").files[0]) {
            data.append("logo", document.querySelector(".logos").files[0]);
        }
        if (!document.querySelector(".datafield4").value ||
            !document.querySelector(".datafield3").value ||
            !document.querySelector(".datafield2").value ||
            !document.querySelector(".datafield1").value ||
            !document.querySelector(".firstscanterm").value ||
            !document.querySelector(".uniquenameterm").value ||
            !document.querySelector(".uniqueidentifier").value ||
            !document.querySelector(".okssssss").value ||
            !document.querySelector(".appencolo").value
        ) {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Please fill form correctly.";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        } else if (!io) {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Invalid Theme Color.";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        } else {
            document.querySelector(".noload84").classList.add("d-none");
            document.querySelector(".load84").classList.remove("d-none");
            form_customized(data);
        }
    });
}
if (addcolabur) {
    addcolabur.addEventListener("submit", (e) => {
        const data = new FormData();
        if (document.querySelector(".appencolo2").value) {
            data.append("color", document.querySelector(".appencolo2").value);
        }
        if (document.querySelector(".culsname").value) {
            data.append("name", document.querySelector(".culsname").value);
        }
        if (!document.querySelector(".culsname").value) {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Name Is Required!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        }
        if (!document.querySelector(".appencolo2").value) {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Color Is Required!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        }
        if (
            document.querySelector(".appencolo2").value &&
            document.querySelector(".culsname").value
        ) {
            document.querySelector(".noload").classList.add("d-none");
            document.querySelector(".load").classList.remove("d-none");
            form_colorbars(data);
        }
    });
}
if (chungPussword) {
    chungPussword.addEventListener("click", (e) => {
        // alert("aajjs");
        const data = new FormData();
        if (document.querySelector(".oldiChung").value) {
            data.append(
                "passwordCurrent",
                document.querySelector(".oldiChung").value
            );
        }
        if (document.querySelector(".newiChung").value) {
            data.append("password", document.querySelector(".newiChung").value);
        }
        if (!document.querySelector(".newiChung").value) {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "New Password required!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        }
        if (!document.querySelector(".oldiChung").value) {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "New Old required!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        }
        if (
            document.querySelector(".oldiChung").value &&
            document.querySelector(".newiChung").value
        ) {
            document.querySelector(".noload2").classList.add("d-none");
            document.querySelector(".load2").classList.remove("d-none");
            form_passes(data);
        }
    });
}
if (editsStuff) {
    editsStuff.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData();
        localStorage.setItem("useriod", document.querySelector(".idEdit").value);
        if (document.querySelector(".firstEdit").value) {
            data.append("firstname", document.querySelector(".firstEdit").value);
        }
        if (document.querySelector(".LastEdit").value) {
            data.append("lastname", document.querySelector(".LastEdit").value);
        }
        var selectlocation = document.querySelector(".locationnameedit");

        if (
            selectlocation.options[selectlocation.selectedIndex].getAttribute(
                "data-id"
            )
        ) {
            let locationssap =
                selectlocation.options[selectlocation.selectedIndex].getAttribute(
                    "value"
                );
            if (locationssap === "nolocation") {
                document.querySelector(".as").classList.add("anim");
                document.querySelector(".as").textContent = "Location required!";
                setTimeout(function() {
                    document.querySelector(".as").classList.remove("anim");
                }, 3000);
            } else {
                data.append(
                    "location",
                    selectlocation.options[selectlocation.selectedIndex].getAttribute(
                        "data-id"
                    )
                );
            }
        }
        if (!document.querySelector(".pltume2").classList.contains("d-none")) {
            var selecttame = document.querySelector(".tume2");
            if (
                selecttame.options[selecttame.selectedIndex].getAttribute("data-id")
            ) {
                let teamssap =
                    selecttame.options[selecttame.selectedIndex].getAttribute("value");
                if (teamssap === "noteam") {
                    document.querySelector(".as").classList.add("anim");
                    document.querySelector(".as").textContent = "Team required!";
                    setTimeout(function() {
                        document.querySelector(".as").classList.remove("anim");
                    }, 3000);
                } else {
                    data.append(
                        "team",
                        selecttame.options[selecttame.selectedIndex].getAttribute("data-id")
                    );
                }
            }
        }
        var selectrale = document.querySelector(".rulings");
        if (selectrale.options[selectrale.selectedIndex].getAttribute("data-id")) {
            let teamssap =
                selectrale.options[selectrale.selectedIndex].getAttribute("value");
            if (teamssap === "norule") {
                document.querySelector(".as").classList.add("anim");
                document.querySelector(".as").textContent = "Role required!";
                setTimeout(function() {
                    document.querySelector(".as").classList.remove("anim");
                }, 3000);
            } else {
                data.append(
                    "role",
                    selectrale.options[selectrale.selectedIndex].getAttribute("data-id")
                );
            }
        }
        if (document.querySelector(".firstEdit").value.length == 0) {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "First Name is required";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        }
        if (document.querySelector(".lastEdit").value.length == 0) {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Last Name is required";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        }
        if (
            (data.get("location").length > 0 &&
                data.get("role").length > 0 &&
                data.get("firstname").length > 0 &&
                data.get("lastname").length > 0) ||
            data.get("team").length > 0
        ) {
            document.querySelector(".noload3").classList.add("d-none");
            document.querySelector(".load3").classList.remove("d-none");
            form_editastaff(data);
        }
    });
}

if (addingssta) {
    addingssta.addEventListener("submit", (e) => {
        console.log("hihi");
        e.preventDefault();
        const data = new FormData();
        if (document.querySelector(".firstname").value) {
            data.append("firstname", document.querySelector(".firstname").value);
        }
        if (document.querySelector(".lastname").value) {
            data.append("lastname", document.querySelector(".lastname").value);
        }
        if (document.querySelector(".emails").value) {
            data.append("email", document.querySelector(".emails").value);
        }
        if (document.querySelector(".pisswords").value) {
            data.append("password", document.querySelector(".pisswords").value);
        }
        var select = document.querySelector(".locationname");
        var location = select.options[select.selectedIndex].value;
        console.log(location); // en
        if (location === "nolocation") {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Location required!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        } else {
            data.append(
                "location",
                select.options[select.selectedIndex].getAttribute("data-id")
            );
        }
        var selectrule = document.querySelector(".rule");
        var rule = selectrule.options[selectrule.selectedIndex].value;
        console.log(rule); // en
        if (rule === "norule") {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Role required!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        } else {
            data.append(
                "role",
                selectrule.options[selectrule.selectedIndex].getAttribute("data-id")
            );
        }
        var selectteam = document.querySelector(".tume");
        var team = selectteam.options[selectteam.selectedIndex].value;
        console.log(team); // en
        if (team === "noteam") {
            // data.append(
            //     "location",
            //     select.options[select.selectedIndex].getAttribute("data-id")
            // );
        } else {
            data.append(
                "team",
                selectteam.options[selectteam.selectedIndex].getAttribute("data-id")
            );
        }
        console.log(data.get("location"));
        console.log(data.get("role"));
        console.log(data.get("team"));
        console.log(data.get("email"));
        console.log(data.get("password"));
        console.log(data.get("firstname"));
        console.log(data.get("lastname"));
        if (
            (data.get("location") &&
                data.get("role") &&
                data.get("email") &&
                data.get("password") &&
                data.get("firstname") &&
                data.get("lastname")) ||
            data.get("team")
        ) {
            document.querySelector(".noload").classList.add("d-none");
            document.querySelector(".load").classList.remove("d-none");
            form_addstaff(data);
        }
    });
}
if (passwordprof) {
    passwordprof.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData();
        if (document.querySelector(".oldi").value) {
            data.append("passwordCurrent", document.querySelector(".oldi").value);
        }
        if (document.querySelector(".newi").value) {
            data.append("password", document.querySelector(".newi").value);
        }
        if (
            document.querySelector(".oldi").value.length == 0 &&
            document.querySelector(".newi").value.length == 0
        ) {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent =
                "Current password and new pasword are required!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        }
        if (
            document.querySelector(".oldi").value.length == 0 &&
            document.querySelector(".newi").value.length > 0
        ) {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent =
                "Current password is required!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        }
        if (
            document.querySelector(".oldi").value.length > 0 &&
            document.querySelector(".newi").value.length == 0
        ) {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "New password is required!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        }
        if (
            document.querySelector(".newi").value.length > 0 &&
            document.querySelector(".newi").value.length > 0
        ) {
            document.querySelector(".noload2").classList.add("d-none");
            document.querySelector(".load2").classList.remove("d-none");
            form_profilePassword(data);
        }
    });
}

if (profileupdate) {
    profileupdate.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData();
        if (document.querySelector(".profilename").value) {
            data.append("name", document.querySelector(".profilename").value);
        }
        if (document.querySelector(".profilephone").value) {
            data.append("phone", document.querySelector(".profilephone").value);
        }
        document.querySelector(".noload").classList.add("d-none");
        document.querySelector(".load").classList.remove("d-none");
        form_profile(data);
    });
}

if (verifys) {
    verifys.addEventListener("submit", (e) => {
        e.preventDefault();
        // alert("hj");
        const data = new FormData();
        let abssss = document.querySelector(".code").value;
        console.log(document.querySelector(".code").value);
        data.append("code", document.querySelector(".code").value);
        console.log(data);
        if (!document.querySelector(".code").value) {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent =
                "Verification Code is required!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        } else {
            document.querySelector(".noload").classList.add("d-none");
            document.querySelector(".load").classList.remove("d-none");
            form_code(abssss);
        }
    });
}

if (resetdone) {
    resetdone.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = new FormData();
        const data10 = new FormData();
        console.log(document.querySelector(".password").value);
        console.log(document.querySelector(".confirmpassword").value);
        data.append("password", document.querySelector(".password").value);

        console.log(data);
        if (!document.querySelector(".password").value) {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Password is required!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        }
        if (!document.querySelector(".confirmpassword").value) {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent =
                "Password Confirm is required!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        }
        if (
            Number(document.querySelector(".confirmpassword").value) ===
            Number(document.querySelector(".password").value)
        ) {
            document.querySelector(".noload").classList.add("d-none");
            document.querySelector(".load").classList.remove("d-none");
            form_Resets(data, data10);
        } else {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent =
                "Password and confirm passsword not matched";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        }
    });
}
if (emails) {
    emails.addEventListener("submit", (e) => {
        console.log("ii");
        e.preventDefault();
        // alert("hj");
        const data = new FormData();
        console.log(document.querySelector(".email").value);
        data.append("email", document.querySelector(".email").value);
        console.log(data);
        let abca = document.querySelector(".email").value;
        if (!document.querySelector(".email").value) {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Email is required!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        }
        //aaa
        document.querySelector(".noload").classList.add("d-none");
        document.querySelector(".load").classList.remove("d-none");
        form_email(abca);
    });
}
if (formsignup) {
    formsignup.addEventListener("submit", (e) => {
        e.preventDefault();
        // alert("hj");
        const data = new FormData();
        console.log(document.querySelector(".email").value);
        console.log(document.querySelector(".password").value);
        if (!document.querySelector(".name").value) {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Name is required!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        } else if (!document.querySelector(".email").value) {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Email is required!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        } else if (!document.querySelector(".password").value) {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Password is required!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        } else if (!document.querySelector(".confirm").value) {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent =
                "Password confirm is required!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        } else if (
            document.querySelector(".password").value !=
            document.querySelector(".confirm").value
        ) {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent =
                "Password and Confirm password are not same!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        } else {
            data.append("name", document.querySelector(".name").value);
            data.append("email", document.querySelector(".email").value);
            data.append("password", document.querySelector(".password").value);
            console.log(data);
            document.querySelector(".noload").classList.add("d-none");
            document.querySelector(".load").classList.remove("d-none");
            form_signup(data);
        }
    });
}
if (formlogin) {
    formlogin.addEventListener("submit", (e) => {
        e.preventDefault();
        // alert("hj");
        const data = new FormData();
        console.log(document.querySelector(".email").value);
        console.log(document.querySelector(".password").value);
        data.append("email", document.querySelector(".email").value);
        data.append("password", document.querySelector(".password").value);
        console.log(data);
        document.querySelector(".noload").classList.add("d-none");
        document.querySelector(".load").classList.remove("d-none");
        form_login(data);
    });
}