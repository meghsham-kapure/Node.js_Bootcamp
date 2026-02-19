import express from 'express';
import bookDB from './bookDb.js';

const app = express();
const PORT = 8000;

app.use(express.json());

// endpoints

app.get('/books', (req, res) => {
  res.json(bookDB.filter((book) => book.isDeleted === false));
});

app.get('/books/:bookId', (req, res) => {
  const bookId = parseInt(req.params.bookId);
  if (isNaN(bookId)) {
    return res.status(400).json({ errorMessage: `${req.params.bookId} is not a number` });
  } else {
    const book = bookDB.find((book) => book.bookId === bookId && book.isDeleted === false);
    return !book
      ? res.status(404).json({ message: `bookID : ${bookId} Not Found.` })
      : res.status(200).json(book);
  }
});

app.post('/books', (req, res) => {
  const book = req.body;

  const existing = bookDB.find((book) => book.bookId === newBookId);
  if (existing) {
    return res.status(409).json({ message: 'Book ID already exists' });
  }

  const newBookId = book.bookId ?? null;
  const newTitle = book.title ?? null;
  const newAuthor = book.author ?? null;
  const newPrice = book.price ?? null;
  if (
    typeof newBookId === 'number' &&
    typeof newTitle === 'string' &&
    typeof newAuthor === 'string' &&
    typeof newPrice === 'number'
  ) {
    const newBook = {
      bookId: newBookId,
      title: newTitle,
      author: newAuthor,
      price: newPrice,
      isDeleted: false,
    };

    bookDB.push(newBook);

    return res.status(201).json(newBook);
  }

  res.status(400).json({ error: 'something went wrong' });
});

app.delete('/books/:bookId', (req, res) => {
  const bookId = parseInt(req.params.bookId);
  if (isNaN(bookId)) {
    return res.status(400).json({ errorMessage: `${req.params.bookId} is not a number` });
  } else {
    const book = bookDB.find((book) => book.bookId === bookId && book.isDeleted === false);
    if (!book) {
      return res.status(404).json({ message: `bookID : ${bookId} Not Found.` });
    } else {
      book.isDeleted = true;
      return res.status(200).json(book);
    }
  }
});

app.listen(PORT, () => console.log(`Express App started listing on port ${PORT}`));
