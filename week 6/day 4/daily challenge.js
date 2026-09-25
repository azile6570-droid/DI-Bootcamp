const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// Task 1: Basic Module System
function greet(name) {
  return `Hello, ${name}! Welcome to the Node.js Daily Challenge.`;
}

// Task 2: Using an NPM Module
function displayColorfulMessage() {
  console.log(
    chalk.bold.green('✔ Success: ') +
    chalk.cyan('This is a colorful message using the chalk package!')
  );
}

// Task 3: Advanced File Operations
function readFileContent() {
  const filePath = path.join(__dirname, 'files', 'file-data.txt');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(chalk.red('Error reading file:'), err.message);
      return;
    }
    console.log(chalk.yellow('\n--- File Content ---'));
    console.log(data.trim());
    console.log(chalk.yellow('--------------------\n'));
  });
}

function runChallenge() {
  console.log('=== Running Daily Challenge ===\n');

  const greetingMessage = greet('Developer');
  console.log(greetingMessage);

  displayColorfulMessage();

  readFileContent();
}

runChallenge();