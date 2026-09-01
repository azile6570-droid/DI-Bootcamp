// Exercise 1: Random Number

function randomEvenNumbers() {
  const randomNum = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
  console.log("Random number:", randomNum);
  
  for (let i = 0; i <= randomNum; i += 2) {
    console.log(i);
  }
}

// Exercise 2

function capitalize(str) {
  let evenIndexes = '';
  let oddIndexes = '';
  
  for (let i = 0; i < str.length; i++) {
    if (i % 2 === 0) {
      evenIndexes += str[i].toUpperCase();
      oddIndexes += str[i];
    } else {
      evenIndexes += str[i];
      oddIndexes += str[i].toUpperCase();
    }
  }
  
  return [evenIndexes, oddIndexes];
}

console.log(capitalize("abcdef"));
console.log(capitalize("hello"));

// Exercise 3

function isPalindrome(str) {
  const cleanStr = str.toLowerCase().replace(/\s/g, '');
  return cleanStr === cleanStr.split('').reverse().join('');
}

console.log(isPalindrome("madam"));
console.log(isPalindrome("bob"));
console.log(isPalindrome("kayak"));
console.log(isPalindrome("hello"));
console.log(isPalindrome("A man a plan a canal Panama")); 

// Exercise 4

function biggestNumberInArray(arrayNumber) {
  if (arrayNumber.length === 0) return 0;
  const numbers = arrayNumber.filter(item => typeof item === 'number');
  
  if (numbers.length === 0) return 0;
  return Math.max(...numbers);
}

const array = [-1, 0, 3, 100, 99, 2, 99];
console.log(biggestNumberInArray(array)); 

const array2 = ['a', 3, 4, 2];
console.log(biggestNumberInArray(array2));

const array3 = [];
console.log(biggestNumberInArray(array3));

// Exercise 5

function uniqueElements(list) {
  return [...new Set(list)];
}

const list1 = [1, 2, 3, 3, 3, 3, 4, 5];
console.log(uniqueElements(list1));

const list2 = [1, 2, 3, 3, 3, 3, 4, 5];
console.log(uniqueElements(list2));

// Exercise 6

function createCalendar(year, month) {
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  const titleRow = document.createElement('tr');
  const titleCell = document.createElement('th');
  titleCell.colSpan = 7;
  titleCell.textContent = `${year}-${String(month).padStart(2, '0')}`;
  titleRow.appendChild(titleCell);
  tbody.appendChild(titleRow);
  const weekdayRow = document.createElement('tr');
  const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  weekdays.forEach(day => {
    const th = document.createElement('th');
    th.textContent = day;
    weekdayRow.appendChild(th);
  });
  tbody.appendChild(weekdayRow);
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
  let dayCounter = 1;
  let weekRow = document.createElement('tr');
  for (let i = 0; i < startingDayOfWeek; i++) {
    weekRow.appendChild(document.createElement('td'));
  }
  for (let i = startingDayOfWeek; i < 7 && dayCounter <= daysInMonth; i++) {
    const dayCell = document.createElement('td');
    dayCell.textContent = dayCounter;
    weekRow.appendChild(dayCell);
    dayCounter++;
  }
  
  tbody.appendChild(weekRow);
  while (dayCounter <= daysInMonth) {
    weekRow = document.createElement('tr');
    for (let i = 0; i < 7 && dayCounter <= daysInMonth; i++) {
      const dayCell = document.createElement('td');
      dayCell.textContent = dayCounter;
      weekRow.appendChild(dayCell);
      dayCounter++;
    }
    tbody.appendChild(weekRow);
  }
  
  table.appendChild(tbody);
  return table;
}
