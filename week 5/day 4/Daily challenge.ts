// CHALLENGE
type User = {
  type: "user";
  name: string;
  age: number;
};

type Product = {
  type: "product";
  id: number;
  price: number;
};

type Order = {
  type: "order";
  orderId: string;
  amount: number;
};

type DataItem = User | Product | Order;

function isUser(item: DataItem): item is User {
  return item.type === "user";
}

function isProduct(item: DataItem): item is Product {
  return item.type === "product";
}

function isOrder(item: DataItem): item is Order {
  return item.type === "order";
}

function handleData(items: DataItem[]): string[] {
  return items.map((item) => {
    if (isUser(item)) {
      return `Hello ${item.name}, you are ${item.age} years old.`;
    }

    if (isProduct(item)) {
      return `Product ID: ${item.id} - Price: $${item.price.toFixed(2)}`;
    }

    if (isOrder(item)) {
      return `Order #${item.orderId} processed for total amount of $${item.amount.toFixed(2)}.`;
    }

    const _exhaustiveCheck: never = item;
    return `Unhandled data type: ${JSON.stringify(_exhaustiveCheck)}`;
  });
}

const mixedData: DataItem[] = [
  { type: "user", name: "Alice", age: 28 },
  { type: "product", id: 101, price: 49.99 },
  { type: "order", orderId: "ORD-9281", amount: 120.5 },
];

const results = handleData(mixedData);
results.forEach((msg) => console.log(msg));