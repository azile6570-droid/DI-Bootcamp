// Exercise 1
const people = ["Greg", "Mary", "Devon", "James"];
people.shift();
people[people.indexOf("James")] = "Jason";
people.push("YourName");
console.log(people.indexOf("Mary"));
const peopleCopy = people.slice(1, 3);
console.log(peopleCopy);
console.log(people.indexOf("Foo"));
const last = people[people.length - 1];
console.log(last);
for (let i = 0; i < people.length; i++) {
  console.log(people[i]);
}
for (let i = 0; i < people.length; i++) {
  console.log(people[i]);
  if (people[i] === "Devon") {
    break;
  }
}

// Exercise 2
const suffixes = ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"];
const colors = ["Red", "Blue", "Green", "Yellow", "Purple"];

for (let i = 0; i < colors.length; i++) {
  const number = i + 1;
  let suffix = suffixes[number % 10];
  if (number % 100 >= 11 && number % 100 <= 13) {
    suffix = "th";
  }
  console.log(`My ${number}${suffix} choice is ${colors[i]}`);
}

// Exercise 3
for (let i = 0; i < colors.length; i++) {
  const number = i + 1;
  let suffix = suffixes[number % 10];
  if (number % 100 >= 11 && number % 100 <= 13) {
    suffix = "th";
  }
  console.log(`My ${number}${suffix} choice is ${colors[i]}`);
}

// Exercise 4

const building = {
  numberOfFloors: 4,
  numberOfAptByFloor: {
    firstFloor: 3,
    secondFloor: 4,
    thirdFloor: 9,
    fourthFloor: 2,
  },
  nameOfTenants: ["Sarah", "Dan", "David"],
  numberOfRoomsAndRent: {
    sarah: [3, 990],
    dan: [4, 1000],
    david: [1, 500],
  },
};

console.log(building.numberOfFloors);
console.log(building.numberOfAptByFloor.firstFloor, building.numberOfAptByFloor.thirdFloor);

const secondTenant = building.nameOfTenants[1];
console.log(secondTenant, building.numberOfRoomsAndRent[secondTenant.toLowerCase()][0]);

if (building.numberOfRoomsAndRent.sarah[1] + building.numberOfRoomsAndRent.david[1] > building.numberOfRoomsAndRent.dan[1]) {
  building.numberOfRoomsAndRent.dan[1] = 1200;
}

console.log(building.numberOfRoomsAndRent.dan);

// Exercise 5
const family = {
  father: "Sam",
  mother: "Lina",
  son: "Noah",
  daughter: "Maya",
};

for (const key in family) {
  console.log(key);
}

for (const key in family) {
  console.log(family[key]);
}

// Exercise 6
const details = {
  my: "name",
  is: "Rudolf",
  the: "reindeer",
};

let sentence = "";

for (const key in details) {
  sentence += `${key} ${details[key]} `;
}

console.log(sentence.trim());

// Exercise 7
const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];

const secretSociety = [...names]
  .sort()
  .map(name => name[0])
  .join("");

console.log(secretSociety);

