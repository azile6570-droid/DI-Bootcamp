// Exercise 1
console.log("--- EXERCISE 1 ---");
const numbers = [10, 20, 30, 40];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log("Sum:", sum); 

// Exercise 2 
const duplicatesArray = [1, 2, 2, 3, 4, 4, 5, 1];
const uniqueArray = [...new Set(duplicatesArray)];
console.log("Unique array:", uniqueArray); 

// Exercise 3 
const sampleArray = [NaN, 0, 15, false, -22, '', undefined, 47, null];

function cleanArray(arr) {
  return arr.filter(Boolean);
}

console.log("Cleaned array:", cleanArray(sampleArray)); 


// Exercise 4 
function repeat(str, n = 1) {
  return str.repeat(n);
}

console.log(repeat('Ha!', 3));
console.log(repeat('Ha!')); 

// Exercise 5 
const startLine = '     ||<- Start line';
let turtle = '🐢';
let rabbit = '🐇';
turtle = turtle.padStart(8);
rabbit = rabbit.padStart(8);

console.log(startLine);
console.log(turtle);
console.log(rabbit);
turtle = turtle.trim().padEnd(9, '=');
console.log("Padded turtle:", turtle);