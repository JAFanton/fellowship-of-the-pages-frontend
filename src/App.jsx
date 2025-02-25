import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axiosInstance from "./api/axios";

// Components
import Homepage from "./pages/homepage/Homepage";
import AboutUs from "./pages/about/About";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import NotFound from "./pages/notFound/notFound";
import Signup from "./components/signup/signup";
import BookDetailsPage from "./pages/bookDetails/BookDetails";

//CSS and extras
import MiddleEarthMap from "./assets/Images/middle_earth_map.jpg";

function App() {
  const [users, setUsers] = useState([]);
  const [booksByUser, setBooksByUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch users
    axiosInstance
      .get("/auth/users")
      .then((response) => {
        const fetchedUsers = Array.isArray(response.data) ? response.data : [];
        setUsers(fetchedUsers);

        // Fetch books for each user
        const booksData = {};
        const bookPromises = fetchedUsers.map((user) =>
          axiosInstance
            .get(`/api/books/user/${user._id}`)
            .then((bookResponse) => {
              booksData[user._id] = bookResponse.data || [];
            })
        );

        // Wait for all book requests to complete before updating state
        Promise.all(bookPromises)
          .then(() => setBooksByUser(booksData))
          .finally(() => setLoading(false));
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const addBook = (newBook) => {
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    setBooksByUser((prevBooks) => {
      const userBooks = prevBooks[userId] || [];
      const updatedBooks = [...userBooks, newBook];

      return { ...prevBooks, [userId]: updatedBooks };
    });
  };

  return (
    <Router>
      <div
        className="App"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${MiddleEarthMap})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Homepage
                users={users}
                booksByUser={booksByUser}
                addBook={addBook}
                loading={loading}
              />
            }
          />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/book-details/:bookId" element={<BookDetailsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
