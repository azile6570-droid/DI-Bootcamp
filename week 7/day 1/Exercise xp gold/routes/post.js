// routes/posts.js
const express = require('express');
const router = express.Router();

let posts = [
  {
    id: 1,
    title: 'First Blog Post',
    content: 'Welcome to my Express.js blog API!',
    timestamp: new Date().toISOString()
  }
];

// GET /posts - Retrieve all blog posts
router.get('/', (req, res) => {
  res.json(posts);
});

// GET /posts/:id - Retrieve a specific blog post by ID
router.get('/:id', (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) {
    return res.status(404).json({ error: 'Blog post not found' });
  }
  res.json(post);
});

// POST /posts - Create a new blog post
router.post('/', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newPost = {
    id: posts.length ? posts[posts.length - 1].id + 1 : 1,
    title,
    content,
    timestamp: new Date().toISOString()
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

// PUT /posts/:id - Update a blog post by ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const post = posts.find((p) => p.id === parseInt(id));
  if (!post) {
    return res.status(404).json({ error: 'Blog post not found' });
  }

  if (title !== undefined) post.title = title;
  if (content !== undefined) post.content = content;
  post.timestamp = new Date().toISOString();

  res.json(post);
});

// DELETE /posts/:id - Delete a blog post by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = posts.findIndex((p) => p.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: 'Blog post not found' });
  }

  const deletedPost = posts.splice(index, 1);
  res.json({ message: 'Blog post deleted successfully', post: deletedPost[0] });
});

module.exports = router;