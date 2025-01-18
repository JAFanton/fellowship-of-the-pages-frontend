import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/homepage/Homepage";
import AboutUs from "./pages/about/About";
import Login from "./components/login/Login";
import Navbar from "./components/navBar/navBar";
import NotFound from "./pages/notFound/notFound";
import Signup from "./components/signup/signup";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} /> {/* Login route */}
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
