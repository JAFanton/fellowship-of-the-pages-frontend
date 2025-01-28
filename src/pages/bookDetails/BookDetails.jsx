import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import axiosInstance from "../../api/axios"; 
import "./bookDetails.css"; 

const BookDetailsPage = () => {
  const { bookId } = useParams(); 
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loggedInUserId = localStorage.getItem("userId");

  useEffect(() => {
    axiosInstance
      .get(`/api/books/${bookId}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        setError("Failed to load book details");
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, [bookId]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      axiosInstance
        .delete(`/api/books/${bookId}`)
        .then(() => {
          alert("Book deleted successfully");
          navigate("/"); 
        })
        .catch((error) => {
          console.error("Failed to delete book:", error);
          alert("Failed to delete book. Please try again.");
        });
    }
  };

  const handleEdit = () => {
    navigate(`/edit-book/${bookId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return <p>Book not found.</p>;

  const isOwner = book.userId === loggedInUserId;

  return (
    <div className="book-details-page">
      <button id="back-button" onClick={() => navigate("/")}>← Back to Homepage</button>
      <div className="book-content">
        <div className="book-image">
          <img
            src={book.bookImageUrl || "default-book.jpg"}
            alt={book.title}
          />
        </div>
        <div className="book-text">
          <h2>{book.title}</h2>
          <h3><strong>Author:</strong> {book.author}</h3>
          <h3><strong>Genre:</strong> {book.genre}</h3>
          <h3><strong>Word Count:</strong> {book.wordCount}</h3>
          <h3><strong></strong> {book.review}</h3>
        </div>
      </div>
{/* This logic needs more work.

      {isOwner && (
        <div className="action-buttons">
          <button onClick={handleEdit} className="edit-button">Edit</button>
          <button onClick={handleDelete} className="delete-button">Delete</button>
        </div>
      )}
*/}
    </div>
  );
};

export default BookDetailsPage;
