import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./carousel.css";

const Carousel = ({ books }) => {
  const carouselRef = useRef(null);

  const handleMouseMove = (e) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const carouselWidth = carousel.offsetWidth;
    const mouseX = e.clientX;
    const scrollPosition = (mouseX / carouselWidth) * carousel.scrollWidth;

    carousel.scrollLeft = scrollPosition;
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  return books && books.length > 0 ? (
    <div className="carousel-container">
      <div className="carousel" ref={carouselRef}>
        <div className="carousel__list">
          {books.map((book, index) => (
            <div key={index} className="carousel__item">
              <Link to={`/book-details/${book._id}`} className="carousel-item-link">
                <img
                  src={book.bookImageUrl || "default-book.jpg"}
                  alt={book.title}
                  className="carousel-image"
                />
                <span className="carousel-item-title">{book.title}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <p>No books added yet.</p>
  );
};

export default Carousel;
