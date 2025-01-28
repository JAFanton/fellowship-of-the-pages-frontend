import React from "react";
import "./carousel.css";

const Carousel = ({ books }) => {
  return books && books.length > 0 ? (
    <div className="carousel">
      <div className="carousel__list">
        {books.map((book, index) => (
          <div key={index} className="carousel__item">
            <a href="#" className="carousel-item-link">
              <img
                src={book.bookImageUrl || "default-book.jpg"}
                alt={book.title}
                className="carousel-image"
              />
              <span className="carousel-item-title">{book.title}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <p>No books added yet.</p>
  );
};

export default Carousel;
