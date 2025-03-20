import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, IMAGE_UPLOAD } from "../services/bookService";

function BookList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setBooks(data));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(() =>
        setBooks(books.filter((book) => book.id !== id))
      );
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold">Book List</h2>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-striped text-center">
          <thead className="table-dark">
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
              <th>Type</th>
              <th>Genre</th>
              <th>Publication</th>
              <th>Pages</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>
                  {book.cover ? (
                    <img src={`${IMAGE_UPLOAD}${book.cover}`} alt={book.title} className="img-thumbnail" style={{ width: "50px", height: "50px" }} />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.type}</td>
                <td>{book.genre}</td>
                <td>{book.publication}</td>
                <td>{book.pages}</td>
                <td>{book.price}</td>
                <td>
                  <div className="btn-group" role="group">
                    <button onClick={() => navigate(`/view/${book.id}`)} className="btn btn-info btn-sm">View</button>
                    <button onClick={() => navigate(`/edit/${book.id}`)} className="btn btn-warning btn-sm">Edit</button>
                    <button onClick={() => handleDelete(book.id)} className="btn btn-danger btn-sm">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookList;
