import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminButtons from "../AdminButtons/AdminButtons";
import AddUsers from "../AddUsers/AddUsers";
import ListUsers from "../ListUsers/ListUsers";
import ToggleTheme from "../../../Common/ToggleTheme/ToggleTheme";
import { User } from "../../../../API/Model/UserModel";

import "./Admin.css";


type MainAppProps = {
  userDispatcher: React.Dispatch<React.SetStateAction<User | undefined>>;
};

export default function Admin(props: MainAppProps) {
  return (
    <BrowserRouter>
      <div className="admin-header">
        <div className="admin-toggle-theme-container">
          <ToggleTheme></ToggleTheme>
        </div>
        <h1>Admin page</h1>
        <button onClick={() => props.userDispatcher(undefined)}>
            logout
          </button>
      </div>
      <div className="admin-content">
        <Routes>
          <Route path="/" element={<AdminButtons/>}/>
          <Route path="*" element={<AdminButtons/>}/>
          <Route path="/admin-add" element={<AddUsers/>}/>
          <Route path="/admin-list" element={<ListUsers/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
