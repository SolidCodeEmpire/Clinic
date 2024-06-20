import React, { useDebugValue, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./AddUsers.css";
import UserForm from "../UserForm/UserForm";
import {
  ClinicUser,
  createEmptyUser,
} from "../../../../API/Model/ClinicUserModel";
import { addUser, validateUser } from "../Functions/Functions";

export default function AddUsers() {
  const [userToAdd, setUserToAdd] = useState<ClinicUser>();
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    setUserToAdd(createEmptyUser());
  }, [refresh]);

  return (
    <div className="admin-add-users-container">
      <Link to="/">
        <button className="primary-button admin-back-button">Back</button>
      </Link>
      <fieldset className="modify-user admin-fieldset">
        <legend>Add new user</legend>
        <UserForm user={userToAdd} setUser={setUserToAdd}></UserForm>
        <div className="modify-user-button-wrapper">
          <button
            className="primary-button"
            onClick={() => {
              if(userToAdd?.password === ""){
                alert("Error: password is missing.")
                return
              }

              const result = validateUser(userToAdd!)
              
              if(!result.valid){
                  alert(result.errorMessage)
                  return
              }
              
              addUser(userToAdd, refresh, setRefresh);
            }}
          >
            Save
          </button>
        </div>
      </fieldset>
    </div>
  );
}
