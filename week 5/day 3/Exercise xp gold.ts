// ==========================================
// Exercise 1: Class Inheritance with Protected Access Modifiers
// ==========================================
class Employee {
  protected name: string;
  protected salary: number;

  constructor(name: string, salary: number) {
    this.name = name;
    this.salary = salary;
  }

  public getDetails(): string {
    return `Name: ${this.name}, Salary: $${this.salary}`;
  }
}

class Manager extends Employee {
  public department: string;

  constructor(name: string, salary: number, department: string) {
    super(name, salary);
    this.department = department;
  }

  // Override method to include department
  public override getDetails(): string {
    return `Name: ${this.name}, Salary: $${this.salary}, Department: ${this.department}`;
  }
}

const manager = new Manager("Sarah Jenkins", 85000, "Engineering");
console.log(manager.getDetails());

// ==========================================
// Exercise 2: Using Readonly with Access Modifiers
// ==========================================
class Car {
  public readonly make: string;
  private readonly model: string;
  public year: number;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  public getCarDetails(): string {
    return `${this.year} ${this.make} ${this.model}`;
  }
}

const myCar = new Car("Toyota", "Corolla", 2022);
console.log(myCar.getCarDetails());

// Modifying regular public property works fine
myCar.year = 2023; 

// The following lines cause TypeScript compilation errors because the properties are readonly:
// myCar.make = "Honda"; // Error: Cannot assign to 'make' because it is a read-only property.
// myCar.model = "Civic"; // Error: Property 'model' is private and only accessible within class 'Car'.

// ==========================================
// Exercise 3: Static Properties and Methods in Classes
// ==========================================
class MathUtils {
  public static PI: number = 3.14159;

  public static circumference(radius: number): number {
    return 2 * MathUtils.PI * radius;
  }
}

// Accessed directly on the class without instantiation
console.log(`PI Value: ${MathUtils.PI}`);
console.log(`Circumference (r=5): ${MathUtils.circumference(5)}`);

// ==========================================
// Exercise 4: Interface with Function Types
// ==========================================
interface Operation {
  (a: number, b: number): number;
}

// Implementing callable function types using class properties
class Addition {
  public execute: Operation = (a: number, b: number): number => {
    return a + b;
  };
}

class Multiplication {
  public execute: Operation = (a: number, b: number): number => {
    return a * b;
  };
}

const add = new Addition();
const multiply = new Multiplication();

console.log(`Addition (10 + 5): ${add.execute(10, 5)}`);
console.log(`Multiplication (10 * 5): ${multiply.execute(10, 5)}`);

// ==========================================
// Exercise 5: Extending Interfaces with Optional and Readonly Properties
// ==========================================
interface Shape {
  color: string;
  getArea(): number;
}

interface RectangleInterface extends Shape {
  readonly width: number;
  readonly height: number;
  getPerimeter(): number;
}

class Rectangle implements RectangleInterface {
  public color: string;
  public readonly width: number;
  public readonly height: number;

  constructor(color: string, width: number, height: number) {
    this.color = color;
    this.width = width;
    this.height = height;
  }

  public getArea(): number {
    return this.width * this.height;
  }

  public getPerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

const rect = new Rectangle("Blue", 10, 5);
console.log(`Color: ${rect.color}`);
console.log(`Area: ${rect.getArea()}`);
console.log(`Perimeter: ${rect.getPerimeter()}`);