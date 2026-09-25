// EXERCISE 1

const Holidays = require('date-holidays');

function timeUntilJan1st() {
  const now = new Date();
  const nextYear = now.getFullYear() + 1;
  const jan1st = new Date(`January 1, ${nextYear} 00:00:00`);

  const diffMs = jan1st - now;

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  const pad = (num) => String(num).padStart(2, '0');

  return `The 1st January is in ${days} days and ${pad(hours)}:${pad(minutes)}:${pad(seconds)} hours`;
}

// Exercise 2
function minutesLived(birthdateString) {
  const birthDate = new Date(birthdateString);
  const now = new Date();

  const diffMs = now - birthDate;
  const minutes = Math.floor(diffMs / (1000 * 60));

  return `You have lived approximately ${minutes.toLocaleString()} minutes!`;
}

function timeUntilNextHoliday() {
  const now = new Date();

  let holidayName = "New Year's Day";
  let holidayDate = new Date(`January 1, ${now.getFullYear() + 1} 00:00:00`);

  try {
    const hd = new Holidays('US');
    const upcomingHolidays = hd.getHolidays(now.getFullYear()).concat(hd.getHolidays(now.getFullYear() + 1));
    const nextHoliday = upcomingHolidays.find(h => new Date(h.date) > now);

    if (nextHoliday) {
      holidayName = nextHoliday.name;
      holidayDate = new Date(nextHoliday.date);
    }
  } catch (err) {
  }

  const diffMs = holidayDate - now;

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
  const seconds = Math.floor((diffMs / 1000) % 60);

  const pad = (num) => String(num).padStart(2, '0');

  return {
    today: now.toDateString(),
    message: `The next holiday (${holidayName}) is in ${days} days and ${pad(hours)}:${pad(minutes)}:${pad(seconds)} hours`
  };
}

module.exports = {
  timeUntilJan1st,
  minutesLived,
  timeUntilNextHoliday
};


// EXERCISE 3

const { timeUntilJan1st, minutesLived, timeUntilNextHoliday } = require('./date');

let prompt;
try {
  prompt = require('prompt-sync')();
} catch (e) {
  prompt = null;
}

console.log('--- Exercise 1 ---');
console.log(timeUntilJan1st());

console.log('\n--- Exercise 2 ---');
const hardcodedBirthdate = '1995-05-15';
console.log('Hardcoded Birthdate:', minutesLived(hardcodedBirthdate));

if (prompt) {
  const userBirthdate = prompt('Enter your birthdate (YYYY-MM-DD): ');
  if (userBirthdate) {
    console.log('Prompted Birthdate:', minutesLived(userBirthdate));
  }
}

console.log('\n--- Exercise 3 ---');
const holidayInfo = timeUntilNextHoliday();
console.log(`Today's Date: ${holidayInfo.today}`);
console.log(holidayInfo.message);
