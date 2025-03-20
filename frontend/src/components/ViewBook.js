import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL, IMAGE_UPLOAD } from "../services/bookService";

function ViewBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Book not found (Status: ${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        if (!data || Object.keys(data).length === 0) {
          throw new Error("Book data is empty");
        }
        setBook(data);
      })
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p className="text-center text-danger fw-bold">{error}</p>;
  if (!book) return <p className="text-center">Loading...</p>;

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg" style={{ width: "28rem" }}>
        <div className="card-header text-center fw-bold fs-4">
          📖 {book.title}
        </div>

        {book.cover && (
          <img
            src={`${IMAGE_UPLOAD}${book.cover}`}
            alt="Book Cover"
            className="card-img-top mx-auto mt-3"
            style={{
              maxHeight: "200px",
              width: "auto",
              display: "block",
              objectFit: "contain",
            }}
          />
        )}

        <div className="card-body">
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Type:</strong> {book.type}
          </p>
          <p>
            <strong>Genre:</strong> {book.genre}
          </p>
          <p>
            <strong>Publication:</strong> {book.publication}
          </p>
          <p>
            <strong>Pages:</strong> {book.pages}
          </p>
          <p>
            <strong>Price:</strong> ₹{book.price}
          </p>
        </div>

        <div className="card-footer text-center">
          <button
            className="btn btn-danger w-100"
            onClick={() => navigate("/")}
          >
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewBook;
