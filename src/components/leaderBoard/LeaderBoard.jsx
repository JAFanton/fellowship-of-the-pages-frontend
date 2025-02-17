import React, { useEffect, useState } from "react";
import axios from "axios";

import axiosInstance from "../../api/axios";
import "./leaderBoard.css";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      axiosInstance
        .get("/auth/users")
        .then((response) => {
          setUsers(Array.isArray(response.data) ? response.data : []);
        })
        .catch((err) => {
          console.error("Error fetching users:", err);
          setError("No participants yet");
        });
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
              <th>Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {users
              .sort((a, b) => b.points - a.points)
              .map((user, index) => (
                <tr key={user._id}>
                  <td>{user.name || "Unknown"}</td>
                  <td>{user.points !== undefined ? user.points : "0"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
