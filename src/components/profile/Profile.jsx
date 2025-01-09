import React from "react";
import "./Profile.css";

const Profile = ({ user }) => {
  return (
    <div className="profile">
      <h2>{user.name}'s Profile</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Total Points:</strong> {user.points}</p>
      <p><strong>Books Completed:</strong> {user.booksCompleted}</p>
      <div className="badge-section">
        <h3>Badges:</h3>
        <ul>
          {user.badges.map((badge, index) => (
            <li key={index}>{badge}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;