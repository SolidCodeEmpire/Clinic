import React from "react";
import { Link } from "react-router-dom";

import './AddUsers.css'

export default function AddUsers() {
  return (
    <div className="admin-add-users-container">
      <Link to="/">
        <button className="primary-button admin-back-button">Back</button>
      </Link>
      <h1>Add user</h1>
    </div>
  );
}
