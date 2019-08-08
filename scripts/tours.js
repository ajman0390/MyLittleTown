"use strict";

// Anonymous init function call for the calculate btn onclick to call the doCalculate function
window.onload = function () {
    // document.getElementById("inputCarSelect").onchange = getTours;
    document.getElementById("addBtn").onclick = getTours;
    //document.getElementById("resetBtn").onclick = doReset;
}

function getTours() {
    // Here's your tours array
    let tours = [
        { category: "Museum Tours", title: "A Touch Tour at the Smithsonian Air And Space Museum", price: 45.00 },
        { category: "Museum Tours", title: "A Tour of TV Sets at the American History Museum", price: 15.00 },
        { category: "Museum Tours", title: "Dinosaurs are Alive at the Natural History Museum", price: 65.00 },
        { category: "Food Tours", title: "Squeezing Things at the Farmers Market", price: 12.00 },
        { category: "Food Tours", title: "Murder Mystery at the Vineyard", price: 32.00 },
        { category: "Food Tours", title: "101 Ways to Server Brussel Sprouts", price: 8.00 },
        { category: "Adventure Tours", title: "Ziplining the Poconos", price: 115.00 },
        { category: "Adventure Tours", title: "Water Skiing the Amazon", price: 4015.00 },
        { category: "Adventure Tours", title: "Parasailing Iceland", price: 3215.00 },
        { category: "Adventure Tours", title: "Kayaking to Antarctica", price: 3910.00 },
        { category: "Adventure Tours", title: "National Zoo: How to Grab a Skunk by the Neck", price: 80.00 }
    ];

    const chosenActivityField = document.getElementById("inputCarSelect");
    let selectedActivity = chosenActivityField.options[chosenActivityField.selectedIndex].innerHTML;
    console.log(selectedActivity);

    let table = document.getElementById("tours");
    let tblBody = document.createElement("tbody");
    let tbleHead = document.createElement("thead");
    let tbleTR = document.createElement("tr");
    let tbleTD = document.createElement("td");

    const len = tours.length;
    for (let i = 0; i < len; i++) {

        if (selectedActivity == tours[i].category) {

            let row = table.insertRow(table.rows.length);
            let td = row.insertCell(row.cells.length);
            // console.log(td);

            let cell1 = row.insertCell(0);
            cell1.innerHTML = tours[i].category;
            let cell2 = row.insertCell(1);
            cell2.innerHTML = tours[i].title;
            let cell3 = row.insertCell(2);
            cell3.innerHTML = "$" + tours[i].price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

            tblBody.appendChild(row);
            table.appendChild(tblBody);
        }

    }

     chosenActivityField.onchange = function () {
         tblBody.innerHTML = "";
     }
    document.getElementById("resetBtn").onclick = function () {
        tblBody.innerHTML = "";
    }

}