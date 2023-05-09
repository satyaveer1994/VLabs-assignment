const bookModel = require("../models/bookModel");
const memberModel = require("../models/memberModel");
const borrowingModel = require("../models/borrowingModel");

exports.borrowBook = async (req, res) => {
  try {
    const { bookId, memberId } = req.body;

    // Check if book exists and is available
    const book = await bookModel.findById(bookId);
    if (!book || book.status !== "AVAILABLE") {
      return res.status(400).json({ error: "Book not available" });
    }

    // Check if member exists
    const member = await memberModel.findById(memberId);
    if (!member) {
      return res.status(400).json({ error: "Invalid member ID" });
    }

    // Create new borrowing record
    const borrowing = new borrowingModel({ book: bookId, member: memberId });
    await borrowing.save();

    // Update book status to BORROWED
    book.status = "BORROWED";
    await book.save();

    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Find borrowing record by ID
    const borrowing = await borrowingModel.findById(id).populate("book member");
    if (!borrowing) {
      return res.sendStatus(404);
    }

    // Update borrowing record with returnedAt date
    borrowing.returnedAt = new Date();
    await borrowingModel.save();

    // Update book status to AVAILABLE
    borrowing.book.status = "AVAILABLE";
    await borrowing.book.save();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};
