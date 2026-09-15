//Exercise 1
type MappedType<T> = T extends number ? number : T extends string ? number : never;

function mapType(value: number): number;
function mapType(value: string): number;
function mapType(value: number | string): number {
  if (typeof value === "number") {
    return value * value;
  } else {
    return value.length; 
  }
}

console.log(mapType(5));       
console.log(mapType("hello"));


// Exercise 2

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = {
  id: 101,
  username: "johndoe",
  isStudent: true
};

console.log(getProperty(user, "username"));  
console.log(getProperty(user, "id"));        


// Exercise 3 
interface HasNumericProperty {
  [key: string]: number;
}

function multiplyProperty<T extends HasNumericProperty, K extends keyof T & string>(
  obj: T,
  key: K,
  factor: number
): number {
  return obj[key] * factor;
}

const inventory: HasNumericProperty = {
  apples: 10,
  oranges: 5,
  price: 2.5
};

console.log(multiplyProperty(inventory, "apples", 3)); 
console.log(multiplyProperty(inventory, "price", 2));  