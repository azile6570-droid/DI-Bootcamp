// EXERCISE 1[3]

const chalk = require('chalk');

function greet(name = 'Developer') {
  console.log(chalk.bold.green(`Hello, ${name}! Welcome to the Ninja CLI tool! 🚀`));
}

module.exports = greet;


const axios = require('axios');
const chalk = require('chalk');

async function fetchData() {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    console.log(chalk.yellow.bold('\n--- Fetched Data ---'));
    console.log(chalk.cyan(`Title: ${response.data.title}`));
    console.log(chalk.white(`Body: ${response.data.body}`));
  } catch (error) {
    console.error(chalk.red('Error fetching data:'), error.message);
  }
}

module.exports = fetchData;


const fs = require('fs');
const chalk = require('chalk');

function readFileContent(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    console.log(chalk.magenta.bold(`\n--- Content of ${filePath} ---`));
    console.log(data);
  } catch (error) {
    console.error(chalk.red(`Error reading file "${filePath}":`), error.message);
  }
}

module.exports = readFileContent;


const { program } = require('commander');
const greet = require('./commands/greet');
const fetchData = require('./commands/fetch');
const readFileContent = require('./commands/read');

program
  .version('1.0.0')
  .description('Ninja Command Line Utility');

program
  .command('greet [name]')
  .description('Display a colorful greeting message')
  .action((name) => greet(name));

program
  .command('fetch')
  .description('Fetch data from a public API')
  .action(() => fetchData());

program
  .command('read <filePath>')
  .description('Read and display file contents')
  .action((filePath) => readFileContent(filePath));

program.parse(process.argv);


// EXERCISE 2
const axios = require('axios');
const chalk = require('chalk');

async function getWeather(city) {
  try {
    const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;
    const response = await axios.get(url);
    const currentCondition = response.data.current_condition[0];

    const temp = currentCondition.temp_C;
    const desc = currentCondition.weatherDesc[0].value;
    const humidity = currentCondition.humidity;

    console.log('\n' + chalk.blue.bold(`============== Weather in ${city.toUpperCase()} ==============`));
    console.log(chalk.yellow(`Temperature: `) + chalk.bold(`${temp}°C`));
    console.log(chalk.green(`Condition:   `) + chalk.bold(`${desc}`));
    console.log(chalk.cyan(`Humidity:    `) + chalk.bold(`${humidity}%`));
    console.log(chalk.blue.bold(`=================================================\n`));
  } catch (error) {
    console.log(chalk.red(`\nCould not fetch weather data for "${city}". Please check the city name.\n`));
  }
}

module.exports = getWeather;


const readline = require('readline');
const getWeather = require('./weather');

function startDashboard() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Enter a city name to get the weather forecast: ', async (cityName) => {
    if (cityName.trim()) {
      await getWeather(cityName.trim());
    } else {
      console.log('City name cannot be empty!');
    }
    rl.close();
  });
}

module.exports = startDashboard;
const startDashboard = require('./dashboard');

startDashboard();