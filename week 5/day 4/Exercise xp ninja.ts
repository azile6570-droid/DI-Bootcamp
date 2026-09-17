// Exercise 1
class Container<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  remove(item: T): void {
    this.items = this.items.filter((i) => i !== item);
  }

  list(): T[] {
    return [...this.items];
  }
}

// Exercise 2
interface ResponseData<T> {
  status: number;
  message: string;
  data: unknown;
}

function parseResponse<T>(response: ResponseData<T>): T {
  return response.data as T;
}

// Exercise 3
class Repository<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  retrieve(index: number): T {
    const item = this.items[index];
    return item as T;
  }

  list(): T[] {
    return [...this.items];
  }
}

type Identifiable = { id: number };
type Named = { name: string };
type Product = Identifiable & Named;

const productContainer = new Container<Product>();
const item1: Product = { id: 101, name: "Keyboard" };
const item2: Product = { id: 102, name: "Mouse" };

productContainer.add(item1);
productContainer.add(item2);
console.log("Container Items:", productContainer.list());

productContainer.remove(item1);
console.log("Container Items after removal:", productContainer.list());

interface UserProfile {
  id: number;
  username: string;
}

const rawApiResponse: ResponseData<UserProfile> = {
  status: 200,
  message: "Success",
  data: { id: 1, username: "dev_expert" },
};

const userProfile = parseResponse<UserProfile>(rawApiResponse);
console.log("Parsed User Profile:", userProfile.username);

const stringRepo = new Repository<string>();
stringRepo.add("TypeScript");
stringRepo.add("Generics");

console.log("Retrieved Repo Item:", stringRepo.retrieve(0).toUpperCase());
console.log("All Repo Items:", stringRepo.list());