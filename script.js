const display = document.querySelector("#display");
let formula = {
    n1: "",
    n2: "",
    op: "",
    text: "",
};

function add(n1, n2) { return +n1 + +n2 }

function subtract(n1, n2) { return n1 - n2 }

function multiply(n1, n2) { return n1 * n2 }

function divide(n1, n2) { 
    if (n2 == 0) return 'Error';
    return n1 / n2;
}

function leadingZeros(number) { // 0.0004342 return -3 - https://stackoverflow.com/a/31002148
    if (number == 0) return 0;
    return Math.floor( Math.log10(number) + 1);
}

function roundNumber(number) {
    if (typeof number != 'number') return number; 
    if (leadingZeros(number) <= 0) {
        return +number.toPrecision(8+leadingZeros(number)); // 10 digit minus 2 digit of 0.
    }
    else {
        return +number.toPrecision(9); // 10 digit minus 1 digit of .
    }
}

function operate(e) {
    if (formula.op == '') return; //ignore when operator empty
    if (formula.op != '' && formula.n2 == '') return; //ignore operator without minimum single operand
    if (formula.n1 == '') formula.n1 = formula.n2; // *6 same as 6*6, follow mac/ios calc behavior
    const result = window[formula.op](formula.n1, formula.n2);
    clearMemory();
    formula.n1 = roundNumber(result);
    updateDisplay();
    if (e) toggleClear('AC');
    return result;
}

function updateDisplay() {
    const displayData = formula.n1+formula.text+formula.n2;
    display.innerText = displayData;
}

function clearMemory() {
    formula.n1 = '';
    formula.n2 = '';
    formula.op = '';
    formula.text = '';
}

function toggleClear(value) {
    btnClear.innerText = value;
}

function clear(e) {
    if (e.target.innerText == 'C') {
        formula.n2 = '';
        updateDisplay();
        toggleClear('AC');
    }
    else if (e.target.innerText == 'AC'){
        clearMemory();
        display.innerText = "0";
    }
}


function inputNumber(e) {
    const number = e.target.innerText;
    if (number == '.') return; //ignore delimiter
    if (formula.op == '') { //left operand
        if (formula.n1 == '' && number == '0') return; //prevent trailing zero
        formula.n1 += number;
    } else { //right operand
        if (formula.n2 == '0' && number == '0') return; //prevent trailing zero, allow once
        if (formula.n2 == '0' && number != '0') formula.n2 = ''; //remove trailing zero
        formula.n2 += number;
        toggleClear('C');
    }
    updateDisplay();
    console.log(formula);
}

function inputOperator(e) {
    if (formula.op != '' && formula.n2 != '') operate(); // 2nd, 3rd... chain
    formula.op = e.target.getAttribute('data-function');
    formula.text = e.target.innerText;
    updateDisplay();
    console.log(formula);
}

function percentage() {
    if (formula.n1 == '') return;
    if (formula.op == 'add' || formula.op == 'subtract') { // 1000 + 50% = 1000 + 500 ; 1000 * 10% = 1000 * 0.1
        formula.n2 = formula.n1 * formula.n2 / 100;
    }
    else {
        const n = formula.op == '' ? 'n1' : 'n2';
        formula[n] = formula[n] / 100;
    }
    updateDisplay();
    console.log(formula);
}

function negative() {
    const n = formula.op == '' ? 'n1' : 'n2';
    if (formula[n].slice(0,1) == '-') { //toggle plus and minus
        formula[n] = formula[n].slice(1);
    }
    else {
        formula[n] = '-'+formula[n];
    }
    updateDisplay();
    console.log(formula);
}

const btnNumbers = document.querySelectorAll(".grid-item.number");
const btnOperators = document.querySelectorAll(".grid-item.operator");
const btnResult = document.querySelector("#result");
const btnClear = document.querySelector("#clear");
const btnPercentage = document.querySelector("#percentage");
const btnNegative = document.querySelector("#negative");
btnNumbers.forEach(btnNumber => btnNumber.addEventListener('click', inputNumber));
btnOperators.forEach(btnOperator => btnOperator.addEventListener('click', inputOperator));
btnResult.addEventListener('click', operate);
btnClear.addEventListener('click', clear);
btnPercentage.addEventListener('click', percentage);
btnNegative.addEventListener('click', negative);
