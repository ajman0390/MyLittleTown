"use strict";

// Anonymous init function call for the calculate btn onclick to call the doCalculate function
window.onload = function () {
    document.getElementById("calcBtn").onclick = calculatePrice;
    document.getElementById("resetBtn").onclick = doReset;
}

/*
* This funciton calls to 
* calculate the costs 
*/
function calculatePrice() {
    validateForm(document.getElementById("numDaysInput")); // calls validateForm to check for positive values

    let carPriceFinal = calcCarChoice();
    let optionCostsFinal = calculateOptionsCosts();
    let ageCosts = calculateAgeCost();
    let returnDate = calculateReturnDate();

    let surcharge = ageCosts * carPriceFinal;
    document.getElementById("underOutput").value = surcharge.toFixed(2); // Age surcharge

    document.getElementById("carRentalPmtTotal").value = carPriceFinal.toFixed(2); // Car Rental Output
    document.getElementById("carOptionPmtTotal").value = optionCostsFinal.toFixed(2); // Car Options
    
    let totalCosts = carPriceFinal + surcharge + optionCostsFinal;

    let totalDueField = document.getElementById("pmtTotalDue");
    totalDueField.value = totalCosts.toFixed(2);

    let returnDateField = document.getElementById("returnDateOutput");
    returnDateField.value = returnDate.toDateString();
}

/*
* This funciton calculates the Return Date
*
* @return returnDate (Date) - The return date
*/
function calcCarChoice() {
    const cars = document.getElementById("inputCarSelect");
    const numDaysInputField = document.getElementById("numDaysInput");
    let carChoiceCost;
    switch (cars.options[cars.selectedIndex].value) {
        case "1":
            carChoiceCost = (29.99 * numDaysInputField.value);
            break;
        case "2":
            carChoiceCost = (39.99 * numDaysInputField.value);
            break;
        case "3":
            carChoiceCost = (49.99 * numDaysInputField.value);
            break;
        case "4":
            carChoiceCost = (59.99 * numDaysInputField.value);
            break;
    }
    return carChoiceCost;
}

/*
* This funciton calculates the Return Date
*
* @return returnDate (Date) - The return date
*/
function calculateOptionsCosts() {
    let tollCheck = document.getElementById("tollTagCheck").checked;
    let gpsCheck = document.getElementById("gpsCheck").checked;
    let roadCheck = document.getElementById("roadSideCheck").checked;
    let optionsCost = 0;

    if (tollCheck) {
        optionsCost += 3.95;
    }
    
    if (gpsCheck) {
        optionsCost += 2.95;
    }
    
    if (roadCheck) {
        optionsCost += 2.95;
    }
    optionsCost *= document.getElementById("numDaysInput").value;
    return optionsCost;
}

/*
* This funciton calculates the  age (under 25) surcharge
*
* @return ageCosts (Number) - The surcharge amt
*/
function calculateAgeCost() {
    let underRadio = document.getElementById("under25Radio").checked;
    let overRadio = document.getElementById("over25Radio").checked;
    let ageCosts = 0;

    if (underRadio) {
        ageCosts = .3;
    }
    return ageCosts;
}

/*
* This funciton calculates the Return Date
*
* @return returnDate (Date) - The return date
*/
function calculateReturnDate() {
    const numDayField = document.getElementById("numDaysInput");
    const pickupDayField = document.getElementById("pickupDateInput");
    let datePickupDay = new Date(pickupDayField.value);
    let dateTimeValue = datePickupDay.getTime();

    const msePerDay = 1000 * 60 * 60 * 24;
    let daysMSec = numDayField.value * msePerDay;
    let dayCosts = daysMSec + dateTimeValue + msePerDay;

    let returnDate = new Date(dayCosts);
    return returnDate;
}

/*
* This funciton checks the inputs to ensure positive values were entered  
* 
* @param inputCheck (Number) - The value to be checked
*
*/
function validateForm(inputCheck) {
    if ( (isNaN(inputCheck.value)) || (inputCheck.value <= 0) ) {
        document.getElementById("errorP").innerHTML = "The input was not correct. Please input valid positive numbers";
        document.getElementById("errorP").style.display = "block";
    }
}

/*
* This funciton removes input error message   
*/
function doReset() {
    // document.getElementById("errorP").innerHTML = "";
    document.getElementById("errorP").style.display = "none";
}