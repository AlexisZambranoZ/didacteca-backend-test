const Book = require('../models/book.model');

exports.getBooksByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const books = await Book.find({ user: userId });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener libros', error });
  }
};

exports.createBook = async (req, res) => {
  try {
    const { title, author, userId } = req.body;

    const exists = await Book.findOne({ title, user: userId });
    if (exists) return res.status(400).json({ message: 'El libro ya existe para este usuario' });

    const book = new Book({ title, author, user: userId });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear libro', error });
  }
};


exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author } = req.body;

    const book = await Book.findByIdAndUpdate(id, { title, author }, { new: true });
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });

    res.json(book);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });

    res.json({ message: 'Libro correctamente eliminado', book });
  } catch (error) {
    res.status(500).json(error);
  }
};


exports.deleteBookFromUser = async (req, res) => {
  try {
    const { userId, bookId } = req.params;
    const book = await Book.findOne({ _id: bookId, user: userId });

    if (!book) {
      return res.status(404).json({ message: "El libro no pertenece a este usuario o no existe" });
    }

    await Book.findByIdAndDelete(bookId);

    res.json({ message: "Libro eliminado correctamente del usuario", book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el libro" , error });
  }
};

