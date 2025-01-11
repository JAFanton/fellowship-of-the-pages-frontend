import { useEffect, useState } from "react";
import axios from "axios";
import "./homepage.css";

function Homepage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users and their books from the backend
    axios
      .get("/api/auth/users") //Endpoint to connect to backend
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  if (users.length < 2) {
    return <p>Loading user data or insufficient users...</p>;
  }

  const [user1, user2] = users;

  return (
    <div className="home">
      <h1 className="title">Fellowship of the Pages</h1>
      <p>Track your reading progress and compete with friends!</p>

      <div className="competitors">
        <div className="competitor">
          <img
            src={user1.profileImageUrl || "default-user1.jpg"}
            alt={user1.name}
            className="competitor-image"
          />
          <h2 className="competitor-name">Justin Fanton</h2>
          <div className="carousel">
            {user1.books.map((book) => (
              <div key={book._id} className="carousel-item">
                <img src={book.bookImageUrl} alt={book.title} />
                <p>{book.title}</p>
                <p>{book.author}</p>
              </div>
            ))}
          </div>
        </div>

        <h1 className="vs">VS</h1>

        <div className="competitor">
          <img
            src={user2.profileImageUrl || "default-user2.jpg"}
            alt={user2.name}
            className="competitor-image"
          />
          <h2 className="competitor-name">Dominic Meddick</h2>
          <div className="carousel">
            {user2.books.map((book) => (
              <div key={book._id} className="carousel-item">
                <img src={book.bookImageUrl} alt={book.title} />
                <p>{book.title}</p>
                <p>{book.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
