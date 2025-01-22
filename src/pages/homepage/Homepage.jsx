import { useEffect, useState } from "react";
import axios from "axios";
import "./homepage.css";

// Components
import CountdownTimer from "../../components/countdownTimer/CountdownTimer";
import Leaderboard from "../../components/leaderBoard/LeaderBoard";

function Homepage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch users and their books from the backend
    axios
      .get("/api/auth/users")
      .then((response) => {
        const fetchedUsers = Array.isArray(response.data) ? response.data : [];
        setUsers(fetchedUsers);
      })
      .catch((error) => console.error("Error fetching users:", error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home">
      <h1 className="title">Fellowship of the Pages</h1>
      <p>Track your reading progress and compete with friends!</p>

      {/* Display the countdown timer at all times */}
      <CountdownTimer />

      {/* Conditional rendering for competitors */}
      {loading ? (
        <p>Loading user data...</p>
      ) : users.length >= 2 ? (
        <div className="competitors">
          <div className="competitor">
            <img
              src={users[0].profileImageUrl || "default-user1.jpg"}
              alt={users[0].name}
              className="competitor-image"
            />
            <h2 className="competitor-name">{users[0].name}</h2>
          </div>

          <h1 className="vs">VS</h1>

          <div className="competitor">
            <img
              src={users[1].profileImageUrl || "default-user2.jpg"}
              alt={users[1].name}
              className="competitor-image"
            />
            <h2 className="competitor-name">{users[1].name}</h2>
          </div>
        </div>
      ) : (
        <p>No users available yet. Invite your friends to join the competition!</p>
      )}

      {/* Display the leaderboard regardless of the users */}
      <Leaderboard users={users} />
    </div>
  );
}

export default Homepage;
