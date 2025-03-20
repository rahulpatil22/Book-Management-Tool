import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../services/bookService";

const BookForm = () => {
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
    cover: null,
  });

  useEffect(() => {
    if (id) {
      fetchBookDetails(id);
    }
  }, [id]);

  const fetchBookDetails = async (bookId) => {
    try {
      const response = await axios.get(`${API_URL}/${bookId}`);
      setBook(response.data);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setBook((prev) => ({
      ...prev,
      cover: e.target.files[0] || null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(book).forEach((key) => {
        formData.append(key, book[key]);
      });

      if (id) {
        await axios.put(`${API_URL}/${id}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }

      navigate("/");
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow-md rounded-lg">
      <div>
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={book.title}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />
      </div>
      <div>
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />
      </div>
      <div>
        <input
          type="text"
          name="type"
          placeholder="Type of Book"
          value={book.type}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />
      </div>
      <div>
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={book.genre}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />
      </div>
      <div>
        <input
          type="text"
          name="publication"
          placeholder="Publication"
          value={book.publication}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />
      </div>
      <div>
        <input
          type="number"
          name="pages"
          placeholder="No. of Pages"
          value={book.pages}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />
      </div>
      <div>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={book.price}
          onChange={handleChange}
          className="border w-full p-2 rounded"
        />
      </div>
      <div>
        <input type="file" name="cover" onChange={handleFileChange} className="border w-full p-2 rounded" />
      </div>
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
        {id ? "Update" : "Save"}
      </button>
      <button type="button" onClick={() => navigate("/")} className="bg-gray-500 text-white py-2 px-4 rounded ml-2">
        Cancel
      </button>
    </form>
  );
};

export default BookForm;
