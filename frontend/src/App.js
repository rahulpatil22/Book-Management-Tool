import { Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookList from './components/BooksList';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import ViewBook from "./components/ViewBook"; 

function App() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-4">
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/edit/:id" element={<EditBook />} />
          <Route path="/view/:id" element={<ViewBook />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

