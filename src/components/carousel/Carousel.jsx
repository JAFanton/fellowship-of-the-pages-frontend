import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./carousel.css";

const Carousel = ({ books }) => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (carouselRef.current) {
        setCanScrollLeft(carouselRef.current.scrollLeft > 0);
        setCanScrollRight(
          carouselRef.current.scrollLeft < 
          carouselRef.current.scrollWidth - carouselRef.current.clientWidth
        );
      }
    };

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", checkScroll);
      checkScroll();
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener("scroll", checkScroll);
      }
    };
  }, []);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.6;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return books && books.length > 0 ? (
    <div className="carousel-container">
      <button
        className={`carousel-arrow left ${!canScrollLeft ? "hidden" : ""}`}
        onClick={() => scroll("left")}
      >
        &#9665;
      </button>

      <div className="carousel" ref={carouselRef}>
        <div className="carousel__list">
          {books.map((book) => (
            <div key={book._id} className="carousel__item">
              <Link
                to={`/book-details/${book._id}`}
                className="carousel-item-link"
              >
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

      <button
        className={`carousel-arrow right ${!canScrollRight ? "hidden" : ""}`}
        onClick={() => scroll("right")}
      >
        &#9655;
      </button>
    </div>
  ) : (
    <p>No books added yet.</p>
  );
};

export default Carousel;
