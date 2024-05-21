import React from "react";
import { Link } from "react-router-dom";

export default function AdminButtons() {
  return (
    <div>
      <Link to={"/admin-add"}>
        <button className="primary-button">Add New User</button>
      </Link>
      <Link to={"/admin-list"}>
        <button className="primary-button">List users</button>
      </Link>
    </div>
  );
}
