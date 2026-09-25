// EXERCISE 1

const express = require('express');
const app1 = express();
const PORT1 = 3000;

app1.use(express.json());

let posts = [
  { id: 1, title: 'First Blog Post', content: 'This is the content of the first post.' },
  { id: 2, title: 'Second Blog Post', content: 'This is the content of the second post.' }
];

app1.get('/posts', (req, res) => {
  res.status(200).json(posts);
});

app1.get('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).json({ message: 'Blog post not found' });
  }

  res.status(200).json(post);
});

app1.post('/posts', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }

  const newPost = {
    id: posts.length > 0 ? posts[posts.length - 1].id + 1 : 1,
    title,
    content
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// 4. PUT /posts/:id - Update an existing blog post
app1.put('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return res.status(404).json({ message: 'Blog post not found' });
  }

  const { title, content } = req.body;
  if (title) post.title = title;
  if (content) post.content = content;

  res.status(200).json(post);
});

app1.delete('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const postIndex = posts.findIndex((p) => p.id === postId);

  if (postIndex === -1) {
    return res.status(404).json({ message: 'Blog post not found' });
  }

  const deletedPost = posts.splice(postIndex, 1);
  res.status(200).json({ message: 'Blog post deleted successfully', post: deletedPost[0] });
});

app1.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app1.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app1.listen(PORT1, () => {
  console.log(`Blog API running on http://localhost:${PORT1}`);
});


// EXERCISE 
const app2 = express();
const PORT2 = 5000;

app2.use(express.json());

let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', publishedYear: 1925 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', publishedYear: 1960 },
  { id: 3, title: '1984', author: 'George Orwell', publishedYear: 1949 }
];

app2.get('/api/books', (req, res) => {
  res.status(200).json(books);
});

app2.get('/api/books/:bookId', (req, res) => {
  const id = parseInt(req.params.bookId, 10);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  res.status(200).json(book);
});

app2.post('/api/books', (req, res) => {
  const { title, author, publishedYear } = req.body;

  const newBook = {
    id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
    title,
    author,
    publishedYear
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

app2.listen(PORT2, () => {
  console.log(`Book API running on http://localhost:${PORT2}`);
});

// EXERCISE 3

async function fetchPosts() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from JSONPlaceholder:', error.message);
    throw error;
  }
}

const app3 = express();
const PORT3 = 5001;

app3.use(express.json());

app3.get('/posts', async (req, res) => {
  try {
    const fetchedPosts = await fetchPosts();
    console.log('Data successfully retrieved and sent as a response.');
    res.status(200).json(fetchedPosts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts from external API' });
  }
});

app3.listen(PORT3, () => {
  console.log(`CRUD API running on http://localhost:${PORT3}`);
});
