// EXERCISE 1

const fs = require('fs');
const path = require('path');

function getFileInfo() {
  const filePath = path.join(__dirname, 'data', 'example.txt');
  const exists = fs.existsSync(filePath);

  console.log(`File exists: ${exists}`);
  if (exists) {
    const stats = fs.statSync(filePath);
    console.log(`File Size: ${stats.size} bytes`);
    console.log(`Creation Time: ${stats.birthtime}`);
  }
}

module.exports = getFileInfo;

const getFileInfo = require('./file-info');
getFileInfo();


// EXERCISE 2
const axios = require('axios');

async function fetchPosts() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    console.log('--- Post Titles ---');
    response.data.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title}`);
    });
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
}

module.exports = fetchPosts;

const fetchPosts = require('./fetch-data');
fetchPosts();


// EXERCISE 3

const { addDays, format } = require('date-fns');

function performDateOperations() {
  const currentDate = new Date();
  const futureDate = addDays(currentDate, 5);
  const formattedDate = format(futureDate, 'yyyy-MM-dd HH:mm:ss');

  console.log(`Current Date: ${currentDate}`);
  console.log(`Date after 5 days (Formatted): ${formattedDate}`);
}

module.exports = performDateOperations;

const performDateOperations = require('./date-operations');
performDateOperations();


// EXERCISE 4

const { faker } = require('@faker-js/faker');
const readlineSync = require('readline-sync');

const users = [];

function addFakeUser() {
  users.push({
    name: faker.person.fullName(),
    addressStreet: faker.location.streetAddress(),
    country: faker.location.country()
  });
}

addFakeUser();
addFakeUser();

function addUserFromPrompt() {
  console.log('\n--- Add User Manually ---');
  const name = readlineSync.question('Enter your name: ');
  const addressStreet = readlineSync.question('Enter your street address: ');
  const country = readlineSync.question('Enter your country: ');

  users.push({ name, addressStreet, country });
}

addUserFromPrompt();
console.log('\nAll Users:', users);


// EXERCISE 5

function returnNumbers(str) {
  const matches = str.match(/\d+/g);
  return matches ? matches.join('') : '';
}

console.log('Extracted Numbers:', returnNumbers('k5k3q2g5z6x9bn')); 

// EXERCISE 6
function validateFullName(input) {
  const nameRegex = /^[A-Z][a-z]+\s[A-Z][a-z]+$/;

  if (nameRegex.test(input)) {
    console.log(`Valid full name: "${input}"`);
    return true;
  } else {
    console.log(`Invalid name: "${input}". Must be two capitalized words separated by a single space.`);
    return false;
  }
}

validateFullName('John Doe'); 
validateFullName('john doe');
