import { useState, useContext } from "react";
import "./homepage.css";

// Components
import CountdownTimer from "../../components/countdownTimer/CountdownTimer";
import Leaderboard from "../../components/leaderBoard/LeaderBoard";
import AddBookForm from "../../components/addBook/AddBook";
import { AuthContext } from "../../context/AuthContext";
import Carousel from "../../components/carousel/Carousel";

function Homepage({ users, booksByUser, addBook, loading }) {
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  const toggleAddBookForm = () => {
    setShowAddBookForm((prevState) => !prevState);
  };

  return (
    <div className="home">
      <h1>Welcome to the Fellowship of the Pages!</h1>
      <p className="intro-text">
        I built this website to gain more experience in web development. It
        allows my friend and me to track our reading competition and see who can
        read the most books over the year. The competition rules can be found in
        the navbar above. Right now, only the two of us can log in and add
        books, but if you're curious about how the site works, feel free to
        check out the repositories below—or clone them and start your own
        reading competition with a friend!
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

      <div className="leaderBoard">
        <Leaderboard users={users} />
      </div>

      {loading ? (
        <p>No participants yet!</p>
      ) : users.length >= 2 ? (
        <div className="competitors">
          {users.map((user) => {
            const userBooks = booksByUser[user._id] || [];

            // Calculate total words read
            const totalWordsRead = userBooks.reduce(
              (total, book) => total + (book.wordCount || 0),
              0
            );

            return (
              <div key={user._id} className="competitor">
                <h2 className="competitor-name">{user.name}</h2>
                <div className="competitor-carousel">
                  <Carousel books={userBooks} key={userBooks.length} />
                </div>
                <p className="words-read">
                  Total Words Read: <strong>{totalWordsRead.toLocaleString()}</strong>
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <p>
          No users available yet. Invite your friends to join the competition!
        </p>
      )}

      {isLoggedIn && (
        <button className="add-book-button" onClick={toggleAddBookForm}>
          Add a Book
        </button>
      )}

      {showAddBookForm && <AddBookForm onBookAdded={addBook} />}
    </div>
  );
}

export default Homepage;
