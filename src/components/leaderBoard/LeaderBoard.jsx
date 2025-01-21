import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/auth/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Check if response data is valid and set users or keep empty array
        setUsers(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load leaderboard. Please try again later.");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      {error ? (
        <p className="error">{error}</p>
      ) : users.length === 0 ? (
        <p>No users available yet. Be the first to sign up and participate!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Email</th>
              <th>Joined At</th>
            </tr>
          </thead>
          <tbody>
            {users
              .sort((a, b) => a.name.localeCompare(b.name)) // Example: sort alphabetically by name
              .map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name || "Unknown"}</td>
                  <td>{user.email || "N/A"}</td>
                  <td>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString()
                      : "Unknown"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
