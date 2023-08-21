let currentInput = '';
const display = document.getElementById('display');

function appendToDisplay(value) {
    currentInput += value;
    display.textContent = currentInput; 
}

function clearDisplay() {
    currentInput = '';
    display.textContent = '0';
}

function calculate() {
    try {
        const result = evaluateExpression(currentInput);
        if (result !== null) {
            currentInput = result.toString();
            display.textContent = currentInput;
        } else {
            display.textContent = 'Error';
        }
    } catch (error) {
        display.textContent = 'Error';
    }
}

function evaluateExpression(expression) {
    const operators = ['+', '-', '*', '/'];
    const numbers = [];
    const ops = [];

    let numBuffer = '';

    for (const char of expression) {
        if (!isNaN(parseFloat(char)) || char === '.') {
            numBuffer += char;
        } else if (operators.includes(char)) {
            if (numBuffer !== '') {
                numbers.push(parseFloat(numBuffer));
                numBuffer = '';
            }
            while (ops.length > 0 && hasPrecedence(char, ops[ops.length - 1])) {
                numbers.push(ops.pop());
            }
            ops.push(char);
        }
    }

    if (numBuffer !== '') {
        numbers.push(parseFloat(numBuffer));
    }

    while (ops.length > 0) {
        numbers.push(ops.pop());
    }

    return evaluatePostfix(numbers);
}

function hasPrecedence(op1, op2) {
    if ((op1 === '*' || op1 === '/') && (op2 === '+' || op2 === '-')) {
        return false;
    }
    return true;
}

function evaluatePostfix(expression) {
    const stack = [];

    for (const token of expression) {
        if (!isNaN(token)) {
            stack.push(token);
        } else {
            const operand2 = stack.pop();
            const operand1 = stack.pop();

            if (operand1 === undefined || operand2 === undefined) {
                return null;
            }

            switch (token) {
                case '+':
                    stack.push(operand1 + operand2);
                    break;
                case '-':
                    stack.push(operand1 - operand2);
                    break;
                case '*':
                    stack.push(operand1 * operand2);
                    break;
                case '/':
                    stack.push(operand1 / operand2);
                    break;
                default:
                    return null;
            }
        }
    }

    return stack.pop();
}
