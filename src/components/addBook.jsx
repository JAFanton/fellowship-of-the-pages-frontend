import React, { useState } from 'react';
import axios from 'axios';

import axiosInstance from '../api/axios';

const AddBookForm = ({ token }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    bookImageUrl: '',
    genre: 'Fiction',
    review: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
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
        });
      })
      .catch((error) => {
        const errorText =
          error.response?.data?.error || "Failed to add the book. Please try again.";
        setErrorMessage(errorText);
        setSuccessMessage("");
      });
  };

  return (
    <div>
      <h2>Add a New Book</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Book Image URL:</label>
          <input
            type="url"
            name="bookImageUrl"
            value={formData.bookImageUrl}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Genre:</label>
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
          <label>Review:</label>
          <textarea
            name="review"
            value={formData.review}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookForm;