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

function operate() {
    if (formula.op == null) return; //ignore equal button when operand empty
    if (formula.op == 'divide' && formula.n2 == '0') {
        alert("You can't divide by zero!");
        updateDisplay(formula.n1, -2); //update display with latest result
        formula.n2 = '';
        return false;
    }
    else {
        const result = window[formula.op](formula.n1, formula.n2);
        const roundedResult = +result.toPrecision(9);
        formula.n1 = result;
        formula.n2 = '';
        formula.op = null;
        updateDisplay(roundedResult, -2);
        return result;
    }
}

function updateDisplay(string, option=0) {
    if (option == -1) {
        displayData = '';
        display.innerText = '0';
        return;
    }
    if (option == -2) displayData = '';
    if (option == -3) displayData = displayData.slice(0, -1); //remove last character
    displayData += string;
    display.innerText = displayData;
}

function clear() {
    updateDisplay('', -1);
    formula.n1 = '';
    formula.n2 = '';
    formula.op = null;
}

function inputNumber(e) {
    const number = e.target.innerText;
    if (number == '.') return; //ignore delimiter
    if (formula.op == null) { //left number
        if (formula.n1 == '' && number == '0') return; //prevent multiple zero
        formula.n1 += number;
    } else { //right number
        if (formula.n2 == '0' && number == '0') return; //allow zero once
        if (formula.n2 == '0' && number != '0') updateDisplay('', -3); //remove trailing zero
        formula.n2 += number;
    } 
    updateDisplay(e.target.innerText);
    console.log(formula);
}

function inputOperator(e) {
    const operator = e.target.getAttribute('data-function');
    if (formula.n1 == '') return; //ignore operator button when operand empty
    if (formula.op != null) operate(); // 2nd.. chain
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
btnClear.addEventListener('click', clear);
