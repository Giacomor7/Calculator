const readline = require('readline-sync');

console.log('Welcome to the calculator!');
console.log('==============================');

console.log('\nPlease enter the operator: ');
var operator = readline.prompt().replace(/\s/g,'') // remove whitespace
//var operator = '+' // for debugging

while (operator != '+' && operator != '-' && operator != '*' && operator != '/'){
    console.log('This was not a valid operator. Please enter an operator (+, -, * or /): ');
    operator = readline.prompt().replace(/\s/g,'')
}

console.log('\nPlease enter the first number');
var number1 = readline.prompt();
//var number1 = '10000' // for debugging

while (isNaN(+number1)){
    console.log('This was not a valid number. Please enter a number: ');
    number1 = readline.prompt();
}

console.log('\nPlease enter the second number');
var number2 = readline.prompt();
//var number2 = '1.11111e3' // for debugging

while (isNaN(+number2)){
    console.log('This was not a valid number. Please enter a number: ');
    number2 = readline.prompt();
}

var split1 = String(+number1).split('.');
    // handle inputs such as 1.1e3 by converting to number then back to string
var units1 = split1[0]; // string of numbers before decimal point
var decimals1 = split1[1]; // string of numbers after decimal point
var split2 = String(+number2).split('.');
var units2 = split2[0];
var decimals2 = split2[1]
var decimalNumber1;
if (decimals1 === undefined){
    decimals1 = '0';
    decimalNumber1 = 0;
} else {
    decimalNumber1 = decimals1.length;
}
var decimalNumber2;
if (decimals2 === undefined){
    decimals2 = '0';
    decimalNumber2 = 0;
} else {
    decimalNumber2 = decimals2.length;
}

var result; // decimal point will be added later except for /
var resultDigits; // how many decimal places the result will have
var resultString;

switch (operator){
    case '+':
        while (decimalNumber1 > decimalNumber2){
            decimals2 += '0';
            decimalNumber2++;
        }
        while (decimalNumber1 < decimalNumber2){
            decimals1 += '0';
            decimalNumber1++;
        }
        resultDigits = decimalNumber1;
        result = (+units1 * 10 ** decimalNumber1 + +decimals1) + (+units2 * 10 ** decimalNumber2 + +decimals2);
        break;
    case '-':
        while (decimalNumber1 > decimalNumber2){
            decimals2 += '0';
            decimalNumber2++;
        }
        while (decimalNumber1 < decimalNumber2){
            decimals1 += '0';
            decimalNumber1++;
        }
        resultDigits = decimalNumber1;
        result = (+units1 * 10 ** decimalNumber1 + +decimals1) - (+units2 * 10 ** decimalNumber2 + +decimals2);
        break;
    case '*':
        resultDigits = decimalNumber1 + decimalNumber2; 
        result = (+units1 * 10 ** decimalNumber1 + +decimals1) * (+units2 * 10 ** decimalNumber2 + +decimals2);
        break;
    case '/':
        result = +number1 / +number2;
        resultDigits = Math.max(decimalNumber1, decimalNumber2, 10);
            // keep answer to precision of original numbers or 10dp max
            // implement recurring decimals here?
        resultString = String(result);
        let decimalPointIndex = resultString.indexOf('.');
        resultString = resultString.substring(0, decimalPointIndex + 1 + resultDigits);
            // maybe should be longer in cases such as 0.001 / 7 ?
            // since they don't show all 10 recurring digits due to preceding 0s...
        resultDigits = resultString.substring(decimalPointIndex + 1).length;
        resultString = resultString.replace('.', '');
        break;
}

if (operator != '/'){ // / is already in valid string form
    resultString = String(result); // final result before adding commas or decimal point
}
var resultUnitsNumber = resultString.length - resultDigits;

while (resultUnitsNumber <= 0){
    resultString = '0' + resultString;
    resultUnitsNumber++;
} // add preceding 0s if necessary

var resultUnits = resultString.substring(0, resultUnitsNumber)

// Add commas
if (resultUnitsNumber > 3 && resultUnitsNumber < 7){
    let commaNumber = Math.floor((resultUnitsNumber - 1) / 3);
    let precedingDigits = resultUnitsNumber % 3;
    let buildString = resultUnits.substring(0, precedingDigits);
    let remainingUnits = resultUnits.substring(precedingDigits);
    for (let i = 0; i < commaNumber; i++){
        if (buildString.length > 0){
            buildString += ',';
        }
        buildString += remainingUnits.substring(0, 3);
        remainingUnits = remainingUnits.substring(3);
    }
    resultUnits = buildString;
}

var message = '\nThe answer is: ';

// Scientific notation
if (resultUnitsNumber >= 7){
    message += resultString[0] + '.' + resultString.substring(1);
}
else{
    message += resultUnits;
    if (resultDigits > 0){
        message += '.' + resultString.substring(resultUnitsNumber);
    }
}

// remove trailing .000...
while (message.includes('.') && (message.slice(-1) == '0' || message.slice(-1) == '.')){
    message = message.slice(0, -1);
}

if (resultUnitsNumber >= 7){
    message += 'x10^' + String(resultUnitsNumber - 1);
}

console.log(message);

