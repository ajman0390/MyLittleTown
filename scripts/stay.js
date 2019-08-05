"use strict";

// Anonymous init function call for the calculate btn onclick to call the doCalculate function
window.onload = function () {
    document.getElementById("calcBtn").onclick = calculatePrice;
    document.getElementById("resetBtn").onclick = doReset;
    document.getElementById("checkInDateInput").valueAsDate = new Date();
}

/*
* This funciton calls to 
* calculate the costs 
*/
function calculatePrice() {
    
    validateForm(document.getElementById("numNightsInput")); // calls validateForm to check for positive values

    // Room select 
    const rooms = document.getElementById("inputRoomSelect");
    const roomType = rooms.options[rooms.selectedIndex].value;
    const roomObj = getRoomInfo(roomType);

    // Num of Guests, check if can stay in selected room 
    const numAdults = document.getElementById("numAdultsInput").value;
    const numKids = document.getElementById("numChildrenInput").value;
    canRoomHoldCustomer(roomObj, numAdults, numKids);

    // Num of nights, checkIn date, call getRoomCost to calc roomCostBeforeDiscouting
    const numNightsInputField = document.getElementById("numNightsInput");
    const checkinDayField = document.getElementById("checkInDateInput");
    let roomCostBeforeDiscouting = getRoomCost(roomObj, checkinDayField.value, numNightsInputField.value);

    // call getBreakfastCost to calc bfast costs
    let bfastCost = getBreakfastCost(numAdults, numKids, numNightsInputField.value);

    // Obtain discount amt
    let discountCost = getDiscount(roomCostBeforeDiscouting);
    let discountAmt = discountCost * roomCostBeforeDiscouting;
    document.getElementById("discountOutput").value = discountAmt.toFixed(2);

    // if senior raido checked, no bfast costs
    if (document.getElementById("seniorRadio").checked) {
        bfastCost = 0;
    }

    // Calc final Room costs
    let roomDiscount = roomCostBeforeDiscouting * discountCost;
    let roomFinalCosts = bfastCost + roomCostBeforeDiscouting;
    document.getElementById("roomPmtTotal").value = roomFinalCosts.toFixed(2);

    // Calc and display Taxes
    let taxCost = getTax(roomFinalCosts);
    document.getElementById("taxPmtTotal").value = taxCost.toFixed(2);

    // Calc and display Total Final Costs
    let totalStayCosts = taxCost + roomFinalCosts - roomDiscount;
    document.getElementById("pmtTotalDue").value = totalStayCosts.toFixed(2);

    // Call calculateReturnDate to calc return date, display return date
    let returnDate = calculateReturnDate();
    document.getElementById("returnDateOutput").value = returnDate.toDateString();

    // If any changes to input form, remove error message
    document.getElementById("hotel-Stay").onchange = function() {
        doReset();
    }
}

/*
* This funciton gets the Room Array
*
* @return obj (Object) - The Room object from the room array
*/
function getRoomInfo(roomType) {
    let priceList = [
        {roomType: "Queen", maxOccupancy: 5, highSeasonRate: 250, lowSeasonRate: 150},
        {roomType: "King", maxOccupancy: 2, highSeasonRate: 250, lowSeasonRate: 150},
        {roomType: "King Suite", maxOccupancy: 4, highSeasonRate: 310, lowSeasonRate: 190},
        {roomType: "2-Bedroom Suite", maxOccupancy: 6, highSeasonRate: 350, lowSeasonRate: 210}
    ];

   let obj;
   for (let i = 0; i < priceList.length; i++)
   {
      if (priceList[i].roomType == roomType)
      {
         obj = priceList[i];
         break;
      }
   }
   return obj;
}

/*
* This funciton calculates if the Room has capacity for the number of 
* the number of guests
*
* @return roomCost (Number) - The Room costs
*/
function canRoomHoldCustomer(roomType, numAdults, numKids) {
    let numGuests = Number(numAdults) + Number(numKids);

    // check values
    if (numGuests > roomType.maxOccupancy) {
        document.getElementById("errorP").innerHTML = "The <span id=\"msgError\">Number of Guests</span> exceeds the occupancy of the Room(s)";
        document.getElementById("errorP").style.display = "block";
    } if ( Number(numAdults) <= 0) {
        document.getElementById("errorP").innerHTML = "The Number of Adults was not correct. Please input valid positive numbers, <span id=\"msgError\">minimum 1 per room</span>";
        document.getElementById("errorP").style.display = "block";
    }
}

/*
* This funciton calculates the Room costs
*
* @return roomCost (Number) - The Room costs
*/
function getRoomCost(roomObj, checkInDate, numNights) {
    let roomCost = numNights * roomObj.lowSeasonRate;

    // Check checkInDate to ensure vaild input
    if ( checkInDate == "" ) {
        document.getElementById("errorP").innerHTML = "The <span id=\"msgError\">CheckIn Date</span> was not correct. Please input valid date";
        document.getElementById("errorP").style.display = "block";
    }
    return roomCost;
}

/*
* This funciton calculates the Breakfast costs
*
* @return optionsCost (Number) - The Breakfast costs
*/
function getBreakfastCost(numAdults, numKids, numNights) {
    let bfastCheck = Number(document.getElementById("breakfastCheck").checked);
    let optionsCostAdult, optionsCostChild, optionsCost;

    if (bfastCheck) {
        optionsCostAdult = 6.96 * numAdults;
        optionsCostChild = 3.95 * numKids;
    } else {
        optionsCostAdult = 0;
        optionsCostChild = 0;
    }
    optionsCost = (optionsCostAdult + optionsCostChild) * numNights;
    return optionsCost;
}

/*
* This funciton calculates the  discount rate
*
* @return discountRate (Number) - The discount rate based on radio inputs
*/
function getDiscount(roomPrice) {
    let aaaRadio = document.getElementById("aaaRadio").checked;
    let seniorRadio = document.getElementById("seniorRadio").checked;
    let militaryRadio = document.getElementById("militaryRadio").checked;
    let discountRate = 0;

    if (aaaRadio) {
        discountRate = .1;
    } else if (seniorRadio) {
        discountRate = .1;
    } else if (militaryRadio) {
        discountRate = .2;
    }
    return discountRate;
}

/*
* This funciton calculates the Tax
*
* @return returnDate (Date) - The return date
*/
function getTax(roomFinalCosts) {
    let taxRate = .12;
    return roomFinalCosts * taxRate;
}

/*
* This funciton calculates the Return Date
*
* @return returnDate (Date) - The return date
*/
function calculateReturnDate() {
    const numNightField = document.getElementById("numNightsInput");
    const checkInDayField = document.getElementById("checkInDateInput");
    let datePickupDay = new Date(checkInDayField.value);
    let dateTimeValue = datePickupDay.getTime();

    const msePerDay = 1000 * 60 * 60 * 24;
    let daysMSec = numNightField.value * msePerDay;
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
        document.getElementById("errorP").innerHTML = "The <span id=\"msgError\">Number of Nights</span> was not correct. Please input valid positive numbers";
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