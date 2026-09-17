// 1. Book Interface Definition
interface Book {
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre?: string; 
}

class Library {
  protected books: Book[] = [];

  public addBook(book: Book): void {
    this.books.push(book);
  }

  public getBookDetails(isbn: string): Book | string {
    const book = this.books.find((b) => b.isbn === isbn);
    if (book) {
      return book;
    }
    return `Book with ISBN ${isbn} not found.`;
  }
}

class DigitalLibrary extends Library {
  public readonly website: string;

  constructor(website: string) {
    super();
    this.website = website;
  }

  public listBooks(): string[] {
    return this.books.map((book) => book.title);
  }
}

const myDigitalLibrary = new DigitalLibrary("https://elibrary.example.com");

myDigitalLibrary.addBook({
  title: "The Pragmatic Programmer",
  author: "Andrew Hunt & David Thomas",
  isbn: "978-0201616224",
  publishedYear: 1999,
  genre: "Software Engineering",
});

myDigitalLibrary.addBook({
  title: "Clean Code",
  author: "Robert C. Martin",
  isbn: "978-0132350884",
  publishedYear: 2008,
});

console.log(`Digital Library Portal: ${myDigitalLibrary.website}`);

console.log("\n--- Book Details Search ---");
console.log(myDigitalLibrary.getBookDetails("978-0201616224"));

// List all book titles
console.log("\n--- All Book Titles ---");
console.log(myDigitalLibrary.listBooks());