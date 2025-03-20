import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../services/bookService";

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [type, setType] = useState("");
  const [genre, setGenre] = useState("");
  const [publication, setPublication] = useState("");
  const [pages, setPages] = useState("");
  const [price, setPrice] = useState("");
  const [cover, setCover] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {};
    if (!title.trim()) errors.title = "Title is required";
    if (!author.trim()) errors.author = "Author is required";
    if (!type.trim()) errors.type = "Type is required";
    if (!genre.trim()) errors.genre = "Genre is required";
    if (!publication.trim()) errors.publication = "Publication is required";
    if (!pages || pages <= 0) errors.pages = "Pages must be a positive number";
    if (!price || price <= 0) errors.price = "Price must be a positive number";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCoverUpload = (e) => {
    setCover(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("type", type);
    formData.append("genre", genre);
    formData.append("publication", publication);
    formData.append("pages", pages);
    formData.append("price", price);
    if (cover) {
      formData.append("cover", cover);
    }

    await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    navigate("/");
  };

  return (
    <div className="container mt-3">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">📖 Add Book</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <div className="text-danger">{errors.title}</div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Author</label>
              <input
                className="form-control"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              {errors.author && (
                <div className="text-danger">{errors.author}</div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Type of Book</label>
              <input
                className="form-control"
                placeholder="Type of Book"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
              {errors.type && <div className="text-danger">{errors.type}</div>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Genre</label>
              <input
                className="form-control"
                placeholder="Genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
              {errors.genre && (
                <div className="text-danger">{errors.genre}</div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Publication</label>
              <input
                className="form-control"
                placeholder="Publication"
                value={publication}
                onChange={(e) => setPublication(e.target.value)}
              />
              {errors.publication && (
                <div className="text-danger">{errors.publication}</div>
              )}
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">No. of Pages</label>
              <input
                className="form-control"
                type="number"
                placeholder="No. of Pages"
                value={pages}
                onChange={(e) => setPages(e.target.value)}
              />
              {errors.pages && (
                <div className="text-danger">{errors.pages}</div>
              )}
            </div>
            <div className="col-md-3 mb-3">
              <label className="form-label">Price</label>
              <input
                className="form-control"
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              {errors.price && (
                <div className="text-danger">{errors.price}</div>
              )}
            </div>
            <div className="col-md-12 mb-3">
              <label className="form-label">Cover Image</label>
              <input
                className="form-control"
                type="file"
                onChange={handleCoverUpload}
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
