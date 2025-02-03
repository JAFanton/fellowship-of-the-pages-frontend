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
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "Fiction",
    wordCount: 0,
    review: "",
    bookImageUrl: "",
  });
  const [showEditModal, setShowEditModal] = useState(false); // State for showing modal

  const loggedInUserId = localStorage.getItem("userId") || "";

  useEffect(() => {
    axiosInstance
      .get(`/api/books/${bookId}`)
      .then((response) => {
        setBook(response.data);
        setFormData({
          title: response.data.title,
          author: response.data.author,
          genre: response.data.genre,
          wordCount: response.data.wordCount,
          review: response.data.review,
          bookImageUrl: response.data.bookImageUrl,
        });
      })
      .catch((err) => {
        console.error("Error fetching book details:", err);
        setError("Failed to load book details");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [bookId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axiosInstance
      .put(`/api/books/${bookId}`, formData)
      .then((response) => {
        console.log("Update response:", response);
        alert("Book updated successfully");
        setBook(response.data); 
        setShowEditModal(false);
      })
      .catch((err) => {
        console.error("Error updating book:", err.response ? err.response.data : err.message);
        alert(`Failed to update book: ${err.response?.data?.message || err.message}`);
      });
  };
  

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      axiosInstance
        .delete(`/api/books/${bookId}`)
        .then((response) => {
          console.log("Delete response:", response);
          alert("Book deleted successfully");
          navigate("/");
        })
        .catch((err) => {
          console.error("Error deleting book:", err.response ? err.response.data : err.message);
          alert(`Failed to delete book: ${err.response?.data?.message || err.message}`);
        });
    }
  };
  
  

  const isOwner = book?.userId && book.userId === loggedInUserId;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className="book-details-page">
      <div className="book-content">
        <div className="book-image">
          <img src={book.bookImageUrl || "default-book.jpg"} alt={book.title} />
        </div>
        <div className="book-text">
          <h2>{book.title}</h2>
          <h3>
            <strong>Author:</strong> {book.author}
          </h3>
          <h3>
            <strong>Genre:</strong> {book.genre}
          </h3>
          <h3>
            <strong>Word Count:</strong> {book.wordCount}
          </h3>
          <h3>
            <strong>Review:</strong> {book.review}
          </h3>
        </div>
      </div>

      {showEditModal && (
        <div className="edit-modal-overlay">
          <div className="edit-modal">
            <button
              className="close-modal-button"
              onClick={() => setShowEditModal(false)}
            >
              &times;
            </button>
            <h2>Edit Book Details</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="author">Author:</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  required
                  />
              </div>
              <div>
                <label htmlFor="genre">Genre:</label>
                <select
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                  required
                  >
                  <option value="Fiction">Fiction</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                </select>
              </div>
              <div>
                <label htmlFor="wordCount">Word Count:</label>
                <input
                  type="number"
                  name="wordCount"
                  value={formData.wordCount}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="bookImageUrl">Book Image URL:</label>
                <input
                  type="url"
                  name="bookImageUrl"
                  value={formData.bookImageUrl}
                  onChange={handleInputChange}
                  required
                  />
              </div>
              <div>
                <label htmlFor="review">Review:</label>
                <textarea
                  name="review"
                  value={formData.review}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="submit-button">
                Update Book
              </button>
            </form>
          </div>
        </div>
      )}
      <button id="back-button" onClick={() => navigate("/")}>
        ← Back to Homepage
      </button>
      {isOwner && (
        <div className="action-buttons">
          <button
            onClick={() => setShowEditModal(true)}
            className="edit-button"
          >
            Edit
          </button>
          <button onClick={handleDelete} className="delete-button">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BookDetailsPage;
