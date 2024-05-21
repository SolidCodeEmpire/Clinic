import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import AdminButtons from "../AdminButtons/AdminButtons";
import AddUsers from "../AddUsers/AddUsers";
import ListUsers from "../ListUsers/ListUsers";

import "./Admin.css";
export default function Admin() {
  return (
    <BrowserRouter>
      <div className="admin-header">
        <h1>Admin page</h1>
      </div>
      <Routes>
        <Route path="/" element={<AdminButtons/>}/>
        <Route path="*" element={<AdminButtons/>}/>
        <Route path="/admin-add" element={<AddUsers/>}/>
        <Route path="/admin-list" element={<ListUsers/>}/>
      </Routes>
    </BrowserRouter>
  );
}
