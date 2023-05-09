const bookModel = require("../models/bookModel");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await bookModel.find({});
    res.json(books);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.addBook = async (req, res) => {
  const { title, author } = req.body;

  // Validate input
  if (!title || !author) {
    return res
      .status(400)
      .send({ status: false, msg: "Missing required fields" });
  }

  // Create new book
  try {
    const book = await bookModel.create({ title, author });
    res.status(201).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, msg: error.msg });
  }
};
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author } = req.body;
    const updatedBook = await bookModel.findByIdAndUpdate(
      id,
      { title, author },
      { new: true }
    );
    if (!updatedBook) {
      return res.sendStatus(404);
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await bookModel.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.sendStatus(404);
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
