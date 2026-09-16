// 1. Interface Book
interface Book {
  title: string;
  author: string;
  isbn: string;
  publishedYear: number;
  genre?: string; // Optional property
}

// 2. Class Library
class Library {
  protected books: Book[] = [];

  public addBook(book: Book): void {
    this.books.push(book);
  }

  public getBookDetails(isbn: string): Book | string {
    const book = this.books.find((b) => b.isbn === isbn);
    return book ? book : `Book with ISBN ${isbn} not found.`;
  }
}

// 3. Class DigitalLibrary
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

// --- Execution & Testing ---

const myDigitalLibrary = new DigitalLibrary("https://my-digital-library.com");

myDigitalLibrary.addBook({
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
  isbn: "978-0261102217",
  publishedYear: 1937,
  genre: "Fantasy"
});

myDigitalLibrary.addBook({
  title: "1984",
  author: "George Orwell",
  isbn: "978-0451524935",
  publishedYear: 1949
});

console.log("Book Details:", myDigitalLibrary.getBookDetails("978-0261102217"));

console.log("All Book Titles:", myDigitalLibrary.listBooks());
