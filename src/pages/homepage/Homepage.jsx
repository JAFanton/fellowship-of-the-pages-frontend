import { useEffect, useState, useContext } from "react";
import axiosInstance from "../../api/axios";
import "./homepage.css";

// Components
import CountdownTimer from "../../components/countdownTimer/CountdownTimer";
import Leaderboard from "../../components/leaderBoard/LeaderBoard";
import AddBookForm from "../../components/addBook/AddBook";
import { AuthContext } from "../../context/AuthContext";
import Carousel from "../../components/carousel/Carousel";

function Homepage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booksByUser, setBooksByUser] = useState({});
  const [showAddBookForm, setShowAddBookForm] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    // Fetch users and their books
    axiosInstance
      .get("/auth/users")
      .then((response) => {
        const fetchedUsers = Array.isArray(response.data) ? response.data : [];
        setUsers(fetchedUsers);

        // Fetch books for each user after users are fetched
        fetchedUsers.forEach((user) => {
          axiosInstance
            .get(`/api/books/user/${user._id}`)
            .then((bookResponse) => {
              setBooksByUser((prevBooks) => ({
                ...prevBooks,
                [user._id]: bookResponse.data, // Store books by user ID
              }));
            })
            .catch((error) =>
              console.error("Error fetching books for user:", error)
            );
        });
      })
      .catch((error) => console.error("Error fetching users:", error))
      .finally(() => setLoading(false));
  }, []);

  // Function to update books in real-time when a new book is added
  // Currently experiencing issue where carousel is not updating after a book is added
  const addBook = (newBook, userId) => {
    setBooksByUser((prevBooks) => {
      const updatedBooks = [...(prevBooks[userId] || []), newBook];
      console.log("Updated books for user:", updatedBooks);
      return { ...prevBooks, [userId]: updatedBooks };
    });
  };

  const toggleAddBookForm = () => {
    setShowAddBookForm((prevState) => !prevState);
  };

  return (
    <div className="home">
      <h1>Welcome to the Fellowship of the Pages!</h1>
      <p className="intro-text">
        I built this website as a way to gain more experience in web
        development. It serves as a way for my friend and I to track our reading
        competition to see who can read the most books over the year. The rules
        for the competition can be found in the navbar above. Right now, only
        the two of us can log in and add books, but if you're curious about how
        the site works, feel free to check out the repositories listed below, or
        to clone the repositories and stage your own reading competition with
        your friend!
        <br />
        <br />
        <a
          href="https://github.com/JAFanton/fellowship-of-the-pages-frontend/tree/main"
          target="_blank"
          rel="noopener noreferrer"
        >
          Frontend Repository
        </a>{" "}
        |
        <a
          className="backend-link"
          href="https://github.com/JAFanton/fellowship-of-the-pages-backend/tree/main"
          target="_blank"
          rel="noopener noreferrer"
        >
          Backend Repository
        </a>
      </p>

      <h2 className="title">Let the reading begin!</h2>

      <CountdownTimer />

      {/* Display the leaderboard regardless of the users */}
      <div className="leaderBoard">
        <Leaderboard users={users} />
      </div>

      {/* Conditional rendering for competitors */}
      {loading ? (
        <p>Loading user data...</p>
      ) : users.length >= 2 ? (
        <div className="competitors">
          {users.map((user) => {
            const userBooks = booksByUser[user._id] || [];
            return (
              <div key={user._id} className="competitor">
                <h2 className="competitor-name">{user.name}</h2>
                <div className="competitor-carousel">
                  <img
                    src={user.profileImageUrl || "default-user.jpg"}
                    alt={user.name}
                    className="competitor-image"
                  />
                  {/* Use the Carousel component to display the books for the user */}
                  <Carousel books={userBooks} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>
          No users available yet. Invite your friends to join the competition!
        </p>
      )}

      {/* Add Book Button (only visible if logged in) */}
      {isLoggedIn && (
        <button className="add-book-button" onClick={toggleAddBookForm}>
          Add a Book
        </button>
      )}

      {/* Show Add Book Form and pass addBook function */}
      {showAddBookForm && <AddBookForm onBookAdded={addBook} />}
    </div>
  );
}

export default Homepage;
