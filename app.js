let display = document.querySelector(".calc-dis h5");

let numButtons = document.querySelectorAll(".num-btn");
let operatorButtons = document.querySelectorAll(".operator-btn");
let equalButton = document.querySelector(".operator-btn-equal");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let currentNumber = "0";
let resetDisplay = false;

// Number buttons
numButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        let value = button.innerText;
        if (resetDisplay) {
            currentNumber = "0";
            resetDisplay = false;
        }
        if (value === "." && currentNumber.includes(".")) {
            return;
        }
        if (currentNumber === "0" && value !== ".") {
            currentNumber = value;
        } else {
            currentNumber += value;
        }
        display.innerText = currentNumber;
    });
});

// Operator buttons
operatorButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        let value = button.innerText;
        if (value === "C") {
            currentNumber = "0";
            firstNumber = "";
            secondNumber = "";
            operator = "";
            resetDisplay = false;
            display.innerText = "0";
            return;
        }
        if (value === "DEL") {
            currentNumber = currentNumber.slice(0, -1);
            if (currentNumber === "" || currentNumber === "-") {
                currentNumber = "0";
            }
            display.innerText = currentNumber;
            return;
        }
        if (value === "%") {
            currentNumber = String(Number(currentNumber) / 100);
            display.innerText = currentNumber;
            return;
        }
        firstNumber = Number(currentNumber);
        operator = value;
        resetDisplay = true;
    });
});

// Equal button
equalButton.addEventListener("click", function() {
    if (operator === "" || resetDisplay) {
        return;
    }
    secondNumber = Number(currentNumber);
    let result;
    if (operator === "+") {
        result = firstNumber + secondNumber;
    }
    else if (operator === "−") {
        result = firstNumber - secondNumber;
    }
    else if (operator === "×") {
        result = firstNumber * secondNumber;
    }
    else if (operator === "÷") {
        if (secondNumber === 0) {
            display.innerText = "Cannot divide by zero";
            currentNumber = "0";
            operator = "";
            resetDisplay = true;
            return;
        }
        result = firstNumber / secondNumber;
    }
    currentNumber = String(Number(result.toFixed(8)));
    display.innerText = currentNumber;
    operator = "";
    resetDisplay = true;
});