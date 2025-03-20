import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL, IMAGE_UPLOAD } from "../services/bookService";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    author: "",
    type: "",
    genre: "",
    publication: "",
    pages: "",
    price: "",
    cover: "",
  });
  const [coverFile, setCoverFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Book not found (Status: ${response.status})`);
        }
        return response.json();
      })
      .then((data) => setBook(data))
      .catch((err) => setError(err.message));
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setCoverFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("author", book.author);
    formData.append("type", book.type);
    formData.append("genre", book.genre);
    formData.append("publication", book.publication);
    formData.append("pages", book.pages);
    formData.append("price", book.price);
    if (coverFile) {
      formData.append("cover", coverFile);
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update book");
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <p className="text-center text-danger fw-bold">{error}</p>;

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3 sticky-top bg-white py-2 shadow-sm">
        <h2 className="m-0">✏️ Edit Book</h2>
      </div>

      <div className="card shadow-lg p-4">
        {book.cover && (
          <div className="d-flex justify-content-center mb-3">
            <img
              src={`${IMAGE_UPLOAD}${book.cover}`}
              alt="Book Cover"
              className="rounded shadow-sm"
              style={{
                maxHeight: "150px",
                width: "auto",
                objectFit: "contain",
              }}
            />
          </div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                name="title"
                value={book.title}
                onChange={handleChange}
                placeholder="Title"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Author</label>
              <input
                className="form-control"
                name="author"
                value={book.author}
                onChange={handleChange}
                placeholder="Author"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Type of Book</label>
              <input
                className="form-control"
                name="type"
                value={book.type}
                onChange={handleChange}
                placeholder="Type of Book"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Genre</label>
              <input
                className="form-control"
                name="genre"
                value={book.genre}
                onChange={handleChange}
                placeholder="Genre"
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Publication</label>
              <input
                className="form-control"
                name="publication"
                value={book.publication}
                onChange={handleChange}
                placeholder="Publication"
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">No. of Pages</label>
              <input
                className="form-control"
                name="pages"
                value={book.pages}
                onChange={handleChange}
                type="number"
                placeholder="No. of Pages"
              />
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Price</label>
              <input
                className="form-control"
                name="price"
                value={book.price}
                onChange={handleChange}
                type="number"
                placeholder="Price"
              />
            </div>
            <div className="col-md-12 mb-3">
              <label className="form-label">Cover Image</label>
              <input
                type="file"
                className="form-control"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
          </div>

          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-danger btn-sm px-3"
              onClick={() => navigate("/")}
            >
              Back to List
            </button>
            <button className="btn btn-success btn-sm px-3" type="submit">
              Update Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditBook;
