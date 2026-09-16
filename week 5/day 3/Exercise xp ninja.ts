// Exercise 1
class Employee {
  public name: string;
  private age: number;
  protected salary: number;

  constructor(name: string, age: number, salary: number) {
    this.name = name;
    this.age = age;
    this.salary = salary;
  }

  protected calculateBonus(): number {
    return this.salary * 0.1; 
  }

  public getSalaryDetails(): string {
    return `Base Salary: $${this.salary}`;
  }
}

class Manager extends Employee {
  constructor(name: string, age: number, salary: number) {
    super(name, age, salary);
  }

  public override getSalaryDetails(): string {
    const bonus = this.calculateBonus();
    return `Base Salary: $${this.salary}, Bonus: $${bonus}, Total: $${this.salary + bonus}`;
  }
}

class ExecutiveManager extends Manager {
  constructor(name: string, age: number, salary: number) {
    super(name, age, salary);
  }

  public approveBudget(amount: number): string {
    return `Executive Manager ${this.name} approved a budget of $${amount}`;
  }
}

const exec = new ExecutiveManager("Sarah", 42, 120000);
console.log(exec.getSalaryDetails());
console.log(exec.approveBudget(50000));


// Exercise 2
class Shape {
  public static totalShapes: number = 0;

  constructor() {
    Shape.totalShapes++;
  }

  public static getType(): string {
    return "Generic Shape";
  }
}

class Circle extends Shape {
  public radius: number;

  constructor(radius: number) {
    super();
    this.radius = radius;
  }

  public static override getType(): string {
    return "Circle";
  }

  public getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Square extends Shape {
  public side: number;

  constructor(side: number) {
    super();
    this.side = side;
  }

  public static override getType(): string {
    return "Square";
  }

  public getArea(): number {
    return this.side * this.side;
  }
}

const c = new Circle(5);
const s = new Square(4);
console.log(`Type: ${Circle.getType()}, Area: ${c.getArea()}`);
console.log(`Type: ${Square.getType()}, Area: ${s.getArea()}`);
console.log(`Total Shapes Created: ${Shape.totalShapes}`); // Output: 2


// Exercise 3
interface Calculator {
  a: number;
  b: number;
  operate(fn: (x: number, y: number) => number): number;
}

class AdvancedCalculator implements Calculator {
  public a: number;
  public b: number;

  constructor(a: number, b: number) {
    this.a = a;
    this.b = b;
  }

  public operate(fn: (x: number, y: number) => number): number {
    return fn(this.a, this.b);
  }

  public add(): number {
    return this.operate((x, y) => x + y);
  }

  public subtract(): number {
    return this.operate((x, y) => x - y);
  }

  public multiply(): number {
    return this.operate((x, y) => x * y);
  }
}

const calc = new AdvancedCalculator(12, 4);
console.log(`Add: ${calc.add()}`);        
console.log(`Subtract: ${calc.subtract()}`); 
console.log(`Multiply: ${calc.multiply()}`);


// Exercise 4
class Device {
  public readonly serialNumber: string;

  constructor(serialNumber: string) {
    this.serialNumber = serialNumber;
  }

  public getDeviceInfo(): string {
    return `Serial Number: ${this.serialNumber}`;
  }
}

class Laptop extends Device {
  public model: string;
  public price: number;

  constructor(serialNumber: string, model: string, price: number) {
    super(serialNumber);
    this.model = model;
    this.price = price;
  }

  public override getDeviceInfo(): string {
    return `Model: ${this.model}, Serial Number: ${this.serialNumber}, Price: $${this.price}`;
  }
}

const myLaptop = new Laptop("SN-998231", "MacBook Pro", 2400);
myLaptop.model = "MacBook Pro M3";
myLaptop.price = 2200;            
console.log(myLaptop.getDeviceInfo());


// Exercise 5
interface Product {
  readonly name: string;
  price: number;
  discount?: number;
}

interface Electronics extends Product {
  warrantyPeriod: number; }

class Smartphone implements Electronics {
  public readonly name: string;
  public price: number;
  public discount?: number;
  public warrantyPeriod: number;

  constructor(name: string, price: number, warrantyPeriod: number, discount?: number) {
    this.name = name;
    this.price = price;
    this.warrantyPeriod = warrantyPeriod;
    this.discount = discount;
  }

  public getFinalPrice(): number {
    if (this.discount) {
      return this.price - (this.price * (this.discount / 100));
    }
    return this.price;
  }
}

const phone = new Smartphone("Galaxy S24", 1000, 24, 15);
console.log(`Phone: ${phone.name}`);
console.log(`Final Price after discount: $${phone.getFinalPrice()}`);