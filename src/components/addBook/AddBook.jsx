import React, { useState } from "react";
import axiosInstance from "../../api/axios";
import "./addBook.css";

const AddBookForm = ({ onBookAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    bookImageUrl: "",
    genre: "Fiction",
    review: "",
    wordCount: 0,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .post("/api/books", formData)
      .then((response) => {
        setSuccessMessage("Book added successfully!");
        setErrorMessage("");
        setFormData({
          title: "",
          author: "",
          bookImageUrl: "",
          genre: "Fiction",
          review: "",
          wordCount: 0,
        });

        if (onBookAdded) {
          onBookAdded(response.data);
        }

        setShowModal(false);
      })
      .catch((error) => {
        const errorText =
          error.response?.data?.error ||
          "Failed to add the book. Please try again.";
        setErrorMessage(errorText);
        setSuccessMessage("");
      });
  };

  const handleClose = () => {
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="add-book-modal-overlay">
      <div className="add-book-modal">
        <button className="add-book-close-button" onClick={handleClose}>
          &times;
        </button>
        <h2>Add a New Book</h2>
        {errorMessage && <p className="add-book-error">{errorMessage}</p>}
        {successMessage && <p className="add-book-success">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="add-book-form">
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
            <label htmlFor="review">Review:</label>
            <textarea
              name="review"
              value={formData.review}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="add-book-submit-button">
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;
