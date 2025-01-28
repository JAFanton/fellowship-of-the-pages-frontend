import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./pages/homepage/Homepage";
import AboutUs from "./pages/about/About";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";
import NotFound from "./pages/notFound/notFound";
import Signup from "./components/signup/signup";
import BookDetailsPage from "./pages/bookDetails/BookDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
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
