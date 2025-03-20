const db = require("../config/db");

const Book = {
  getAllBooks: (callback) => {
    db.query("SELECT * FROM books", (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  getBookById: (id, callback) => {
    db.query("SELECT * FROM books WHERE id = ?", [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results[0]);
    });
  },

  addBook: (book, callback) => {
    const { title, author, type, genre, publication, pages, price, cover } =
      book;
    db.query(
      "INSERT INTO books (title, author, type, genre, publication, pages, price, cover) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [title, author, type, genre, publication, pages, price, cover],
      (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
      }
    );
  },

  updateBook: (id, book, callback) => {
    const { title, author, type, genre, publication, pages, price, cover } =
      book;

    let fields = [];
    let values = [];

    if (title) {
      fields.push("title=?");
      values.push(title);
    }
    if (author) {
      fields.push("author=?");
      values.push(author);
    }
    if (type) {
      fields.push("type=?");
      values.push(type);
    }
    if (genre) {
      fields.push("genre=?");
      values.push(genre);
    }
    if (publication) {
      fields.push("publication=?");
      values.push(publication);
    }
    if (pages) {
      fields.push("pages=?");
      values.push(pages);
    }
    if (price) {
      fields.push("price=?");
      values.push(price);
    }
    if (cover !== undefined && cover !== "") {
      fields.push("cover=?");
      values.push(cover);
    }

    if (fields.length === 0) {
      return callback(new Error("No fields to update"), null);
    }

    values.push(id);
    const query = `UPDATE books SET ${fields.join(", ")} WHERE id=?`;

    db.query(query, values, (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },

  deleteBook: (id, callback) => {
    db.query("DELETE FROM books WHERE id = ?", [id], (err, results) => {
      if (err) return callback(err, null);
      callback(null, results);
    });
  },
};

module.exports = Book;
