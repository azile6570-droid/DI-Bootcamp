// Exercise 1
const greetingMessage: string = "Hello, World!";
console.log(greetingMessage);


// Exercise 2
let age: number = 25;
let name: string = "Alice";
console.log(`Name: ${name}, Age: ${age}`);


// Exercise 3
let id: string | number;
id = "ABC-123";
console.log(`ID (string): ${id}`);
id = 456;
console.log(`ID (number): ${id}`);


// Exercise 4
function checkNumber(num: number): string {
  if (num > 0) {
    return "positive";
  } else if (num < 0) {
    return "negative";
  } else {
    return "zero";
  }
}

console.log(checkNumber(10));  
console.log(checkNumber(-5));
console.log(checkNumber(0));   


// Exercise 5
function getDetails(personName: string, personAge: number): [string, number, string] {
  const greeting = `Hello, ${personName}! You are ${personAge} years old.`;
  return [personName, personAge, greeting];
}

const details = getDetails("Alice", 25);
console.log(details); 




// Exercise 6
type Person = {
  name: string;
  age: number;
};

function createPerson(name: string, age: number): Person {
  return { name, age };
}

const person = createPerson("Bob", 30);
console.log(person); 


// Exercise 7
const inputElement = document.getElementById("usernameInput") as HTMLInputElement;

if (inputElement) {
  inputElement.value = "JohnDoe";
}


// Exercise 8
function getAction(role: string): string {
  switch (role.toLowerCase()) {
    case "admin":
      return "Manage users and settings";
    case "editor":
      return "Edit content";
    case "viewer":
      return "View content";
    case "guest":
      return "Limited access";
    default:
      return "Invalid role";
  }
}

console.log(getAction("admin"));   
console.log(getAction("editor"));  
console.log(getAction("viewer"));  
console.log(getAction("guest"));   
console.log(getAction("unknown"));

// Exercise 9

function greet(): string;
function greet(name: string): string;

function greet(name: string = "Guest"): string {
  return `Hello, ${name}!`;
}

console.log(greet("Alice")); 
console.log(greet());  