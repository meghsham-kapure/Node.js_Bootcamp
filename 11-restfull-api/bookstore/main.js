import express from 'express';
// In Memory Database
const bookDB = [
  { bookId: 1, title: 'Two States', author: 'Chetan Bhagat', price: 599, isDeleted: false },
  { bookId: 2, title: 'The Alchemist', author: 'Paulo Coelho', price: 399, isDeleted: false },
  { bookId: 3, title: 'Atomic Habits', author: 'James Clear', price: 699, isDeleted: false },
  { bookId: 4, title: 'Start With Why', author: 'Simon Sinek', price: 610, isDeleted: false },
  { bookId: 5, title: 'Ikigai', author: 'Hector Garcia', price: 450, isDeleted: false },
  { bookId: 6, title: 'The Power of Now', author: 'Eckhart Tolle', price: 550, isDeleted: false },
  { bookId: 7, title: 'The 5 AM Club', author: 'Robin Sharma', price: 580, isDeleted: false },
  { bookId: 8, title: 'Zero to One', author: 'Peter Thiel', price: 640, isDeleted: false },
  { bookId: 9, title: 'Sapiens', author: 'Yuval Noah Harari', price: 750, isDeleted: false },
  { bookId: 10, title: 'The Hobbit', author: 'J.R.R. Tolkien', price: 480, isDeleted: false },
  { bookId: 11, title: '1984', author: 'George Orwell', price: 390, isDeleted: false },
  { bookId: 12, title: 'You Don’t Know JS', author: 'Kyle Simpson', price: 560, isDeleted: false },
  { bookId: 13, title: 'Brave New World', author: 'Aldous Huxley', price: 410, isDeleted: false },
  { bookId: 14, title: 'The Lean Startup', author: 'Eric Ries', price: 650, isDeleted: false },
  { bookId: 15, title: 'Clean Code', author: 'Robert C. Martin', price: 810, isDeleted: false },
  { bookId: 16, title: 'Refactoring', author: 'Martin Fowler', price: 880, isDeleted: false },
  { bookId: 17, title: 'Grit', author: 'Angela Duckworth', price: 540, isDeleted: false },
  { bookId: 18, title: 'The Art of War', author: 'Sun Tzu', price: 150, isDeleted: false },
  { bookId: 19, title: 'Meditations', author: 'Marcus Aurelius', price: 180, isDeleted: false },
  { bookId: 20, title: 'The Shining', author: 'Stephen King', price: 510, isDeleted: false },
];

const app = express();
const PORT = 8000;

// middleware
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

// server listening on
app.listen(PORT, () => console.log(`Express App started listing on port ${PORT}`));
