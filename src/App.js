import { useState } from "react";
import { AddBook } from "./components/AddBook";
import { BookDetail } from "./components/BookDetail";
import { Books } from "./components/Books";

export const App = () => {
  const [bookId, setBookId] = useState("");

  const handleOnClickBook = (id) => {
    setBookId(id);
  };

  return (
    <div>
      <b>Add Book:</b>
      <AddBook />
      <b>Book list:</b>
      <Books
        onClickBook={handleOnClickBook}
      />
      <b>Detail:</b>
      <BookDetail
        id={bookId}
      />
    </div>
  );
}
