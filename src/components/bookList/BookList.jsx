import React from "react";
import "./BookList.css";

const BookList = ({ books }) => {
  return (
    <div className="book-list">
      <h2>Books Read</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id} className="book-item">
            <img src={book.bookImageUrl} alt={book.title} className="book-image" />
            <div className="book-details">
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Summary:</strong> {book.summary}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;