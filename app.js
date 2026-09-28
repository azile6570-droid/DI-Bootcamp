const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');
const booksRouter = require('./routes/books');

app.use('/', indexRouter);
app.use('/todos', todosRouter);
app.use('/books', booksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
