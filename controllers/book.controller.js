const Book = require("../models/book.model");


exports.getBooks = async (req, res) => {
  try {
    const { userId } = req.params;
    const books = await Book.find({ user: userId });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener libros del usuario", error });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener todos los libros", error });
  }
};


exports.getBookById = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: `El libro con ID ${bookId} no existe` });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el libro", error });
  }
};


exports.createBook = async (req, res) => {
  try {
    const { title, author, userId } = req.body;

    const exists = await Book.findOne({
      title: { $regex: `^${title}$`, $options: "i" },
      user: userId
    });
    if (exists) return res.status(400).json({ message: "El libro ya existe para este usuario" });

    const book = new Book({ title, author, user: userId });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error al crear libro", error });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, userId } = req.body;

    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Libro no encontrado" });

    // Verificar si el libro ya está vinculado a otro usuario
    if (userId && book.user && book.user.toString() !== userId) {
      return res.status(400).json({ message: "El libro ya está vinculado a otro usuario" });
    }


    if (title) {
      const duplicate = await Book.findOne({
        title: { $regex: `^${title}$`, $options: "i" },
        user: userId ?? book.user,
        _id: { $ne: id }
      });
      if (duplicate) return res.status(400).json({ message: "El usuario ya tiene un libro con ese título" });
    }

    // Actualizar campos
    book.title = title ?? book.title;
    book.author = author ?? book.author;
    book.user = userId ?? book.user;

    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar libro", error });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) return res.status(404).json({ message: "Libro no encontrado" });
    res.json({ message: "Libro correctamente eliminado", book });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar libro", error });
  }
};
