const Book = require("../models/bookModel");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage }).single("cover");

exports.getBooks = (req, res) => {
  Book.getAllBooks((err, results) => {
    if (err) res.status(500).json(err);
    else res.json(results);
  });
};

exports.getBook = (req, res) => {
  console.log("getBook");

  Book.getBookById(req.params.id, (err, result) => {
    console.log("getBook", req.params.id);
    console.log("getBook result", result);
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
      console.log("getBook result[0]", result);
    }
  });
};

exports.createBook = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json(err);
    const bookData = { ...req.body, cover: req.file?.filename || "" };
    Book.addBook(bookData, (err, result) => {
      if (err) res.status(500).json(err);
      else
        res.json({
          message: "Book added successfully",
          bookId: result.insertId,
        });
    });
  });
};

exports.updateBook = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json(err);
    const bookData = {
      ...req.body,
      cover: req.file?.filename || req.body.cover,
    };
    Book.updateBook(req.params.id, bookData, (err, result) => {
      if (err) res.status(500).json(err);
      else res.json({ message: "Book updated successfully" });
    });
  });
};

exports.deleteBook = (req, res) => {
  const { id } = req.params;

  Book.deleteBook(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error deleting book" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  });
};
