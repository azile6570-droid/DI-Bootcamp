<<<<<<< HEAD
// EXERCISE 1
const products = [
  { name: 'Laptop', price: 1200, category: 'Electronics' },
  { name: 'Phone', price: 800, category: 'Electronics' },
  { name: 'Shirt', price: 30, category: 'Apparel' },
  { name: 'Book', price: 15, category: 'Media' }
];

module.exports = products;

const products = require('./products');

function findProductByName(productName) {
  const found = products.find(p => p.name.toLowerCase() === productName.toLowerCase());
  if (found) {
    console.log(`Product Found: ${found.name} | Price: $${found.price} | Category: ${found.category}`);
  } else {
    console.log(`Product "${productName}" not found.`);
  }
}

findProductByName('Laptop');
findProductByName('Shirt');


// EXERCISE 2
export const people = [
  { name: 'Alice', age: 25, location: 'New York' },
  { name: 'Bob', age: 30, location: 'London' },
  { name: 'Charlie', age: 35, location: 'Paris' },
  { name: 'Diana', age: 22, location: 'Tokyo' }
];
import { people } from './data.js';

function calculateAverageAge(persons) {
  if (!persons.length) return 0;
  const totalAge = persons.reduce((sum, person) => sum + person.age, 0);
  const averageAge = totalAge / persons.length;
  console.log(`Average Age: ${averageAge.toFixed(2)}`);
}

calculateAverageAge(people);



// EXERCISE 3
const fs = require('fs');

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
}

module.exports = { readFile, writeFile };

const { readFile, writeFile } = require('./fileManager');

const content = readFile('./Hello World.txt');
console.log('Read content:', content);
writeFile('./Bye World.txt', 'Writing to the file');


// EXERCISE 4
export class TodoList {
  constructor() {
    this.tasks = [];
  }

  addTask(taskName) {
    this.tasks.push({ task: taskName, completed: false });
  }

  markComplete(taskIndex) {
    if (this.tasks[taskIndex]) {
      this.tasks[taskIndex].completed = true;
    }
  }

  listTasks() {
    console.log('\n--- Todo List ---');
    this.tasks.forEach((t, index) => {
      const status = t.completed ? '[✓]' : '[ ]';
      console.log(`${index + 1}. ${status} ${t.task}`);
    });
  }
}
import { TodoList } from './todo.js';

const myTodo = new TodoList();
myTodo.addTask('Buy groceries');
myTodo.addTask('Clean the room');
myTodo.markComplete(0);
myTodo.listTasks();


// EXERCISE 5
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

module.exports = { add, multiply };
const lodash = require('lodash');
const math = require('./math');

console.log('Addition:', math.add(10, 5));
console.log('Multiplication:', math.multiply(4, 3));
console.log('Lodash Mean:', lodash.mean([10, 20, 30, 40, 50]));


// EXERCISE 6
const chalk = require('chalk');

console.log(chalk.blue.bold('Hello, world!'));
console.log(chalk.green('Node.js development is awesome!'));
console.log(chalk.red.underline('ERROR: Something went wrong!'));

// EXERCISE 7

const fs = require('fs');

fs.readFile('source.txt', 'utf8', (err, data) => {
  if (err) return console.error('Error reading source.txt:', err);
  fs.writeFile('destination.txt', data, (err) => {
    if (err) return console.error('Error writing to destination.txt:', err);
    console.log('Successfully copied content from source.txt to destination.txt');
  });
});
fs.readdir('.', (err, files) => {
  if (err) return console.error('Error reading directory:', err);
  console.log('Files in directory:');
  files.forEach(file => console.log(`- ${file}`));
});
=======
// EXERCISE 1
const products = [
  { name: 'Laptop', price: 1200, category: 'Electronics' },
  { name: 'Phone', price: 800, category: 'Electronics' },
  { name: 'Shirt', price: 30, category: 'Apparel' },
  { name: 'Book', price: 15, category: 'Media' }
];

module.exports = products;

const products = require('./products');

function findProductByName(productName) {
  const found = products.find(p => p.name.toLowerCase() === productName.toLowerCase());
  if (found) {
    console.log(`Product Found: ${found.name} | Price: $${found.price} | Category: ${found.category}`);
  } else {
    console.log(`Product "${productName}" not found.`);
  }
}

findProductByName('Laptop');
findProductByName('Shirt');


// EXERCISE 2
export const people = [
  { name: 'Alice', age: 25, location: 'New York' },
  { name: 'Bob', age: 30, location: 'London' },
  { name: 'Charlie', age: 35, location: 'Paris' },
  { name: 'Diana', age: 22, location: 'Tokyo' }
];
import { people } from './data.js';

function calculateAverageAge(persons) {
  if (!persons.length) return 0;
  const totalAge = persons.reduce((sum, person) => sum + person.age, 0);
  const averageAge = totalAge / persons.length;
  console.log(`Average Age: ${averageAge.toFixed(2)}`);
}

calculateAverageAge(people);



// EXERCISE 3
const fs = require('fs');

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
}

module.exports = { readFile, writeFile };

const { readFile, writeFile } = require('./fileManager');

const content = readFile('./Hello World.txt');
console.log('Read content:', content);
writeFile('./Bye World.txt', 'Writing to the file');


// EXERCISE 4
export class TodoList {
  constructor() {
    this.tasks = [];
  }

  addTask(taskName) {
    this.tasks.push({ task: taskName, completed: false });
  }

  markComplete(taskIndex) {
    if (this.tasks[taskIndex]) {
      this.tasks[taskIndex].completed = true;
    }
  }

  listTasks() {
    console.log('\n--- Todo List ---');
    this.tasks.forEach((t, index) => {
      const status = t.completed ? '[✓]' : '[ ]';
      console.log(`${index + 1}. ${status} ${t.task}`);
    });
  }
}
import { TodoList } from './todo.js';

const myTodo = new TodoList();
myTodo.addTask('Buy groceries');
myTodo.addTask('Clean the room');
myTodo.markComplete(0);
myTodo.listTasks();


// EXERCISE 5
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

module.exports = { add, multiply };
const lodash = require('lodash');
const math = require('./math');

console.log('Addition:', math.add(10, 5));
console.log('Multiplication:', math.multiply(4, 3));
console.log('Lodash Mean:', lodash.mean([10, 20, 30, 40, 50]));


// EXERCISE 6
const chalk = require('chalk');

console.log(chalk.blue.bold('Hello, world!'));
console.log(chalk.green('Node.js development is awesome!'));
console.log(chalk.red.underline('ERROR: Something went wrong!'));

// EXERCISE 7

const fs = require('fs');

fs.readFile('source.txt', 'utf8', (err, data) => {
  if (err) return console.error('Error reading source.txt:', err);
  fs.writeFile('destination.txt', data, (err) => {
    if (err) return console.error('Error writing to destination.txt:', err);
    console.log('Successfully copied content from source.txt to destination.txt');
  });
});
fs.readdir('.', (err, files) => {
  if (err) return console.error('Error reading directory:', err);
  console.log('Files in directory:');
  files.forEach(file => console.log(`- ${file}`));
});
>>>>>>> c1941e2b7cafc7de0a16d28bba904f504e45c6e3
