const User = require("../models/user.model");
const Book = require("../models/book.model");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};


exports.getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario", error });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validaciones básicas
    if (!name || !email) {
      return res.status(400).json({ message: "Nombre y correo son obligatorios" });
    }

    // Verificar duplicado de email
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(400).json({ message: "El correo ya está registrado" });

    const user = new User({ name, email: email.toLowerCase() });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario", error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name && !email) {
      return res.status(400).json({ message: "Debe enviar al menos un campo a actualizar" });
    }

    if (email) {
      const duplicate = await User.findOne({ email: email.toLowerCase(), _id: { $ne: id } });
      if (duplicate) return res.status(400).json({ message: "El correo ya está registrado por otro usuario" });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { name, email: email?.toLowerCase() },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar usuario", error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    // Eliminar todos los libros asociados al usuario
    await Book.deleteMany({ user: id });

    res.json({ message: "Usuario y libros eliminados correctamente", user });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar usuario", error });
  }
};
