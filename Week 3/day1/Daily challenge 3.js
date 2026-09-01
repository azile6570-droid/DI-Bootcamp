// CHALLENGE
const numbers = [5, 0, 9, 1, 7, 4, 2, 6, 3, 8];

// 1. Using .toString()
const numbersString = numbers.toString();
console.log(numbersString);

// 2. Using .join() with different separators
console.log(numbers.join("+"));
console.log(numbers.join(" "));
console.log(numbers.join(""));

// Bonus: descending bubble sort using nested loops
let sortedNumbers = [...numbers];

for (let i = 0; i < sortedNumbers.length; i++) {
  for (let j = 0; j < sortedNumbers.length - 1 - i; j++) {
    // If the current value is smaller than the next one, swap them
    if (sortedNumbers[j] < sortedNumbers[j + 1]) {
      let temp = sortedNumbers[j];
      sortedNumbers[j] = sortedNumbers[j + 1];
      sortedNumbers[j + 1] = temp;
    }

    // Log each pass
    console.log(`Pass ${i + 1}, comparison ${j + 1}: ${sortedNumbers}`);
  }
}

console.log("Final sorted array:", sortedNumbers)

