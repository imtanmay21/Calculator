// UI variables
const display = document.querySelector('#calculator input');
const numbers = document.querySelectorAll('.numbers');
const operators = document.querySelectorAll('.operators');
const resultBtn = document.getElementById('btn-equal');
const clearBtn = document.getElementById('btn-c');
const ptBtn = document.getElementById('btn-point');

// Global vars
let opAdded = false;
let isResultDisplayed = false;

// Load all event listeners
loadAllEventListeners();

// Declare Event listners
function loadAllEventListeners() {

    // Clicking the number
    numbers.forEach(function (number) {
        number.addEventListener('click', appendNumbers);
    });

    // Clicking on operators
    operators.forEach(function (operator) {
        operator.addEventListener('click', appendOperators);
    })

    // Clicking on equal button
    resultBtn.addEventListener('click', calcRes);

    // Clicking on clear button
    clearBtn.addEventListener('click', clearVal);

    // Clicking on point button
    ptBtn.addEventListener('click', appendPt);
}

function appendNumbers(e) {

    if (isResultDisplayed == false) {
        let num = e.target.innerText;
        display.value += num;

        opAdded = true
    }
}

function appendPt(e) {

    let displayVal = display.value
    let lastChar = displayVal[displayVal.length - 1];

    if(parseInt(lastChar) <= 10 && parseInt(lastChar) >= 0) {
        display.value += '.';
    }

}

function appendOperators(e) {

    if (opAdded == true && isResultDisplayed == false) {

        let op = e.target.innerText;
        let displayVal = display.value;

        lastChar = displayVal[displayVal.length - 1];

        display.value += op;

        opAdded = false;

    } else {
        console.log('OP already added');
    }
}

// Calculate Result
function calcRes() {

    // Temp result
    let tempRes = 0;

    // Get expression
    let expression = display.value;

    //  Getting numbers into an array
    let numArr = expression.split(/\+|\-|\×|\÷/g);

    // Get operators
    let operators = expression.replace(/[0-9]|\./g, '').split('');


    // Dividing
    let divide = operators.indexOf('÷');
    while (divide != -1) {

        // Replace the res into numbers array
        numArr.splice(divide, 2, parseFloat(numArr[divide]) / parseFloat(numArr[divide + 1]))

        // Remove operators divide
        operators.splice(divide, 1);

        // Taking the next operator of divide
        divide = operators.indexOf('÷');

    }

    // Multiplying
    let mult = operators.indexOf('×');
    while (mult != -1) {
        numArr.splice(mult, 2, parseFloat(numArr[mult]) * parseFloat(numArr[mult + 1]));
        operators.splice(mult, 1);
        mult = operators.indexOf('×');
    }

    // Adding
    let add = operators.indexOf('+');
    while (add != -1) {
        numArr.splice(add, 2, parseFloat(numArr[add]) + parseFloat(numArr[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf('+');
    }

    // Subtracting
    let sub = operators.indexOf('-');
    while (sub != -1) {
        numArr.splice(sub, 2, parseFloat(numArr[sub]) - parseFloat(numArr[sub + 1]));
        operators.splice(sub, 1);
        sub = operators.indexOf('-');
    }

    display.value = numArr[0];

    isResultDisplayed = true;
}


// Clear Value
function clearVal() {

    display.value = '';
    isResultDisplayed = false;

}


