import React, { useState, useEffect } from "react";
import axios from "axios";

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    bookImageUrl: "",
    genre: "",
    review: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("authToken"); 

  // Fetch user-specific books
  const fetchUserBooks = async () => {
    try {
      const response = await axios.get("/api/books/user/:userId", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching user books:", error);
    }
  };

  useEffect(() => {
    fetchUserBooks();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate review input for at least two sentences
  const validateReview = (review) => {
    const sentenceCount = review.split(/[.!?]/).filter((sentence) => sentence.trim().length > 0).length;
    return sentenceCount >= 2;
  };

  // Handle form submission to add a new book
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message

    if (!validateReview(formData.review)) {
      setErrorMessage("The review must contain at least 2 sentences.");
      return;
    }

    try {
      const response = await axios.post("/api/books", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks((prevBooks) => [...prevBooks, response.data]); // Add the new book to the carousel
      setFormData({ title: "", author: "", bookImageUrl: "", genre: "", review: "" }); // Reset form
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="user-dashboard">
      <h1>Your Book Carousel</h1>
      <div className="book-carousel">
        {books.map((book) => (
          <div key={book._id} className="book-item">
            <img src={book.bookImageUrl} alt={book.title} />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
          </div>
        ))}
      </div>

      <h2>Add a New Book</h2>
      {errorMessage && <p className="error-message" style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleFormSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Book Image URL:
          <input
            type="url"
            name="bookImageUrl"
            value={formData.bookImageUrl}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Genre:
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Review:
          <textarea
            name="review"
            value={formData.review}
            onChange={handleInputChange}
            required
          ></textarea>
        </label>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default UserDashboard;
