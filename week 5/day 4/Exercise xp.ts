// Exercise 1
type Person = {
  name: string;
  age: number;
};

type Address = {
  street: string;
  city: string;
};

type PersonWithAddress = Person & Address;

const personWithAddress: PersonWithAddress = {
  name: "Alice",
  age: 30,
  street: "123 Main St",
  city: "Nairobi",
};

// Exercise 2
function describeValue(value: number | string): string {
  if (typeof value === "number") {
    return "This is a number";
  }
  if (typeof value === "string") {
    return "This is a string";
  }
  return "Unknown type";
}

// Exercise 3
let someValue: any = "Hello TypeScript";
let stringValue = someValue as string; 
console.log(stringValue.toUpperCase());

// Exercise 4
function getFirstElement(arr: (number | string)[]): string {
  return (arr[0] as string).toString();
}

// Exercise 5
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(item: T): void {
  console.log(`Length: ${item.length}`);
}

// Exercise 6
type Job = {
  position: string;
  department: string;
};

type Employee = Person & Job;

function describeEmployee(employee: Employee): string {
  // Type guard checking the position property value
  if (employee.position === "Manager") {
    return `${employee.name} manages the ${employee.department} department.`;
  } else if (employee.position === "Developer") {
    return `${employee.name} builds software in the ${employee.department} department.`;
  }
  return `${employee.name} works as a ${employee.position} in ${employee.department}.`;
}

// Exercise 7
interface Stringifiable {
  toString(): string;
}

function formatInput<T extends Stringifiable>(input: T): string {
  const str = input.toString() as string;
  return `Formatted: ${str.trim().toUpperCase()}`;
}

console.log(describeValue(42));
console.log(describeValue("TypeScript"));

console.log(getFirstElement(["First", 2, "Third"]));

logLength("Hello World");
logLength([10, 20, 30, 40]);

const manager: Employee = {
  name: "Bob",
  age: 40,
  position: "Manager",
  department: "Engineering",
};
console.log(describeEmployee(manager));

console.log(formatInput("   hello generics   "));
console.log(formatInput(12345));