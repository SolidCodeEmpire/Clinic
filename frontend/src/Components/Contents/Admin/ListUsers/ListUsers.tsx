import React from "react";
import { Link } from "react-router-dom";

export default function ListUsers() {
  return (
    <div>
      <Link to="/">
        <button className="primary-button">Back</button>
      </Link>
      <h1>list of users</h1>
    </div>
  );
}
