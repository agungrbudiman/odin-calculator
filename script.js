const display = document.querySelector("#display");
let formula = {
    n1: "",
    n2: "",
    op: null,
};
let displayData = "";

function add(n1, n2) {
    return +n1 + +n2;
}

function subtract(n1, n2) {
    return n1 - n2;
}

function multiply(n1, n2) {
    return n1 * n2;
}

function divide(n1, n2) {
    return n1 / n2;
}

function leadingZeros(number) { // 0.0004342 return -3 - https://stackoverflow.com/a/31002148
    return Math.floor( Math.log10(number) + 1);
}

function operate() {
    if (formula.op == null) return; //ignore equal button when operand empty
    let result = 0;
    if (formula.op == 'divide' && formula.n2 == '0') {
        result = 'NaN';
        formula.n1 = '';
    }
    else {
        if (formula.n1 == '') formula.n1 = formula.n2; // *6 same as 6*6, follow mac/ios calc behavior
        result = window[formula.op](formula.n1, formula.n2);
        const ld = leadingZeros(result);
        if (ld <= 0) {
            result = +result.toPrecision(8+ld); // 10 digit minus 2 digit of 0.
        }
        else {
            result = +result.toPrecision(9); // 10 digit minus 1 digit of .
        }
        formula.n1 = result;
    }
    formula.n2 = '';
    formula.op = null;
    clearDisplay();
    updateDisplay(result);
    return result;
}

function updateDisplay(string) {
    displayData += string;
    display.innerText = displayData;
}

function clearDisplay() {
    displayData = "";
    display.innerText = "0";
}

function trimLastDisplay() {
    displayData = displayData.slice(0, -1);
    display.innerText = displayData;
}

function clearMemory() {
    clearDisplay();
    formula.n1 = '';
    formula.n2 = '';
    formula.op = null;
}

function inputNumber(e) {
    const number = e.target.innerText;
    if (number == '.') return; //ignore delimiter
    if (formula.op == null) { //left operand
        if (formula.n1 == '' && number == '0') return; //prevent trailing zero
        formula.n1 += number;
    } else { //right operand
        if (formula.n2 == '0' && number == '0') return; //prevent trailing zero, allow once
        if (formula.n2 == '0' && number != '0') trimLastDisplay(); //remove zero
        formula.n2 += number;
    } 
    updateDisplay(e.target.innerText);
    console.log(formula);
}

function inputOperator(e) {
    if (formula.op != null && formula.n2 != '') operate(); // 2nd, 3rd... chain
    if (formula.op != null && formula.n1 != '') trimLastDisplay(); //support operator change
    formula.op = e.target.getAttribute('data-function');
    updateDisplay(e.target.innerText);
    console.log(formula);
}

const btnNumbers = document.querySelectorAll(".grid-item.number");
const btnOperators = document.querySelectorAll(".grid-item.operator");
const btnResult = document.querySelector("#result");
const btnClear = document.querySelector("#clear");
btnNumbers.forEach(btnNumber => btnNumber.addEventListener('click', inputNumber));
btnOperators.forEach(btnOperator => btnOperator.addEventListener('click', inputOperator));
btnResult.addEventListener('click', operate);
btnClear.addEventListener('click', clearMemory);
