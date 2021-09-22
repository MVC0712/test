var ajaxReturnData;

const myAjax = {
    myAjax: function(fileName, sendData) {
        $.ajax({
                type: "POST",
                url: fileName,
                dataType: "json",
                data: sendData,
                async: false,
            })
            .done(function(data) {
                ajaxReturnData = data;
            })
            .fail(function() {
                alert("DB connect error");
            });
    },
};

$(function() {
    makeSummaryTable();
    $("#save__button").prop("disabled", true);
    $("#update__button").prop("disabled", true);
    $("#test__button").remove();
    $("#delete-record__button").remove();

    var allRadios = document.getElementsByName('check_uncheck');
    var booRadio;
    var x = 0;
    for (x = 0; x < allRadios.length; x++) {
        allRadios[x].onclick = function() {
            if (booRadio == this) {
                this.checked = false;
                booRadio = null;
            } else {
                booRadio = this;
            }
        };
    }
});

function makeSummaryTable() {
    var fileName = "./php/DieStatus/SelSummary.php";
    var sendData = {
        dummy: "dummy",
    };
    myAjax.myAjax(fileName, sendData);
    fillTableBody(ajaxReturnData, $("#summary__table tbody"));
    make_action();
}

function returnToday() {
    var month;
    var dt = new Date();
    month = dt.getMonth() + 1;
    if (month < 9) month = "0" + month;
    return dt.getFullYear() + "-" + month + "-" + dt.getDate();
}

function fillTableBody(data, tbodyDom) {
    let checkLimit = new Object();
    let checkFlag = false;
    $(tbodyDom).empty();
    data.forEach(function(trVal) {
        let newTr = $("<tr>");
        Object.keys(trVal).forEach(function(tdVal, index) {
            if (checkFlag) {
                $("<td>").html(trVal[tdVal]).addClass("nitriding").appendTo(newTr);
            } else {
                $("<td>").html(trVal[tdVal]).appendTo(newTr);
            }
        });
        checkFlag = false;
        $(newTr).appendTo(tbodyDom);
    });
}

function fillTableBodyHisotry(data, tbodyDom) {
    let checkLimit = new Object();
    let checkFlag = false;
    $(tbodyDom).empty();
    data.forEach(function(trVal) {
        let newTr = $("<tr>");
        Object.keys(trVal).forEach(function(tdVal, index) {
            if (tdVal == "profile_length") {
                trVal[tdVal] = trVal[tdVal] + " km";
            }
            $("<td>").html(trVal[tdVal]).appendTo(newTr);
        });
        checkFlag = false;
        $(newTr).appendTo(tbodyDom);
    });
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// -------------------------   summary table tr click   -------------
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
$(document).on("click", "#summary__table tbody tr", function() {
    var fileName = "./php/DieStatus/SelSelSummary3.php";
    var sendData = new Object();
    if (!$(this).hasClass("selected-record")) {
        $(this).parent().find("tr").removeClass("selected-record");
        $(this).addClass("selected-record");
        $("#summary__table__selected").removeAttr("id");
        $(this).attr("id", "summary__table__selected");
        sendData = {
            id: $("#summary__table__selected").find("td").eq(0).html(),
        };
    } else {
        $("#add__table tbody").append($(this).removeClass("selected-record"));
        $("#go__button").prop("disabled", false);
    }
    go_check();
});

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// -------------------------   add__table table tr click   -------------
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
$(document).on("click", "#add__table tbody tr", function() {
    // var fileName = "./php/DieStatus/SelSelSummary.php";
    var sendData = new Object();
    var tableId = $(this).parent().parent().attr("id");

    if (!$(this).hasClass("selected-record")) {
        $(this).parent().find("tr").removeClass("selected-record");
        $(this).addClass("selected-record");
        $("#add__table__selected").removeAttr("id");
        $(this).attr("id", "add__table__selected");
        sendData = {
            id: $("#add__table__selected").find("td").eq(0).html(),
        };
    } else {
        $("#summary__table tbody").prepend($(this).removeClass("selected-record"));
        $("#go__button").prop("disabled", true);
    }
    go_check();
});


function go_check() {
    if (($("#add__table tbody tr").length == 0) && ($("#process").val() == 0)) {
        $("#go__button").prop("disabled", true);
    } else if (($("#add__table tbody tr").length == 0) && ($("#process").val() != 0)) {
        $("#go__button").prop("disabled", true);
    } else if (($("#add__table tbody tr").length != 0) && ($("#process").val() == 0)) {
        $("#go__button").prop("disabled", true);
    } else {
        $("#go__button").prop("disabled", false);
    }
};

$(document).on("change", "#process", function() {
    if ($("#process").val() == 0) {
        $("#process").removeClass("complete-input").addClass("no-input");
        document.getElementById("status_process").innerHTML = ``;
    } else if ($("#process").val() == 1) {
        $("#process").removeClass("no-input").addClass("complete-input");
        document.getElementById("status_process").innerHTML = `
            <input type="radio" checked name="check_uncheck" class="radio-button" value="1" />Measuring <br /> 
            <input type="radio" name="check_uncheck" class="radio-button" value="2" / > OK <br />
            <input type="radio" name="check_uncheck" class="radio-button" value="3" / > NG <br /> `;
    } else if ($("#process").val() == 2) {
        $("#process").removeClass("no-input").addClass("complete-input");
        document.getElementById("status_process").innerHTML = `
            <input type="radio" checked name="check_uncheck" class='radio-button' value="4" />Immersion <br />
            <input type="radio" name="check_uncheck" class='radio-button' value="5" />Shot <br />
            <input type="radio" name="check_uncheck" class='radio-button' value="6" />Clean <br />`;
    } else if ($("#process").val() == 3) {
        $("#process").removeClass("no-input").addClass("complete-input");
        document.getElementById("status_process").innerHTML = `
            <input type="radio" checked name="check_uncheck" class='radio-button' value="7" />Grinding <br />
            <input type="radio" name="check_uncheck" class='radio-button' value="8" />Nitriding <br />
            <input type="radio" name="check_uncheck" class='radio-button' value="9" />Wire cutting <br />`;
    } else if ($("#process").val() == 4) {
        $("#process").removeClass("no-input").addClass("complete-input");
        document.getElementById("status_process").innerHTML = `
            <input type="radio" checked name="check_uncheck" class='radio-button' value="10" />On rack <br />`;
    }
    go_check();
    console.log($('input[name="check_uncheck"]:checked').val());
});

$(document).on("click", "#go__button", function() {
    var fileName = "./php/DieStatus/InsStatus.php";
    var sendObj = new Object();
    $("#add__table tbody tr td:nth-child(1)").each(function(
        index,
        element
    ) {
        sendObj[index] = $(this).html();
    });
    sendObj["die_status_id"] = $('input[name="check_uncheck"]:checked').val();
    sendObj["do_sth_at"] = $("#do_sth_at").val();
    sendObj["do_sth_at_time"] = $("#do_sth_at_time").val();
    sendObj["note"] = $("#note").val();
    if (document.getElementById("myfile").files.length == 0) {
        console.log("khong co file");
        sendObj["file_url"] = 'No_image.jpg';
    } else {
        console.log("co file");
        sendObj["file_url"] = $('#myfile')[0].files[0].name;

        var file_data = $('#myfile').prop('files')[0];
        var form_data = new FormData();
        form_data.append('file', file_data);
        $.ajax({
            url: "./php/DieStatus/FileUpload.php",
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'post',
        });
    }
    myAjax.myAjax(fileName, sendObj);

    $("#add__table tbody").empty();
    document.getElementById("status_process").innerHTML = ``;
    $("#go__button").prop("disabled", true);
    $("#process").removeClass("complete-input").addClass("no-input");
    $("#process").val("0");
    $("#note").val("");
    $("#myfile").val("");
    makeSummaryTable();
});

function make_action() {
    var table, tr, action_s, pr_tm, sta_val, txt_pr_tm, txt_sta_val, i, diff;
    table = document.getElementById("summary__table");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        pr_tm = tr[i].getElementsByTagName("td")[2];
        sta_val = tr[i].getElementsByTagName("td")[4];
        action_s = tr[i].getElementsByTagName("td")[7];
        if (pr_tm) {
            txt_pr_tm = Number(pr_tm.innerText.replace(",", ""));
            txt_sta_val = Number(sta_val.innerText.replace(",", ""));
            table.rows[i].insertCell(7);
            if (txt_pr_tm >= 2) {
                table.rows[i].cells[7].innerHTML = "Need wash";
                table.rows[i].cells[7].style.backgroundColor = "#ffc870";

            } else if (txt_sta_val == 1) {
                table.rows[i].cells[7].innerHTML = "Wait result";
                table.rows[i].cells[7].style.backgroundColor = "#fbffbf";

            } else if ((txt_sta_val == 2) && (txt_pr_tm <= 1)) {
                table.rows[i].cells[7].innerHTML = "Ready press";
                table.rows[i].cells[7].style.backgroundColor = "#b3ffe4";

            } else if (txt_sta_val == 3) {
                table.rows[i].cells[7].innerHTML = "Need wash";
                table.rows[i].cells[7].style.backgroundColor = "#ffc870";

            } else if ((txt_sta_val == 4)) {
                table.rows[i].cells[7].innerHTML = "Washing";
                table.rows[i].cells[7].style.backgroundColor = "#bfc1ff"

            } else if ((txt_sta_val == 5) || (txt_sta_val == 6)) {
                table.rows[i].cells[7].innerHTML = "Cleaning";
                table.rows[i].cells[7].style.backgroundColor = "#bfc1ff"

            } else if ((txt_sta_val == 7) || (txt_sta_val == 8) ||
                (txt_sta_val == 9)) {
                table.rows[i].cells[7].innerHTML = "Fixing";
                table.rows[i].cells[7].style.backgroundColor = "#bfc1ff"

            } else if ((txt_sta_val == 10) || (txt_sta_val == 2)) {
                table.rows[i].cells[7].innerHTML = "Ready press";
                table.rows[i].cells[7].style.backgroundColor = "#b3ffe4";
            }
        }
    }
};

const getTwoDigits = (value) => value < 10 ? `0${value}` : value;

const formatDate = (date) => {
    const day = getTwoDigits(date.getDate());
    const month = getTwoDigits(date.getMonth() + 1);
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
}

const formatTime = (date) => {
    const hours = getTwoDigits(date.getHours());
    const mins = getTwoDigits(date.getMinutes());

    return `${hours}:${mins}`;
}

const date = new Date();
document.getElementById('do_sth_at').value = formatDate(date);
document.getElementById('do_sth_at_time').value = formatTime(date);




// History


$(function() {
    makeSummaryTableh();
});

function makeSummaryTableh() {
    var fileName = "./php/DieStatus/DieHistory.php";
    var sendData = {
        dummy: "dummy",
    };
    myAjax.myAjax(fileName, sendData);
    fillTableBodyh(ajaxReturnData, $("#die__table tbody"));
}

function fillTableBodyh(data, tbodyDom) {
    let checkLimit = new Object();
    let chekFlag = false;
    $(tbodyDom).empty();
    data.forEach(function(trVal) {
        let newTr = $("<tr>");
        Object.keys(trVal).forEach(function(tdVal, index) {

            $("<td>").html(trVal[tdVal]).appendTo(newTr);

        });
        chekFlag = false;
        $(newTr).appendTo(tbodyDom);
    });
}

$(document).on("click", "#die__table tbody tr", function() {
    var fileName = "./php/DieStatus/SelSelFile.php";
    var sendObj = new Object();
    document.getElementById("file_area").innerHTML = ``;
    if (!$(this).hasClass("selected-record")) {
        $(this).parent().find("tr").removeClass("selected-record");
        $(this).addClass("selected-record");
        $("#die__table__selected").removeAttr("id");
        $(this).attr("id", "die__table__selected");
        sendData = {
            targetId: $("#die__table__selected").find("td").eq(0).html(),
        };
        console.log(sendData);
        myAjax.myAjax(fileName, sendData);
        console.log(ajaxReturnData[0].file_url);

        var filename = ajaxReturnData[0].file_url;
        var fileType = filename.substr(filename.lastIndexOf(".") + 1, 3);
        console.log(filename);
        console.log(filename.lastIndexOf("."));
        console.log(filename.substr(filename.lastIndexOf(".") + 1, 3));
        if (filename.length !== 0) {
            switch (fileType) {
                case "pdf":
                case "PDF":
                    $("<object>")
                        .attr(
                            "data",
                            "../upload/DieHistory/" + filename + "#toolbar=0&navpanes=0")
                        .attr("type", "application/pdf")
                        .appendTo("#file_area");
                    break;
                case "jpg":
                case "JPG":
                    $("<object>")
                        .attr("data", "../upload/DieHistory/" + filename)
                        .attr("type", "image/jpeg")
                        .appendTo("#file_area");
                    break;
            }
        } else if (filename === null) {
            document.getElementById("file_area").innerHTML = ``;
        }
    } else {
        $("#add__table tbody").append($(this).removeClass("selected-record"));
        $("#go__button").prop("disabled", false);
        document.getElementById("file_area").innerHTML = ``;
    }
});