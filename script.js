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
    if (formula.op == null) return;
    const result = window[formula.op](formula.n1, formula.n2);
    const roundedResult = +result.toPrecision(9);
    formula.n1 = result;
    formula.n2 = '';
    formula.op = null;
    updateDisplay(roundedResult, true);
    return result;
}

function updateDisplay(string, clear=false) {
    if (clear) displayData = "";
    displayData += string;
    display.innerText = displayData;
    if (clear == -1) display.innerText = '0';
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
    if (formula.op == null) {
        if (formula.n1 == '' && number == '0') return; //prevent trailing zero
        formula.n1 += number;
    } else {
        if (formula.n2 == '' && number == '0') return; //prevent trailing zero
        formula.n2 += number;
    } 
    updateDisplay(e.target.innerText);
    console.log(formula);
}

function inputOperator(e) {
    const operator = e.target.getAttribute('data-function');
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
