const readline = require('readline-sync');

console.log('Welcome to the calculator!');

console.log('Please enter a number');
var number1 = readline.prompt();
//var number1 = '1111' // for debugging

while (isNaN(Number(number1))){
    console.log('This was not a valid number. Please enter a number.');
    number1 = readline.prompt();
}

console.log('Please enter a second number');
var number2 = readline.prompt();
//var number2 = '111' // for debugging

while (isNaN(Number(number2))){
    console.log('This was not a valid number. Please enter a number.');
    number2 = readline.prompt();
}

var split1 = number1.split('.');
var units1 = split1[0]; // string of numbers before .
var decimals1 = split1[1]; // string of numbers after .
var split2 = number2.split('.');
var units2 = split2[0];
var decimals2 = split2[1]
var decimalNumber1;
if (decimals1 === undefined){
    decimals1 = 0;
    decimalNumber1 = 0;
}
else{
    decimalNumber1 = decimals1.length;
}
var decimalNumber2;
if (decimals2 === undefined){
    decimals2 = 0;
    decimalNumber2 = 0;
}
else{
    decimalNumber2 = decimals2.length;
}
var resultDigits = decimalNumber1 + decimalNumber2; // how many decimal places the result will have


var result = 
    (Number(units1) * 10 ** decimalNumber1 + Number(decimals1)) 
        * (Number(units2) * 10 ** decimalNumber2 + Number(decimals2))

var resultString = String(result); // final result before adding commas or decimal point
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
    for (let i = 0; i <= commaNumber; i++){
        if (buildString.length > 0){
            buildString += ',';
        }
        buildString += remainingUnits.substring(0, 3);
        remainingUnits = remainingUnits.substring(3);
    }
    resultUnits = buildString;
}

var message = 'The product of these numbers is: ';

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

while (message.includes('.') && (message.slice(-1) == '0' || message.slice(-1) == '.')){
    message = message.slice(0, -1);
}

if (resultUnitsNumber >= 7){
    message += 'x10^' + String(resultUnitsNumber - 1);
}

console.log(message);

