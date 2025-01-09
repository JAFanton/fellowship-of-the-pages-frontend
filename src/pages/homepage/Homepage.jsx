import { useEffect, useState } from 'react';
import axios from 'axios';
import './homepage.css';

function Homepage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users and their books from the backend
    axios
      .get('/api/users') // Adjust the endpoint to match your backend
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="home">
      <h1>Fellowship of the Pages</h1>
      <p>Track your reading progress and compete with friends!</p>

      {users.length > 0 ? (
        users.map((user) => (
          <div key={user._id} className="user-carousel">
            <h2>{user.name}'s Books</h2>
            <div className="carousel">
              {user.books.map((book) => (
                <div key={book._id} className="carousel-item">
                  <img src={book.bookImageUrl} alt={book.title} />
                  <p>{book.title}</p>
                  <p>{book.author}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default Homepage;