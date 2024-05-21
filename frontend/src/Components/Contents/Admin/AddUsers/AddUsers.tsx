import React from "react";
import { Link } from "react-router-dom";

export default function AddUsers() {
  return (
    <div>
      <Link to="/">
        <button className="primary-button">Back</button>
      </Link>
      <h1>Add user</h1>
    </div>
  );
}
