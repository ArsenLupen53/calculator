// Variables to track calculator state
let firstNumber = '';
let operator = '';
let secondNumber = '';
let result = '';
let decimalAdded = false;

// Function to update the display
function updateDisplay() {
    document.getElementById('display').value = result || secondNumber || firstNumber || '0';
}

// Function to handle button clicks
document.querySelector('.buttons').addEventListener('click', function (event) {
    const clickedButton = event.target;
    const buttonValue = clickedButton.value;

    if (!isNaN(buttonValue) || buttonValue === '.') {
        if (operator === '') {
            if (buttonValue === '.' && decimalAdded) {
                return;
            }
            firstNumber += buttonValue;
        } else {
            if (buttonValue === '.' && decimalAdded) {
                return;
            }
            secondNumber += buttonValue;
        }
    } else if (buttonValue === '+' || buttonValue === '-' || buttonValue === '*' || buttonValue === '/') {
        operator = buttonValue;
        decimalAdded = false;
    } else if (buttonValue === '=') {
        if (operator && secondNumber) {
            firstNumber = parseFloat(firstNumber);
            secondNumber = parseFloat(secondNumber);
            switch (operator) {
                case '+':
                    result = firstNumber + secondNumber;
                    break;
                case '-':
                    result = firstNumber - secondNumber;
                    break;
                case '*':
                    result = firstNumber * secondNumber;
                    break;
                case '/':
                    if (secondNumber === 0) {
                        result = 'Error';
                    } else {
                        result = firstNumber / secondNumber;
                    }
                    break;
            }
            decimalAdded = false;
            operator = '';
            secondNumber = '';
        }
    } else if (buttonValue === 'C') {
        firstNumber = '';
        operator = '';
        secondNumber = '';
        result = '';
        decimalAdded = false;
    } else if (buttonValue === '←') {
        if (operator && secondNumber) {
            secondNumber = secondNumber.slice(0, -1);
        } else if (operator) {
            operator = '';
        } else if (firstNumber) {
            firstNumber = firstNumber.slice(0, -1);
        }
    }

    updateDisplay();
});
