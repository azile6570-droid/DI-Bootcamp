// Exercise 1
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

  public override getDetails(): string {
    return `Name: ${this.name}, Salary: $${this.salary}, Department: ${this.department}`;
  }
}

const manager = new Manager("Alice", 85000, "Engineering");
console.log(manager.getDetails());


// Exercise 2
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
    return `Car: ${this.year} ${this.make} ${this.model}`;
  }
}

const myCar = new Car("Toyota", "Corolla", 2022);
console.log(myCar.getCarDetails());


// Exercise 3
class MathUtils {
  public static PI: number = 3.14159;

  public static circumference(radius: number): number {
    return 2 * MathUtils.PI * radius;
  }
}

console.log(MathUtils.circumference(5));


// Exercise 4: Interface with Function Types
interface Operation {
  (a: number, b: number): number;
}


class Addition {
  public operate: Operation = (a, b) => a + b;
}

class Multiplication {
  public operate: Operation = (a, b) => a * b;
}

const addOp = new Addition();
const multiplyOp = new Multiplication();

console.log(addOp.operate(10, 5));     
console.log(multiplyOp.operate(10, 5)); 


// Exercise 5
interface Shape {
  color: string;
  getArea(): number;
}

interface Rectangle extends Shape {
  readonly width: number;
  readonly height: number;
  getPerimeter(): number;
}

class RectangleShape implements Rectangle {
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

const rect = new RectangleShape("blue", 10, 5);
console.log(`Area: ${rect.getArea()}`);         
console.log(`Perimeter: ${rect.getPerimeter()}`);