import * as variables from './exports/variables.js';

let digit = '';
let temporary = 0;
let result = 0.00;
let nums = {
    num1: 0,
    num2: 0,
    operator: null
}

let displayValue = key => {
    let regex = new RegExp(/(?:[. \d])/, 'g');

    // Manage case where user click on digit, '0.00' should be hidden
    if (variables.screen.innerText === '0.00') {
        variables.screen.innerText = '';
    } else {
        variables.screen.innerText = '';
    }

    if (key.textContent === ',') {
        key.textContent = '.';
    }

    if (nums.num1 !== 0) {
        if (key.textContent === '=') {
            nums.num2 = digit === '' ? 0.00 : digit; 
            digit = '';
            variables.screen.textContent = nums.operator;
            variables.screen.style.fontSize = '2em';
        } else {
            digit += key.textContent.match(regex) !== null ? key.textContent : '';
            variables.screen.innerText += digit;
            variables.screen.style.fontSize = '2em';
        }
    } else {
        if (key.textContent.match(regex) === null) {
            nums.num1 = temporary !== 0 ? temporary : digit;
            nums.operator = key.textContent !== '=' ? key.textContent : '';
            digit = '';
            variables.screen.textContent = nums.operator;
            variables.screen.style.fontSize = '2em';
        } else {
            digit += key.textContent.match(regex) !== null ? key.textContent : '';
            variables.screen.innerText += digit;
            variables.screen.style.fontSize = '2em';
        }
    }

    if (key.textContent.match(regex) === null && key.textContent !== 'AC' && key.textContent === '=') {
        operations(nums.num1, nums.operator, nums.num2);
    }
}

let operations = (num1, operator, num2) => {
    
    // Manage case where user click on equals before click a digit
    if (num1.toString().length === 0) {
        num1 = 0.00;
    } else if (num2.toString().length === 0) {
        num2 = 0.00;
    }

    switch (true) {
        case operator === '+':
            result = parseFloat(num1) + parseFloat(num2);
            break;
        case operator === '-':
            result = parseFloat(num1) - parseFloat(num2);
            break;
        case operator === 'x':
            result = parseFloat(num1) * parseFloat(num2);
            break;
        case operator === '/':
            result = parseFloat(num1) / parseFloat(num2);
            break;
        default:
            result = 0.00;
            break;
    }

    variables.screen.textContent = result === 0 ? '0.00' : result;
    temporary = result;
    nums.num1 = 0;
    nums.num2 = 0;
    return result;
}


let clear = () => {
    digit = '';
    temporary = 0;
    nums.num1 = 0;
    nums.num2 = 0;
    nums.operator = null;

    variables.screen.innerText = '0.00';
    variables.screen.style.fontSize = '2em';
}

variables.keys.forEach(key => {
    key.addEventListener('click', () => {
        displayValue(key);
    });
});


variables.allClear.addEventListener('click', clear);
