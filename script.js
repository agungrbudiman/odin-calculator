const display = document.querySelector("#display");

function add(n1, n2) {
    console.log(n1);
    return n1 + n2;
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

function operate(operator, n1, n2) {
    return operator(n1, n2);
}

let displayData = "";
function OutputToDisplay(e) {
    displayData += e.target.innerText;
    display.textContent = displayData;
}

const btnNumbers = document.querySelectorAll(".grid-item.number");
btnNumbers.forEach(btnNumber => {
    btnNumber.addEventListener('click', OutputToDisplay);
});
