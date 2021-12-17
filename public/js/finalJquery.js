$(document).ready(function() {
    console.log("aaassaajaaajaj");
    if ($("#example").hasClass("table")) {
        $("#example").DataTable();
    }
    $(".clr-picker").css("z-index", "2000");
    $(".oncolor").on("input", function() {
        $(".appencolo").val($(".oncolor").val());
    });
    $(".oncolor2").on("input", function() {
        $(".appencolo2").val($(".oncolor2").val());
    });
    $(document).on('click', '.logust', async function() {
        const cud = localStorage.getItem("jwt");
        document.querySelector(".as").classList.add("anim");
        document.querySelector(".as").textContent = 'Loading...';
        setTimeout(function() {
            document.querySelector(".as").classList.remove("anim");
        }, 13000);
        const res = await axios({
            method: "POST",
            url: `https://bhivee.herokuapp.com/api/v1/admins/logouts`,
            headers: {
                jwt: cud
            }
        });
        console.log(res.data.status);
        if (res.data.status === 'success') {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = 'Logout Done';
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 13000);
            window.setTimeout(() => {
                location.assign(`/`);
            }, 1000);
        }
    });
    $(document).on('click', '.brand-toggle', function() {
        console.log($('.heresligas').hasClass('openha'));
        if ($('.heresligas').hasClass('openha')) {
            $('.heresligas').removeClass('openha');
        } else {
            $('.heresligas').addClass('openha');
        }
    })

    $(document).on("click", ".opa", function() {
        $("#coolorbur").modal("show");
    });

    $(document).on("click", ".obszaa", async function() {
        try {
            document.querySelector(".noload88").classList.add("d-none");
            document.querySelector(".load88").classList.remove("d-none");
            let id = $(this).attr("data-id");
            const cud = localStorage.getItem("jwt");
            const delthis = localStorage.getItem("dola");

            const res = await axios({
                method: "DELETE",
                url: `https://bhivee.herokuapp.com/api/v1/admins/deletecolorbar/${id}`,
                headers: {
                    jwt: cud,
                },
            });
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Colorbar deleted!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 5000);
            if (res.data.status === "success") {
                $(`.${delthis}`).parent().remove();
                document.querySelector(".noload88").classList.remove("d-none");
                document.querySelector(".load88").classList.add("d-none");
                $(".modalssbackdrop").addClass("d-none");
                $("#coolorburDel").modal("hide");
            }
        } catch (err) {
            document.querySelector(".noload88").classList.remove("d-none");
            document.querySelector(".load88").classList.add("d-none");
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = err.response.data.message;
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        }
    });
    $(document).on("click", ".aaedusDel", async function() {
        localStorage.setItem("dola", $(this).attr("data-dola"));

        $(".modalssbackdrop").removeClass("d-none");
        $(".obszaa").attr("data-id", $(this).attr("data-id"));
        $("#coolorburDel").modal("show");
        // const cud = localStorage.getItem("jwt");
        // document.querySelector(".as").classList.add("anim");
        // document.querySelector(".as").textContent = "Processing!";
        // setTimeout(function() {
        //     document.querySelector(".as").classList.remove("anim");
        // }, 5000);
        // let id = $(this).attr("data-id");
        // const res = await axios({
        //     method: "DELETE",
        //     url: `https://bhivee.herokuapp.com/api/v1/admins/deletecolorbar/${id}`,
        //     headers: {
        //         jwt: cud,
        //     },
        // });
        // console.log(res);
    });
    $(document).on("click", ".aaedus", function() {
        $(".okssssss2").attr("readonly", "readonly");
        $(".alif").removeClass("d-flex");
        $(".alif").addClass("d-none");
        $(".ultrass").removeClass("d-none");
        console.log($(this).attr("data-id"));
        $(this).parent().children(".alif").removeClass("d-none");
        $(this).parent().children(".alif").addClass("d-flex");
        $(this).parent().children(".okssssss2").removeAttr("readonly");
        $(this).parent().children(".okssssss2").focus();
        var val = $(this).parent().children(".okssssss2").val(); //store the value of the element
        console.log(val);
        $(this).parent().children(".okssssss2").val(""); //clear the value of the element
        $(this).parent().children(".okssssss2").val(val); //set that value back.
        $(this)
            .parent()
            .children(".obsssdds")
            .children(".ultrass")
            .addClass("d-none");

        $(".pluto").addClass("d-none");

        $(this)
            .parent()
            .children(".obsssdds")
            .children(".pluto")
            .removeClass("d-none");
    });
    $(document).on("click", ".edo", function() {
        console.log($(this).attr("data-role"));
        let id = $(this).attr("data-role");
        window.setTimeout(() => {
            location.assign(`/rolesedit/${id}`);
        }, 1000);
    });
    $(document).on("click", ".edititua", function() {
        $(".okssssss").removeAttr("readonly");
        $(".okssssss").focus();
        let valu = $(".okssssss").val();
        $(".okssssss").val("");
        $(".okssssss").val(valu);
    });
    $(document).on("click", ".cdns", async function() {
        document.querySelector(".noload91").classList.add("d-none");
        document.querySelector(".load91").classList.remove("d-none");
        let id = $(this).attr("data-cdns");
        const cud = localStorage.getItem("jwt");
        const res = await axios({
            method: "DELETE",
            url: `https://bhivee.herokuapp.com/api/v1/admins/deleteroll/${id}`,
            headers: {
                jwt: cud,
            },
        });
        console.log(res.data.status);
        if (res.data.status === "success") {
            document.querySelector(".noload91").classList.remove("d-none");
            document.querySelector(".load91").classList.add("d-none");
            $(".opentodel").parent().parent().remove();
            $(".modalssbackdrop").addClass("d-none");
            $("#EdosDelaModal").modal("hide");
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = res.data.message;
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        }
    });
    $(document).on("click", ".edoDel", function() {
        $(this).addClass("opentodel");
        $(".modalssbackdrop").removeClass("d-none");
        $("#EdosDelaModal").modal("show");
        $(".cdns").attr("data-cdns", $(this).attr("data-role"));
    });
    $(document).on("click", ".obscula", function() {
        $(".oncolor").parent().css("color", $(this).attr("colas"));
        console.log($(".oncolor").attr("value", $(this).attr("colas")));
        $(".appencolo").val($(this).attr("colas"));
    });
    $(document).on("click", ".brand-toggle", function() {
        $(".brand-logo").toggle();
    });
    $(".locationname").change(function() {
        var value = $(this).find(":selected").attr("data-ink");
        // value = "'" + value + "'";
        // value = value.map((item) => {
        //     return JSON.parse(item);
        // });
        let oking = value;
        console.log(typeof oking);
        console.log(JSON.parse(oking));
        let obsa = JSON.parse(oking);
        if (obsa.length > 0) {
            $(".pltume").removeClass("d-none");
            obsa.map((item) => {
                $(".tume").append(
                    `<option value=${item.name} data-id=${item._id}>${item.name}Test</option>`
                );
            });
        }
        // oking.map((item) => {
        //     console.log(item);
        // });
    });
    $(document).on("click", "#checks80", async function() {
        let finalrole = $(this).attr("data-id");

        if ($(this).attr("checked")) {
            $(".yes").html("");
            console.log("removed");
            $(".yes").append(
                `<input id='checks80' data-id=${finalrole} type='checkbox'><label class'm-0' for='checks80' style='font-size: 20px;'>Yes`
            );
            $(".no").html("");
            $(".no").parent().css("margin-top", "-6px");
            console.log("removed");

            $(".no").append(
                `<input id='checks20' data-id=${finalrole}' type='checkbox' checked='checked'><label class'm-0' for='checks20' style='font-size: 20px;'>No`
            );
            const cud = localStorage.getItem("jwt");

            const data = new FormData();
            data.append("Lock", false);
            try {
                const res = await axios({
                    method: "PATCH",
                    url: `https://bhivee.herokuapp.com/api/v1/admins/Role/${finalrole}`,
                    data,
                    headers: {
                        jwt: cud,
                    },
                });
                console.log(res);
                console.log(
                    `https://bhivee.herokuapp.com/api/v1/admins/Role/${finalrole}`
                );
                document.querySelector(".as").classList.add("anim");
                document.querySelector(".as").textContent = "Lock premission is off";
                setTimeout(function() {
                    document.querySelector(".as").classList.remove("anim");
                }, 2000);
            } catch (err) {
                console.log(err.response.data.message);
            }
        } else {
            $(".yes").html("");
            console.log("removed");
            $(".yes").append(
                `<input id='checks80' type='checkbox' data-id=${finalrole} checked='checked'><label class'm-0' for='checks80' style='font-size: 20px;'>Yes`
            );
            $(".no").html("");
            $(".no").parent().css("margin-top", "-6px");

            console.log("removed");
            $(".no").append(
                `<input id='checks20' data-id='${finalrole}' type='checkbox'><label class'm-0' for='checks20' style='font-size: 20px;'>No`
            );
            const cud = localStorage.getItem("jwt");

            const data = new FormData();
            data.append("Lock", true);
            try {
                const res = await axios({
                    method: "PATCH",
                    url: `https://bhivee.herokuapp.com/api/v1/admins/Role/${finalrole}`,
                    data,
                    headers: {
                        jwt: cud,
                    },
                });
                console.log(res);
                console.log(
                    `https://bhivee.herokuapp.com/api/v1/admins/Role/${finalrole}`
                );
                document.querySelector(".as").classList.add("anim");
                document.querySelector(".as").textContent = "Lock premission is on";
                setTimeout(function() {
                    document.querySelector(".as").classList.remove("anim");
                }, 2000);
            } catch (err) {
                console.log(err.response.data.message);
            }
        }
    });
    $(document).on("click", "#checks20", async function() {
        let finalrole = $(this).attr("data-id");
        if ($(this).attr("checked")) {
            $(".no").html("");
            console.log("removed");
            $(".no").append(
                `<input id='checks20' data-id=${finalrole} type='checkbox'><label class='m-0' for='checks20' style='font-size: 20px;'>No`
            );
            $(".yes").html("");
            $(".no").parent().css("margin-top", "-6px");
            console.log("removed");

            $(".yes").append(
                `<input id='checks80' data-id=${finalrole} type='checkbox' checked='checked'><label class'm-0' for='checks80' style='font-size: 20px;'>Yes`
            );
            const cud = localStorage.getItem("jwt");

            const data = new FormData();
            data.append("Lock", true);
            try {
                const res = await axios({
                    method: "PATCH",
                    url: `https://bhivee.herokuapp.com/api/v1/admins/Role/${finalrole}`,
                    data,
                    headers: {
                        jwt: cud,
                    },
                });
                console.log(res);
                console.log(data.get("Lock"));
                document.querySelector(".as").classList.add("anim");
                document.querySelector(".as").textContent = "Lock premission is on";
                setTimeout(function() {
                    document.querySelector(".as").classList.remove("anim");
                }, 2000);
            } catch (err) {
                console.log(err.response.data.message);
            }
        } else {
            $(".no").html("");
            console.log("true");
            $(".no").append(
                `<input id='checks20' data-id=${finalrole} type='checkbox' checked='checked'><label class'm-0' for='checks20' style='font-size: 20px;'>No`
            );
            $(".yes").html("");
            $(".no").parent().css("margin-top", "-6px");

            $(".yes").append(
                `<input id='checks80' data-id=${finalrole} type='checkbox'><label class'm-0' for='checks80' style='font-size: 20px;'>Yes`
            );
            const cud = localStorage.getItem("jwt");

            const data = new FormData();
            data.append("Lock", false);
            try {
                const res = await axios({
                    method: "PATCH",
                    url: `https://bhivee.herokuapp.com/api/v1/admins/Role/${finalrole}`,
                    data,
                    headers: {
                        jwt: cud,
                    },
                });
                console.log(res);
                console.log(
                    `https://bhivee.herokuapp.com/api/v1/admins/Role/${finalrole}`
                );
                document.querySelector(".as").classList.add("anim");
                document.querySelector(".as").textContent = "Lock premission is off";
                setTimeout(function() {
                    document.querySelector(".as").classList.remove("anim");
                }, 2000);
            } catch (err) {
                console.log(err.response.data.message);
            }
        }
    });
    $(document).on("click", ".opa", function() {
        $(".modalssbackdrop").removeClass("d-none");
    });
    $(document).on("click", ".butas", function() {
        if ($(this).hasClass("opentodel")) {
            $(this).removeClass("opentodel");
        }
        $(".modalssbackdrop").addClass("d-none");
    });
    $(document).on("click", ".opasaha", function() {
        $("#deleteModal").modal("show");
        $(".modalssbackdrop").removeClass("d-none");
        $(".okabab").attr("data-id", $(this).attr("data-id"));
    });
    $(document).on("click", ".opasa", function() {
        $(".modalssbackdrop").removeClass("d-none");
        $("#deleteModal").modal("show");
    });
    $(document).on("click", ".abcd", function() {
        $(this).toggleClass("bgOran");
    });
    $(document).on("click", ".okaaxx", function() {
        alert("hjo");
    });
    $(document).on("click", ".okaal", function() {
        let target = $(this).parent().children(".janda");
        target.removeAttr("readonly");
        target.removeAttr("disabled");
        let abc = target.val();
        target.val("");
        target.val(abc);
        target.focus();
        $(this).parent().children(".edabuta").removeClass("d-none");
    });
    $(".janda").keyup(function() {
        $(this).attr("db-change", $(this).val());
    });
    $(".numa").keyup(function() {
        $(this).attr("db-change", $(this).val());
    });
    $(document).on("click", ".edabuta", async function() {
        const cud = localStorage.getItem("jwt");
        let locationid = $(this).attr("data-opa");
        let teamid = $(this).attr("data-id");
        console.log(teamid, locationid);
        const data = new FormData();
        if (!$(this).parent().children(".janda").attr("db-change")) {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Nothing Changed!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 2000);
            $(this).parent().children(".janda").attr("disabled", "disabled");
            $(this).parent().children(".janda").attr("readonly", "readonly");
            $(this).addClass("d-none");
        } else {
            document
                .querySelector(`.noload99${$(this).attr("data-obaa")}`)
                .classList.add("d-none");
            document
                .querySelector(`.load99${$(this).attr("data-obaa")}`)
                .classList.remove("d-none");
            console.log($(this).parent().children(".janda").attr("db-change"));
            data.append(
                "name",
                $(this).parent().children(".janda").attr("db-change")
            );

            const res = await axios({
                method: "PATCH",
                url: `https://bhivee.herokuapp.com/api/v1/admins/Team/${teamid}/${locationid}`,
                data,
                headers: {
                    jwt: cud,
                },
            });

            console.log(res);
            if (res.data.status === "success") {
                document.querySelector(".as").classList.add("anim");
                document.querySelector(".as").textContent = "Team name updated!";
                setTimeout(function() {
                    document.querySelector(".as").classList.remove("anim");
                }, 2000);
                document
                    .querySelector(`.noload99${$(this).attr("data-obaa")}`)
                    .classList.remove("d-none");
                document
                    .querySelector(`.load99${$(this).attr("data-obaa")}`)
                    .classList.add("d-none");
                $(this).parent().children(".janda").attr("disabled", "disabled");
                $(this).parent().children(".janda").attr("readonly", "readonly");
                $(this).addClass("d-none");
            } else {
                document
                    .querySelector(`.noload99${$(this).attr("data-obaa")}`)
                    .classList.remove("d-none");
                document
                    .querySelector(`.load99${$(this).attr("data-obaa")}`)
                    .classList.add("d-none");
            }
        }
    });
    $(document).on("click", ".okabab", async function() {
        const data = new FormData();
        if (!$(".alifing").val()) {
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Team name required!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 2000);
        } else {
            data.append("team", $(".alifing").val());
            const cud = localStorage.getItem("jwt");
            let id = $(this).attr("data-id");
            document.querySelector(`.noload`).classList.add("d-none");
            document.querySelector(`.load`).classList.remove("d-none");
            const res = await axios({
                method: "PATCH",
                url: `https://bhivee.herokuapp.com/api/v1/admins/Locations/${id}`,
                data,
                headers: {
                    jwt: cud,
                },
            });
            console.log(res);
            document.querySelector(`.noload`).classList.remove("d-none");
            document.querySelector(`.load`).classList.add("d-none");
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Team added!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 2000);
            window.setTimeout(() => {
                location.reload();
            }, 1000);
        }
    });
    $(document).on("click", ".okchange", function() {
        if ($(this).children("span").hasClass("down")) {
            $(this).children("span").addClass("up");
            $(this).children("span").removeClass("down");
            $(this).children("span").html('<i class="fas fa-chevron-up"></i>');
        } else if ($(this).children("span").hasClass("up")) {
            $(this).children("span").addClass("down");
            $(this).children("span").removeClass("up");
            $(this).children("span").html('<i class="fas fa-chevron-down"></i>');
        }
        if ($(".openchung").hasClass("d-none")) {
            $(".openchung").removeClass("d-none");
        } else {
            $(".openchung").addClass("d-none");
        }
    });
    $(document).on("click", ".addlocation", function() {
        $(".modalssbackdrop").removeClass("d-none");
        $("#addlocationModal").modal("show");
    });

    $(document).on("mouseenter", ".asd", function() {
        // console.log($(this).children('#videosModal'));
        // alert('aa');
        $(this).children("#videosModal").trigger("play");

        $(this).css("background", "");
        $(this).children("#videosModal").css("opacity", "1");
        $(this).children(".hhh").addClass("d-none");
        $(this).children("#videosModal").attr("controls", "");
    });
    $(document).on("mouseleave", ".asd", function() {
        // console.log($(this).children('#videosModal'));
        // alert('aa');
        $(this).children("#videosModal").trigger("pause");

        $(this).css(
            "background",
            "linear-gradient(to right,rgb(0, 0, 0, 1),rgb(0, 0, 0, 1))"
        );
        $(this).children("#videosModal").css("opacity", "0.5");
        $(this).children(".hhh").removeClass("d-none");
        $(this).children("#videosModal").removeAttr("controls");
    });

    $(document).on("click", "#checks", async function() {
        if ($(this).attr("checked")) {
            $(this).removeAttr("checked");

            const data = new FormData();
            if ($(this).attr("checked")) {
                data.append("create", true);
            } else {
                data.append("create", false);
            }
            if ($("#checks5").attr("checked")) {
                data.append("edit", true);
            } else {
                data.append("edit", false);
            }
            if ($("#checks4").attr("checked")) {
                data.append("view", true);
            } else {
                data.append("view", false);
            }
            const cud = localStorage.getItem("jwt");
            let id = $(this).attr("data-id");
            // $(".modalssbackdrop").removeClass("d-none");
            console.log(id);

            const res = await axios({
                method: "PATCH",
                url: `https://bhivee.herokuapp.com/api/v1/admins/Role/${id}`,
                data,
                headers: {
                    jwt: cud,
                },
            });
            console.log(res);
            // $(".modalssbackdrop").addClass("d-none");

            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Create Premission removed!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 2000);
        } else {
            $(this).attr("checked", "checked");
            const data = new FormData();
            console.log($(this).attr("checked"));
            if ($(this).attr("checked")) {
                data.append("create", true);
            } else {
                data.append("create", false);
            }
            if ($("#checks5").attr("checked")) {
                data.append("edit", true);
            } else {
                data.append("edit", false);
            }
            if ($("#checks4").attr("checked")) {
                data.append("view", true);
            } else {
                data.append("view", false);
            }
            const cud = localStorage.getItem("jwt");
            let id = $(this).attr("data-id");
            // $(".modalssbackdrop").removeClass("d-none");

            const res = await axios({
                method: "PATCH",
                url: `https://bhivee.herokuapp.com/api/v1/admins/Role/${id}`,
                data,
                headers: {
                    jwt: cud,
                },
            });
            console.log(res);

            // $(".modalssbackdrop").addClass("d-none");

            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Create Premission added!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 2000);
        }
    });
    $(document).on("click", "#checks5", async function() {
        if ($(this).attr("checked")) {
            $(this).removeAttr("checked");

            const data = new FormData();
            if ($(this).attr("checked")) {
                data.append("edit", true);
            } else {
                data.append("edit", false);
            }
            if ($("#checks").attr("checked")) {
                data.append("create", true);
            } else {
                data.append("create", false);
            }
            if ($("#checks4").attr("checked")) {
                data.append("view", true);
            } else {
                data.append("view", false);
            }
            const cud = localStorage.getItem("jwt");
            let id = $(this).attr("data-id");
            // $(".modalssbackdrop").removeClass("d-none");

            const res = await axios({
                method: "PATCH",
                url: `https://bhivee.herokuapp.com/api/v1/admins/Role/${id}`,
                data,
                headers: {
                    jwt: cud,
                },
            });
            console.log(res);

            // $(".modalssbackdrop").addClass("d-none");

            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Edit Premission removed!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 2000);
            console.log(res);
        } else {
            $(this).attr("checked", "checked");
            const data = new FormData();
            console.log($(this).attr("checked"));
            if ($(this).attr("checked")) {
                data.append("edit", true);
            } else {
                data.append("edit", false);
            }
            if ($("#checks").attr("checked")) {
                data.append("create", true);
            } else {
                data.append("create", false);
            }
            if ($("#checks4").attr("checked")) {
                data.append("view", true);
            } else {
                data.append("view", false);
            }
            const cud = localStorage.getItem("jwt");
            let id = $(this).attr("data-id");
            // $(".modalssbackdrop").removeClass("d-none");

            const res = await axios({
                method: "PATCH",
                url: `https://bhivee.herokuapp.com/api/v1/admins/Role/${id}`,
                data,
                headers: {
                    jwt: cud,
                },
            });
            console.log(res);

            // $(".modalssbackdrop").addClass("d-none");

            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Edit Premission added!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 2000);
            console.log(res);
        }
    });
    $(document).on("click", "#checks4", async function() {
        if ($(this).attr("checked")) {
            $(this).removeAttr("checked");

            const data = new FormData();
            if ($(this).attr("checked")) {
                data.append("view", true);
            } else {
                data.append("view", false);
            }
            if ($("#checks5").attr("checked")) {
                data.append("edit", true);
            } else {
                data.append("edit", false);
            }
            if ($("#checks").attr("checked")) {
                data.append("create", true);
            } else {
                data.append("create", false);
            }
            const cud = localStorage.getItem("jwt");
            let id = $(this).attr("data-id");
            // $(".modalssbackdrop").removeClass("d-none");

            const res = await axios({
                method: "PATCH",
                url: `https://bhivee.herokuapp.com/api/v1/admins/Role/${id}`,
                data,
                headers: {
                    jwt: cud,
                },
            });
            console.log(res);

            // $(".modalssbackdrop").addClass("d-none");

            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "View Premission removed!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 2000);
            console.log(res);
        } else {
            $(this).attr("checked", "checked");
            const data = new FormData();
            console.log($(this).attr("checked"));
            if ($(this).attr("checked")) {
                data.append("create", true);
            } else {
                data.append("create", false);
            }
            if ($("#checks5").attr("checked")) {
                data.append("edit", true);
            } else {
                data.append("edit", false);
            }
            if ($("#checks").attr("checked")) {
                data.append("view", true);
            } else {
                data.append("view", false);
            }
            const cud = localStorage.getItem("jwt");
            let id = $(this).attr("data-id");
            // $(".modalssbackdrop").removeClass("d-none");

            const res = await axios({
                method: "PATCH",
                url: `https://bhivee.herokuapp.com/api/v1/admins/Role/${id}`,
                data,
                headers: {
                    jwt: cud,
                },
            });
            console.log(res);

            // $(".modalssbackdrop").addClass("d-none");

            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "View Premission added!";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 2000);
            console.log(res);
        }
    });

    $(document).on("click", ".alif", async function() {
        try {
            let number = $(this).attr("data-colas");
            document.querySelector(`.noload${number}`).classList.add("d-none");
            document.querySelector(`.load${number}`).classList.remove("d-none");
            const cud = localStorage.getItem("jwt");
            let id = $(this).attr("data-id");
            let name = $(this).parent().children(".okssssss2").val();
            let color = $(`.oncolor${number}`).val();
            let data = new FormData();
            data.append("name", name);
            data.append("color", color);
            const res = await axios({
                method: "PATCH",
                url: `https://bhivee.herokuapp.com/api/v1/admins/ColorBar/${id}`,
                data,
                headers: {
                    jwt: cud,
                },
            });

            console.log(res.data);
            if (res.data.status === "success") {
                document.querySelector(".as").classList.add("anim");
                document.querySelector(".as").textContent = "Colorbar Updated!";
                setTimeout(function() {
                    document.querySelector(".as").classList.remove("anim");
                }, 3000);
            }
            console.log(number);
            $(".okssssss2").attr("readonly", "readonly");
            $(".alif").removeClass("d-flex");
            $(".alif").addClass("d-none");
            $(".ultrass").removeClass("d-none");
            $(".pluto").addClass("d-none");
            document.querySelector(`.noload${number}`).classList.remove("d-none");
            document.querySelector(`.load${number}`).classList.add("d-none");
        } catch (err) {
            $(".pluto").addClass("d-none");

            $(".okssssss2").attr("readonly", "readonly");
            $(".alif").removeClass("d-flex");
            $(".alif").addClass("d-none");
            $(".ultrass").removeClass("d-none");
            document.querySelector(`.noload${number}`).classList.remove("d-none");
            document.querySelector(`.load${number}`).classList.add("d-none");
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = err.response.data.message;
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 3000);
        }
    });
    $(document).on("click", ".okaa", async function() {
        document.querySelector(".as").classList.add("anim");
        document.querySelector(".as").textContent = "Loading...";

        const cud = localStorage.getItem("jwt");
        $(".modalssbackdrop").removeClass("d-none");
        console.log(`id is ${$(this).attr("data-id")}`);
        let idsz = $(this).attr("data-id");
        localStorage.setItem("usedidse", idsz);

        const res = await axios({
            method: "GET",
            url: `https://bhivee.herokuapp.com/api/v1/users/${idsz}`,
            headers: {
                jwt: cud,
            },
        });
        const res2 = await axios({
            method: "GET",
            url: `https://bhivee.herokuapp.com/api/v1/admins/getadminbyid`,
            headers: {
                jwt: cud,
            },
        });
        const res3 = await axios({
            method: "GET",
            url: `https://bhivee.herokuapp.com/api/v1/admins/Role/`,
            headers: {
                jwt: cud,
            },
        });
        let roless = res3.data.data;
        let admindatas = res2.data.data;
        let datas = res.data.data[0];
        console.log(datas);
        let locationss = admindatas.locations;
        let finalrole = datas.role[0]._id;
        let finallocation = datas.location[0]._id;
        console.log(finalrole);
        console.log(locationss);
        let locationfirst = "";
        $(".idEdit").val(datas._id);
        $(".firstEdit").val(datas.firstname);
        $(".lastEdit").val(datas.lastname);
        $(".locationnameedit").empty();

        locationss = locationss.filter((item) => {
            if (String(item._id) === String(finallocation)) {
                locationfirst = `<option class="opassta" value=${item.name} data-id=${
          item._id
        }   data-ink=${JSON.stringify(item.teams)} >${item.name}</option>`;
                if (item.teams.length > 0) {
                    if (datas.team) {
                        $(".pltume2").removeClass("d-none");
                        console.log("aaass");
                        $(".tume2").empty();
                        let firstteam = "";
                        item.teams = item.teams.filter((item) => {
                            if (String(item._id) === String(datas.team)) {
                                firstteam = `<option value=${item.name} data-id=${item._id}>${item.name}</option>`;
                                return false;
                            }
                            return true;
                        });
                        $(".tume2").append(firstteam);
                        item.teams.map((item) => {
                            $(".tume2").append(
                                `<option value=${item.name} data-id=${item._id}>${item.name}</option>`
                            );
                        });
                    } else {}
                }
                return false;
            }
            return true;
        });
        $(".locationnameedit").append(locationfirst);
        locationss.map((item) => {
            let optionsLocal = `<option class="opassta" value=${item.name} data-id=${
        item._id
      }  data-ink=${JSON.stringify(item.teams)}>${item.name}</option>`;
            $(".locationnameedit").append(optionsLocal);
        });
        if (roless.length > 0) {
            let rulefirst = "";
            roless = roless.filter((item) => {
                if (String(item._id) === String(finalrole)) {
                    rulefirst = `<option class="opassta" value=${item.name} data-id=${item._id} >${item.name}</option>`;
                    return false;
                }
                return true;
            });
            $(".rulings").empty();
            $(".rulings").append(rulefirst);
            roless.map((item) => {
                let optionsLocal = `<option class="opassta" value=${item.name} data-id=${item._id} >${item.name}</option>`;
                $(".rulings").append(optionsLocal);
            });
        }
        document.querySelector(".as").classList.remove("anim");

        $("#StaffModal").modal("show");
    });
    $(".locationnameedit").change(function() {
        var value = $(this).find(":selected").attr("data-ink");
        // value = "'" + value + "'";
        // value = value.map((item) => {
        //     return JSON.parse(item);
        // });
        let oking = value;
        console.log(typeof oking);
        console.log(JSON.parse(oking));
        let obsa = JSON.parse(oking);
        $(".tume2").empty();
        if (obsa.length > 0) {
            $(".pltume2").removeClass("d-none");
            $(".tume2").append(
                `<option value='noteam'  disabled='disabled' selected='selected'hidden='hidden'>Select Team</option>`
            );
            obsa.map((item) => {
                $(".tume2").append(
                    `<option value=${item.name} data-id=${item._id}>${item.name}</option>`
                );
            });
        } else {
            $(".pltume2").addClass("d-none");
        }
        // oking.map((item) => {
        //     console.log(item);
        // });
    });
    $(document).on("click", ".edoDelsap", function() {
        $(".modalssbackdrop").removeClass("d-none");
        $("#EdosDelaModal").modal("show");
        $(".cdns24").attr("data-id", $(this).attr("data-location"));
        $(this).addClass("ontodel");
    });
    $(document).on("click", ".edoDels", function() {
        $(".modalssbackdrop").removeClass("d-none");
        $("#EdosDelaModal").modal("show");
        $(".cdns23").attr("data-id", $(this).attr("data-location"));
        $(this).addClass("ontodel");
    });
    $(document).on("click", ".edos", async function() {
        console.log($(this).attr("data-location"));
        let id = $(this).attr("data-location");

        window.setTimeout(() => {
            location.assign(`/editlocation/${id}`);
        }, 1000);
    });
    $(document).on("click", ".edosLoca", function() {
        $(".numa").removeAttr("readonly");
        $(".numa").removeAttr("disabled");
        let abc = $(".numa").val();
        $(".numa").val("");
        $(".numa").val(abc);
        $(".numa").focus();
        $(this).parent().children(".edabutak").removeClass("d-none");
    });
    $(document).on("click", ".edabutak", async function() {
        console.log($(this).parent().children(".numa").attr("db-change"));
        if (!$(this).parent().children(".numa").attr("db-change")) {
            document.querySelector(".noload91").classList.remove("d-none");
            document.querySelector(".load91").classList.add("d-none");
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Nothing Changed";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 5000);
        } else {
            const cud = localStorage.getItem("jwt");

            const data = new FormData();
            data.append("name", $(this).parent().children(".numa").attr("db-change"));
            const res = await axios({
                method: "PATCH",
                url: `https://bhivee.herokuapp.com/api/v1/admins/Locations/${$(
          this
        ).attr("data-id")}`,
                data,
                headers: {
                    jwt: cud,
                },
            });
            console.log(res);
        }
    });
    $(document).on("click", ".cdns24", async function() {
        const cud = localStorage.getItem("jwt");
        let locationid = $(this).attr("data-opa");
        let teamid = $(this).attr("data-id");
        document.querySelector(".noload91").classList.add("d-none");
        document.querySelector(".load91").classList.remove("d-none");
        const res = await axios({
            method: "DELETE",
            url: `https://bhivee.herokuapp.com/api/v1/admins/Team/${teamid}/${locationid}`,
            headers: {
                jwt: cud,
            },
        });

        console.log(res);
        if (res.data.status === "success") {
            document.querySelector(".noload91").classList.remove("d-none");
            document.querySelector(".load91").classList.add("d-none");
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Team deleted";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 5000);
            $(".modalssbackdrop").addClass("d-none");
            $("#EdosDelaModal").modal("hide");
            $(".ontodel").parent().remove();
        } else {
            document.querySelector(".noload91").classList.remove("d-none");
            document.querySelector(".load91").classList.add("d-none");
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent =
                "Something wrong with delete team";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 5000);
        }
    });
    $(document).on("click", ".cdns23", async function() {
        const cud = localStorage.getItem("jwt");

        let id = $(".cdns23").attr("data-id");
        document.querySelector(".noload91").classList.add("d-none");
        document.querySelector(".load91").classList.remove("d-none");
        const res = await axios({
            method: "DELETE",
            url: `https://bhivee.herokuapp.com/api/v1/admins/deleteLocation/${id}`,
            headers: {
                jwt: cud,
            },
        });

        console.log(res);
        if (res.data.status === "success") {
            document.querySelector(".noload91").classList.remove("d-none");
            document.querySelector(".load91").classList.add("d-none");
            document.querySelector(".as").classList.add("anim");
            document.querySelector(".as").textContent = "Location deleted";
            setTimeout(function() {
                document.querySelector(".as").classList.remove("anim");
            }, 5000);
            $(".modalssbackdrop").addClass("d-none");
            $("#EdosDelaModal").modal("hide");
            $(".ontodel").parent().remove();
        }
    });

    $(document).on("click", ".addStaff", function() {
        $(".modalssbackdrop").removeClass("d-none");
        $("#AddStaffModal").modal("show");
    });
});