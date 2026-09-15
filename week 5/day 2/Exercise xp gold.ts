// Exercise 1
function processValue(value: string | number): string {
  if (typeof value === "number") {
    return `$${value.toFixed(2)}`;
  } else {
    return value.split("").reverse().join("");
  }
}

console.log(processValue("hello")); 


// Exercise 2
function sumNumbersInArray(arr: (number | string)[]): number {
  let sum = 0;
  for (const item of arr) {
    if (typeof item === "number") {
      sum += item;
    }
  }
  return sum;
}

console.log(sumNumbersInArray([10, "apple", 20, "banana", 30])); 
console.log(sumNumbersInArray(["a", "b", "c"]));                 


// Exercise 3
type AdvancedUser = {
  name: string;
  age: number;
  address?: string;
};

function introduceAdvancedUser(user: AdvancedUser): string {
  if (user.address) {
    return `Hello, my name is ${user.name}, I am ${user.age} years old and I live at ${user.address}.`;
  }
  return `Hello, my name is ${user.name} and I am ${user.age} years old.`;
}

const user1: AdvancedUser = { name: "Alice", age: 28 };
const user2: AdvancedUser = { name: "Bob", age: 34, address: "123 Main St" };

console.log(introduceAdvancedUser(user1)); 

console.log(introduceAdvancedUser(user2)); 


// Exercise 4
function welcomeUser(name: string, greeting?: string): string {
  const finalGreeting = greeting ?? "Hello";
  return `${finalGreeting}, ${name}!`;
}

// Testing Exercise 4
console.log(welcomeUser("Sarah"));           
console.log(welcomeUser("Michael", "Welcome")); 