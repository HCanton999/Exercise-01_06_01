
/*
Snoot.js
form validation code for snoot.html
Author:Harrison Canton
Date:8.6.18

Filename: snoot.js
*/

"use strict";

// a function to remove select list defaults
function removeSelectDefaults() {
    var emptyBoxes = document.getelementsByTagName("select");
    alert("select lists: " + emptyBoxes.length);
}

// Page load event handlers
if (window.addEventListener) {
    window.addEventListener("load", removeSelectDefaults, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", removeSelectDefaults);
}