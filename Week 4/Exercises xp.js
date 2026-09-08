//  Exercise 1 
const colors1 = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];

colors1.forEach((color, index) => {
  console.log(`${index + 1}# choice is ${color}.`);
});

const includesViolet = colors1.some(color => color === "Violet");
console.log(includesViolet ? "Yeah" : "No...");


// Exercise 2 
const colors2 = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
const ordinal = ["th", "st", "nd", "rd"];

colors2.forEach((color, index) => {
  const pos = index + 1;
  const suffix = pos === 1 ? ordinal[1] : pos === 2 ? ordinal[2] : pos === 3 ? ordinal[3] : ordinal[0];
  console.log(`${pos}${suffix} choice is ${color}.`);
});


// Exercise 3
const fruits = ["apple", "orange"];
const vegetables = ["carrot", "potato"];
const result = ['bread', ...vegetables, 'chicken', ...fruits];
console.log("3.1 Output:", result);

const country = "USA";
console.log("3.2 Output:", [...country]);

let newArray = [...[,,]];
console.log("3.3 Output:", newArray);


//  Exercise 4
const users = [
  { firstName: 'Bradley', lastName: 'Bouley', role: 'Full Stack Resident' },
  { firstName: 'Chloe', lastName: 'Alnaji', role: 'Full Stack Resident' },
  { firstName: 'Jonathan', lastName: 'Baughn', role: 'Enterprise Instructor' },
  { firstName: 'Michael', lastName: 'Herman', role: 'Lead Instructor' },
  { firstName: 'Robert', lastName: 'Hajek', role: 'Full Stack Resident' },
  { firstName: 'Wes', lastName: 'Reid', role: 'Instructor'},
  { firstName: 'Zach', lastName: 'Klabunde', role: 'Instructor'}
];

const welcomeStudents = users.map(user => `Hello ${user.firstName}`);
console.log("4.1 Welcome:", welcomeStudents);

const fullStackResidents = users.filter(user => user.role === 'Full Stack Resident');
console.log("4.2 Full Stack Residents:", fullStackResidents);

const residentLastNames = users
  .filter(user => user.role === 'Full Stack Resident')
  .map(user => user.lastName);
console.log("4.3 Resident Last Names:", residentLastNames);


// Exercise 5 
const epic = ['a', 'long', 'time', 'ago', 'in a', 'galaxy', 'far far', 'away'];

const sentence = epic.reduce((acc, word) => `${acc} ${word}`);
console.log("5 Result:", sentence);


// Exercise 6
const students = [
  { name: "Ray", course: "Computer Science", isPassed: true }, 
  { name: "Liam", course: "Computer Science", isPassed: false }, 
  { name: "Jenner", course: "Information Technology", isPassed: true }, 
  { name: "Marco", course: "Robotics", isPassed: true }, 
  { name: "Kimberly", course: "Artificial Intelligence", isPassed: false }, 
  { name: "Jamie", course: "Big Data", isPassed: false }
];

const passedStudents = students.filter(student => student.isPassed);
console.log("6.1 Passed Students:", passedStudents);
console.log("6.2 Congratulations:");
students
  .filter(student => student.isPassed)
  .forEach(student => {
    console.log(`Good job ${student.name}, you passed the course in ${student.course}`);
  });