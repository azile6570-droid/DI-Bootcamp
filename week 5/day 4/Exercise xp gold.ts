// Exercise 1
interface User {
  name: string;
  email: string;
}

interface Admin {
  adminLevel: number;
}

type AdminUser = User & Admin;

function getProperty(obj: AdminUser, prop: string): unknown {
  if (prop in obj) {
    return obj[prop as keyof AdminUser];
  }
  return undefined;
}

 // Exercise 2
function castToType<T>(value: unknown, targetConstructor: { (val: unknown): T }): T {
  return targetConstructor(value);
}

const numValue = castToType<number>("123", Number);
const boolValue = castToType<boolean>("true", Boolean);

// Exercise 3
function getArrayLength<T extends string | number>(arr: T[]): number {
  const typedArray = arr as (string | number)[];
  return typedArray.length;
}

// Exercise 4
interface Storage<T> {
  add(item: T): void;
  get(index: number): T | undefined;
}

class box<T> implements Storage<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T | undefined {
    return this.items[index];
  }
}

// Exercise 5
interface Item<T> {
  value: T;
}

class Queue<T> {
  private collection: Item<T>[] = [];

  add(item: Item<T>): void {
    this.collection.push(item);
  }

  remove(): Item<T> | undefined {
    return this.collection.shift();
  }
}


const adminUser: AdminUser = {
  name: "Sarah",
  email: "sarah@company.com",
  adminLevel: 2,
};
console.log("Name property:", getProperty(adminUser, "name"));
console.log("Unknown property:", getProperty(adminUser, "role"));

console.log("Casted Number:", numValue, typeof numValue);
console.log("Casted Boolean:", boolValue, typeof boolValue);

console.log("Numbers Length:", getArrayLength([10, 20, 30]));
console.log("Strings Length:", getArrayLength(["apple", "banana"]));

const stringBox = new Box<string>();
stringBox.add("TypeScript");
console.log("Retrieved Box item:", stringBox.get(0));

const numberQueue = new Queue<number>();
numberQueue.add({ value: 42 });
numberQueue.add({ value: 84 });
console.log("Removed Queue item:", numberQueue.remove());