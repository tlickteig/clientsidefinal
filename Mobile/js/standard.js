/* AUTHOR: Timothy Lickteig
 * DATE: 2019-12-01
 * Main javascript file
 */

$(document).ready(function () {

    var section = 1;
    var heights = ["100", "100", "100", "100"];
    var errorTitle = "Error";
    var notAllFieldsError = "Not all fields are filled out";
    
    //http://regexlib.com/Search.aspx?k=us+zip+code&c=-1&m=-1&ps=20&AspxAutoDetectCookieSupport=1
    var regZip = /^\d{5}-\d{4}|\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d$/;
    
    //http://regexlib.com/Search.aspx?k=email&c=-1&m=-1&ps=20
    var regEmail = /[\w-]+@([\w-]+\.)+[\w-]+/;
    
    //http://regexlib.com/Search.aspx?k=phone+number&c=-1&m=-1&ps=20
    var regPhone = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/;
    
    //http://regexlib.com/Search.aspx?k=ssn&c=-1&m=-1&ps=20
    var regSSN = /^\d{3}-\d{2}-\d{4}$/;
    
    //http://regexlib.com/Search.aspx?k=number&c=-1&m=-1&ps=20
    var regDecimalNumber = /^\s*[+-]?\s*(?:\d{1,3}(?:(,?)\d{3})?(?:\1\d{3})*(\.\d*)?|\.\d+)\s*$/;
    
    //http://regexlib.com/Search.aspx?k=integer&c=-1&m=-1&ps=20
    var regUnsignedInt = /^\d+$/;

    $(function () {
        $("[data-role='header'], [data-role='footer']").toolbar({theme: "a"});
    });

    $(window).on("navigate", function (event, data) {
        console.log(data.state);
    });    

    $("#submitButton").button();
    $("#btnPersonal").button();
    $("#btnEmploymentDesired").button();
    $("#btnEducation").button();
    $("#btnReferences").button();
    $("#btnEmploymentHistory").button();
    $("#btnAddCompany").button();
    //$(".backButton").button();

    $(".backButton").click(function () {
        section--;
        changeTabs(section);
    });

    //Validate inputs and move tabs
    $("#btnPersonal").click(function () {
        var result = checkPersonalTabInputs();
        var email = $("#txtEmail").val();
        var zip = $("#txtZipCode").val();
        var phone = $("#txtPhone").val();
        var ssn = $("#txtSSN").val();
        if(email.search(regEmail) === -1) {
            alert("Invalid email address");
        }
        else if(zip.search(regZip) === -1) {
            alert("Invalid zip code");
        }
        else if(phone.search(regPhone) === -1) {
            alert("Invalid phone number");
        }
        else if(ssn.search(regSSN) === -1) {
            alert("Invalid SSN");
        }
        else if (result) {
            section = 1;
            changeTabs(section);
        } else {
            alert("Not all required fields are filled out");
        }
    });

    $("#btnEmploymentDesired").click(function () {
        var result = checkEmploymentDesiredTabInputs();
        var amount = $("#txtWageDesired").val();
        if(amount.search(regDecimalNumber) === -1) {
            alert("Invalid wage amount");
        }
        else if (result) {
            section = 2;
            changeTabs(section);
        } else {
            alert("Not all required fields are filled out");
        }
    });

    $("#btnEducation").click(function () {
        var result = checkEducationInputs();
        if (result) {
            section = 3;
            changeTabs(section);
        } else {
            alert("Not all required fields are filled out");
        }
    });

    $("#btnReferences").click(function () {
        var result = checkReferenceInputs();
                
        var yearsKnownOne = $("#txtReferenceOneYearsKnown").val();
        var yearsKnownTwo = $("#txtReferenceTwoYearsKnown").val();
        var yearsKnownThree = $("#txtReferenceThreeYearsKnown").val();
        
        var zipCodeOne = $("#txtReferenceOneZip").val();
        var zipCodeTwo = $("#txtReferenceTwoZip").val();
        var zipCodeThree = $("#txtReferenceThreeZip").val();
        
        var phoneNumberOne = $("#txtReferenceOnePhoneNumber").val();
        var phoneNumberTwo = $("#txtReferenceTwoPhoneNumber").val();
        var phoneNumberThree = $("#txtReferenceThreePhoneNumber").val();
        
        if(yearsKnownOne.search(regUnsignedInt) === -1) {
            alert("Invalid years known entry");
        }
        else if(yearsKnownTwo.search(regUnsignedInt) === -1) {
            alert("Invalid years known entry");
        }
        else if(yearsKnownThree.search(regUnsignedInt) === -1) {
            alert("Invalid years known entry");
        }
        else if(zipCodeOne.search(regZip) === -1) {
            alert("Invalid zip code");
        }
        else if(zipCodeTwo.search(regZip) === -1) {
            alert("Invalid zip code");
        }
        else if(zipCodeThree.search(regZip) === -1) {
            alert("Invalid zip code");
        }
        else if(phoneNumberOne.search(regPhone) === -1) {
            alert("Invalid phone number");
        }
        else if(phoneNumberTwo.search(regPhone) === -1) {
            alert("Invalid phone number");
        }
        else if(phoneNumberThree.search(regPhone) === -1) {
            alert("Invalid phone number");
        }
        else if (result) {
            section = 4;
            changeTabs(section);
        } else {
            alert("Not all required fields are filled out");
        }
    });

    $("#submitButton").click(function () {
        var result = checkEmploymentHistoryInputs();
        var zipCode = $("#txtCompanyOneZipcode").val();
        if(zipCode.search(regZip) === -1) {
            alert("Invalid zip code");
        }
        else if (result) {
            section = 5;
            changeTabs(section);
            alert("Aplication was submitted");
        } else {
            alert("Not all required fields are filled out");
        }
    });
});

function checkPersonalTabInputs() {

    var result = true;
    var needsNames = true;

    $("#dvPersonal input[type='text']").each(function () {
        if (($(this).val() === "") && ($(this).attr('id') !== "txtOtherNames")) {
            result = false;
        }
    });

    if (($("input[name='names']:checked").val() === 'no')) {
        needsNames = false;
    }

    if ((needsNames) && ($("#txtOtherNames").val() === "")) {
        result = false;
    }
    return result;
}

function checkEmploymentDesiredTabInputs() {

    var result = false;

    $("#fldAvailability2 input:checked").each(function () {
        result = true;
    });

    $("#dvEmploymentDesired input[type=text]").each(function () {
        if (($(this).val() === "")) {
            result = false;
        }
    });

    return result;
}

function checkEducationInputs() {

    var result = true;

    $("#dvEducation input[type='text']").each(function () {
        if (($(this).val() === "")) {
            result = false;
        }
    });

    return result;
}

function checkReferenceInputs() {

    var result = true;

    $("#dvReferences input[type='text']").each(function () {
        if (($(this).val() === "")) {
            result = false;
        }
    });

    /*
     if($("#fldMoreInformation").val() === "") {
     result = false;
     }
     */

    return result;
}

function checkEmploymentHistoryInputs() {

    var result = true;

    $("#dvEmploymentHistory input[type='text']").each(function () {
        if (($(this).val() === "")) {
            result = false;
        }
    });

    $("#dvEmploymentHistory textarea").each(function () {
        if (($(this).val() === "")) {
            console.log($(this).val());
            result = false;
        }
    });

    return result;
}

function changeTabs(section) {

    if (section === 0) {

        $.mobile.navigate("#personal");
    } else if (section === 1) {

        $.mobile.navigate("#employmentDesired");
    } else if (section === 2) {

        $.mobile.navigate("#education");
    } else if (section === 3) {

        $.mobile.navigate("#references");
    } else if (section === 4) {

        $.mobile.navigate("#employmentHistory");
    }

}
;

function message(title, message) {
    
    $("#messageBox p").text(message);
    $("span.ui-dialog-title").text(title);
    $("#messageBox").dialog("open");
}
