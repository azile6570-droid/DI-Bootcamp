// Exercise 1 
const data = [
  { name: 'Butters', age: 3, type: 'dog' },
  { name: 'Cuty', age: 5, type: 'rabbit' },
  { name: 'Lizzy', age: 6, type: 'dog' },
  { name: 'Red', age: 1, type: 'cat' },
  { name: 'Joey', age: 3, type: 'dog' },
  { name: 'Rex', age: 10, type: 'dog' }
];

let loopSum = 0;
for (let i = 0; i < data.length; i++) {
  if (data[i].type === 'dog') {
    loopSum += data[i].age * 7;
  }
}
console.log("Loop Sum:", loopSum);
const reduceSum = data.reduce((acc, animal) => {
  return animal.type === 'dog' ? acc + (animal.age * 7) : acc;
}, 0);
console.log("Reduce Sum:", reduceSum); 

// Exercise 2 
const userEmail3 = ' cannotfillemailformcorrectly@gmail.com ';
const cleanedEmail = userEmail3.trim();
console.log("Cleaned Email:", cleanedEmail); 

// Exercise 3 
const users = [
  { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
  { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
  { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
  { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
  { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
  { firstName: 'Wes', lastName: 'Reid', role: 'Instructor' },
  { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor' }
];

const structuredUsers = {};
users.forEach(user => {
  structuredUsers[`${user.firstName} ${user.lastName}`] = user.role;
});
console.log("Structured Users:", structuredUsers);

// Exercise 4 
const letters = ['x', 'y', 'z', 'z'];
const countLoop = {};
for (let i = 0; i < letters.length; i++) {
  const char = letters[i];
  countLoop[char] = (countLoop[char] || 0) + 1;
}
console.log("For Loop Output:", countLoop); 
const countReduce = letters.reduce((acc, char) => {
  acc[char] = (acc[char] || 0) + 1;
  return acc;
}, {});
console.log("Reduce Output:", countReduce);