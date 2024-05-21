import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import AdminButtons from "../AdminButtons/AdminButtons";

import "./Admin.css";
export default function Admin() {
  return (
    <BrowserRouter>
      <h1>Admin page</h1>
      <Routes>
        <Route path="/" element={<AdminButtons/>}/>
        <Route path="*" element={<AdminButtons/>}/>
        <Route path="/admin-add" element={<h1>admin add</h1>}/>
        <Route path="/admin-list" element={<h1>admin list</h1>}/>
      </Routes>
    </BrowserRouter>
  );
}
