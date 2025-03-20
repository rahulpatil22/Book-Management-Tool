import axios from "axios";
export const BASE_URL = "http://localhost:5000/"
export const API_URL = `${BASE_URL}books`;
export const IMAGE_UPLOAD = `${BASE_URL}uploads/`;

export const getBooks = () => axios.get(API_URL);
export const addBook = (bookData) => axios.post(API_URL, bookData);
export const updateBook = (id, bookData) => axios.put(`${API_URL}/${id}`, bookData);
export const deleteBook = (id) => axios.delete(`${API_URL}/${id}`);
