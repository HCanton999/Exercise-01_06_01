
/*
Snoot.js
form validation code for snoot.html
Author:Harrison Canton
Date:8.6.18

Filename: snoot.js
*/

"use strict";

var twentyNine = document.createDocumentFragment();
var thirty = document.createDocumentFragment();
var thirtyOne = document.createDocumentFragment();
var formValidity = true;

// a function to remove select list defaults
function removeSelectDefaults() {
    var emptyBoxes = document.getElementsByTagName("select");
    for (var i = 0; i < emptyBoxes.length; i++) {
        emptyBoxes[i].selectedIndex = -1;
    }
}

// function to set up document fragments for days of the month
function setUpDays() {
    var dates = document.getElementById("delivDy").getElementsByTagName("option");
    twentyNine.appendChild(dates[28].cloneNode(true));
    thirty.appendChild(dates[28].cloneNode(true));
    thirty.appendChild(dates[29].cloneNode(true));
    thirtyOne.appendChild(dates[28].cloneNode(true));
    thirtyOne.appendChild(dates[29].cloneNode(true));
    thirtyOne.appendChild(dates[30].cloneNode(true));
}

//function to set up the list of days based the selected month
function updateDays() {
    var deliveryDay = document.getElementById("delivDy");
    var dates = deliveryDay.getElementsByTagName("option");
    var deliveryMonth = document.getElementById("delivMo");
    var deliveryYear = document.getElementById("delivYr");
    // cover for no month selected
    if (deliveryMonth.selectedIndex === -1) {
        return;
    }
    var selectedMonth = deliveryMonth.options[deliveryMonth.selectedIndex].value;
    while (dates[28]) {
        deliveryDay.removeChild(dates[28]);
    }
    if (deliveryYear.selectedIndex === -1) {
        deliveryDay.selectedIndex = 0;
    }
    // if its feb and 2020 twentyNine
    if (selectedMonth === "2" && deliveryYear.options[deliveryYear.selectedIndex].value === "2020") {
        deliveryDay.appendChild(twentyNine.cloneNode(true));
    }
    //else if its 30 day month thirty
    else if (selectedMonth === "4" || selectedMonth === "6" || selectedMonth === "9" ||selectedMonth === "11") {
        deliveryDay.appendChild(thirty.cloneNode(true));
    }
    //else if 31 day month thirtyOne
    else if (selectedMonth === "1" || selectedMonth === "3" || selectedMonth === "5" ||selectedMonth === "7" ||selectedMonth === "8" ||selectedMonth === "10" ||selectedMonth === "12") {
        deliveryDay.appendChild(thirtyOne.cloneNode(true));
    }
}

//function to inspect custom check box on message change
function autoCheckCustom() {
    var messageBox = document.getElementById("customText");
    // textarea has message, check the box
    if (messageBox.value !== "" && messageBox.value !== messageBox.placeholder) {
        document.getElementById("custom").checked = "checked";
    }
    //textarea has no message, uncheck the box
    else {
        document.getElementById("custom").checked = "";
    }
}

//function to cop billing to delivery address
    function copyBillingAddress() {
        var billingInputElements = document.querySelectorAll("#billingAddress input");
        var deliveryInputElements = document.querySelectorAll("#deliveryAddress input");
        // duplicate address - checkbox is checked - copy
        if (document.getElementById("sameAddr").checked) {
            for (var i = 0; i < billingInputElements.length; i++){
                deliveryInputElements[i + 1].value =
                billingInputElements[i].value;
            }
            document.querySelector("#deliveryAddress select").value;
            document.querySelector("#billingAddress select").value;
        }
        // duplicate address - checkbox not checked - erase  
        else {
            for (var i = 0; i < billingInputElements.length; i++){
                deliveryInputElements[i + 1].value = "";
            }
            document.querySelector("#deliveryAddress select").selectedIndex = -1;
            
        }
        }  
        //function to validate address - billing & delivery
        function validateAddress(fieldsetId) {
            var inputElements = document.querySelectorAll("#" + fieldsetId + " input");
            var errorDiv = document.querySelectorAll("#" + fieldsetId + " .errorMessage")[0];
            var fieldsetValidity = true;
            var elementCount = inputElements.length;
            var currentElement;
            try {
                //loop through the input fields looking for blanks 
                for (var i = 0; i < elementCount; i++) {
                    currentElement = inputElements[i];
                    //blanks
                    if (currentElement.value === "") {
                        currentElement.style.background = "rgb(255,233,233)";
                        fieldsetValidity = false;
                        
                    }
                    //not blanks
                    else {
                        currentElement.style.background = "rgb(255,255,255)";   
                    }
                }
                //validate select list field
                currentElement = document.querySelectorAll("#" + fieldsetId + " select")[0];
                if (currentElement.selectedIndex === -1) {
                    currentElement.style.border = "1px solid red";
                    fieldsetValidity = false;
                }else {
                    currentElement.style.border = "";
                }
                // action for invalid fieldset
                if (!fieldsetValidity) {
                    if (fieldsetId === "billingAddress") {
                        throw "please complete all billing Address information.";
                        
                    }
                    else {
                        throw "please complete all billing Delivery information.";
                    }
                }else {
                    errorDiv.style.display = "none";
                    errorDiv.innerHTML = "";
                }
            } catch (msg){
            errorDiv.style.display = "block";
            errorDiv.innerHTML = msg;
            formValidity = false;
            }
        }

        // function to validate delivery date
        function validateDeliveryAddress() {
            var selectElements = document.querySelectorAll("#deliveryDate" + " select");
            var errorDiv = document.querySelectorAll("#deliveryDate" + " .errorMessage")[0];
            var fieldsetValidity = true;
            var elementCount = selectElements.length;
            var currentElement;
            try {
                //loop through the select fields looking for blanks 
                for (var i = 0; i < elementCount; i++) {
                    currentElement = selectElements[i];
                    //blanks
                    if (currentElement.selectedIndex === -1) {
                        currentElement.style.border = "1px solid red";
                        fieldsetValidity = false;       
                    }
                    //not blanks
                    else {
                        currentElement.style.border = "";
 
                    }
                }
                // action for invalid fieldset
                if (!fieldsetValidity) {
                        throw "please specify a Delivery Date";
                }else {
                    errorDiv.style.display = "none";
                    errorDiv.innerHTML = "";
                }
            } catch (msg){
            errorDiv.style.display = "block";
            errorDiv.innerHTML = msg;
            formValidity = false;
            }
        }
        // function to validate payment
        function validatepayment() {
            var selectElements = document.querySelectorAll("#paymentInfo" + " select");
            var ccNumElement = document.getElementById("ccNum")
            var errorDiv = document.querySelectorAll("#paymentInfo" + " .errorMessage")[0];
            var fieldsetValidity = true;
            var elementCount = selectElements.length;
            var cvvElement = document.getElementById("cvv");
            var cards = document.getElementsByName("PaymentType");
            var currentElement;
            //THIS IS WHERE WE WERE YESTURDAY
            try {
                //loop through the select fields looking for blanks 
                for (var i = 0; i < elementCount; i++) {
                    currentElement = selectElements[i];
                    //blanks
                    if (currentElement.selectedIndex === -1) {
                        currentElement.style.border = "1px solid red";
                        fieldsetValidity = false;       
                    }
                    //not blanks
                    else {
                        currentElement.style.border = "";
 
                    }
                }
                // action for invalid fieldset
                if (!fieldsetValidity) {
                        throw "please specify a Delivery Date";
                }else {
                    errorDiv.style.display = "none";
                    errorDiv.innerHTML = "";
                }
            } catch (msg){
            errorDiv.style.display = "block";
            errorDiv.innerHTML = msg;
            formValidity = false;
            }
        }

        //function to validate entire form
    function validateForm(evt) {
        if (evt.preventDefault) {
            evt.preventDefault();
        }else {
            evt.returnValue = false;
        }
        formValidity = false;
        validateAddress('billingAddress');
        validateAddress('deliveryAddress');
        validateDeliveryAddress();
        if (formValidity === true) {//form is valid
            document.getElementById("errorText").innerHTML = "";
            document.getElementById("errorText").style.display = "none";
            document.getElementsByTagName("form")[0].submit();
        }else {
            document.getElementById("errorText").innerHTML = "Please fix the indicated problems and then resubmit your order.";
            document.getElementById("errorText").style.display = "block";
            scroll(0,0);
        }
    }

// function that sets up page on load event
    function setUpPage() {
    removeSelectDefaults();
    setUpDays();
    createEventListeners();
    
}

//function to create our event listeners
    function createEventListeners() {
        var deliveryMonth = document.getElementById("delivMo");
        if (deliveryMonth.addEventListener) {
            deliveryMonth.addEventListener("change", updateDays, false);
        } else if (deliveryMonth.attachEvent) {
            deliveryMonth.attachEvent("onchange", updateDays);
        }
        var deliveryYear = document.getElementById("delivYr");
        if (deliveryYear.addEventListener) {
            deliveryYear.addEventListener("change", updateDays, false);
        } else if (deliveryYear.attachEvent) {
            deliveryYear.attachEvent("onchange", updateDays);  
        }
        var messageBox = document.getElementById("customText");
        if (messageBox.addEventListener) {
            messageBox.addEventListener("change", autoCheckCustom, false);
        } else if (messageBox.attachEvent) {
            messageBox.attachEvent("onchange", autoCheckCustom);  
        }
        var same = document.getElementById("sameAddr");
        if (same.addEventListener) {
            same.addEventListener("change", copyBillingAddress, false);
        } else if (same.attachEvent) {
            same.attachEvent("onchange", copyBillingAddress);  
        }
        var form = document.getElementsByTagName("form")[0];
        if (form.addEventListener) {
            form.addEventListener("submit",validateForm, false);
        } else if (form.attachEvent) {
            form.attachEvent("onsubmit", validateForm);  
        }
    }
// Page load event handlers
if (window.addEventListener) {
    window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", setUpPage);
}