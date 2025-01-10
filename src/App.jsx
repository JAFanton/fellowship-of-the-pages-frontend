import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Homepage from './pages/homepage/Homepage';
import BookList from './components/BookList';
import Profile from './components/Profile';
import About from './pages/about/About';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/books">Book List</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/about">Rules</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
