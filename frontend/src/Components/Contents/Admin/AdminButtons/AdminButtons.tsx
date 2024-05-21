import React from "react";
import { Link } from "react-router-dom";

import './AdminButtons.css'

export default function AdminButtons() {
  return (
    <div className="admin-button-container">
      <Link to={"/admin-add"}>
        <button className="primary-button">Add New User</button>
      </Link>
      <Link to={"/admin-list"}>
        <button className="primary-button">List users</button>
      </Link>
    </div>
  );
}
