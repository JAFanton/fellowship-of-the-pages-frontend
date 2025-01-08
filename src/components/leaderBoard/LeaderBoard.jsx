import React from "react";
import "./Leaderboard.css";

const Leaderboard = ({ users }) => {
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Total Points</th>
            <th>Books Completed</th>
            <th>Fiction vs Non-Fiction</th>
          </tr>
        </thead>
        <tbody>
          {users
            .sort((a, b) => b.points - a.points)
            .map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.points}</td>
                <td>{user.booksCompleted}</td>
                <td>
                  {user.fictionCount} Fiction / {user.nonFictionCount} Non-Fiction
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
