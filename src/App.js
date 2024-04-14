import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Books from "./components/books";
import AddBook from "./components/addBook";
import EditBook from "./components/editBook";

export default function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Books />} />
        <Route path="/create-book" element={<AddBook />} />
        <Route path="/update/:id" element={<EditBook />} />
      </Routes>
    </BrowserRouter>

  );
}
