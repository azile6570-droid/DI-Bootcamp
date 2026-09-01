// Exercise 1

function isBlank(str) {
  return str === '' || str.trim() === '';
}
console.log(isBlank(''));
console.log(isBlank('abc'));
console.log(isBlank('   '));

// Exercise 2

function abbrevName(name) {
  const parts = name.split(' ');
  const firstName = parts[0];
  const lastNameInitial = parts[1].charAt(0).toUpperCase();
  return firstName + ' ' + lastNameInitial + '.';
}

console.log(abbrevName("Robin Singh"));
console.log(abbrevName("john doe"));
console.log(abbrevName("Alice Johnson"));

// Exercise 3

function swapCase(str) {
  return str.split('').map(char => {
    if (char === char.toUpperCase()) {
      return char.toLowerCase();
    } else {
      return char.toUpperCase();
    }
  }).join('');
}

console.log(swapCase('The Quick Brown Fox'));
console.log(swapCase('Hello World'));

// Exercise 4

function isOmnipresent(arr, value) {
  return arr.every(subarray => subarray.includes(value));
}

console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 1)); // true
console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 6)); // false
console.log(isOmnipresent([[3, 4], [8, 3, 2], [3], [9, 3], [5, 3], [4, 3]], 3)); // true


