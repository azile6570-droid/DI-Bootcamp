// Exercise 7: My Book List

// Array of book objects
const allBooks = [
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K. Rowling",
    image: "https://covers.openlibrary.org/b/id/7929355-M.jpg",
    alreadyRead: true
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    image: "https://covers.openlibrary.org/b/id/7897150-M.jpg",
    alreadyRead: false
  }
];

// Get the section element
const section = document.querySelector(".listBooks");

// Loop through each book and render it
allBooks.forEach((book) => {
  // Create a div for the book
  const bookDiv = document.createElement("div");
  bookDiv.className = "book";

  // Create the image element
  const imgElement = document.createElement("img");
  imgElement.src = book.image;
  imgElement.alt = book.title;
  imgElement.style.width = "100px";

  // Create a paragraph for the book details
  const detailsP = document.createElement("p");
  detailsP.textContent = `${book.title} written by ${book.author}`;

  // If the book is already read, set the color to red
  if (book.alreadyRead) {
    detailsP.style.color = "red";
  }

  // Append the image and details to the book div
  bookDiv.appendChild(imgElement);
  bookDiv.appendChild(detailsP);

  // Append the book div to the section
  section.appendChild(bookDiv);
});
