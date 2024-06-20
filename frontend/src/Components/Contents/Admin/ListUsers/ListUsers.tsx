import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClinicUser } from "../../../../API/Model/ClinicUserModel";
import { fetchClinicUsers } from "../../../../API/Service/ClinicUserService";

import "./ListUsers.css";
import UserForm from "../UserForm/UserForm";
import { cancelUser, modifyUser } from "../Functions/Functions";

export default function ListUsers() {
  const [userList, setUserList] = useState<Array<ClinicUser>>();
  const [userToModify, setUserToModify] = useState<ClinicUser>();
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    fetchClinicUsers(setUserList);
  }, [refresh]);

  return (
    <div className="users-list-content">
      <fieldset className="clinic-users-table admin-fieldset">
        <legend>List of users</legend>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>User Type</th>
              <th>License Number</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userList &&
              userList
                .sort((a, b) => {
                  return b.id - a.id;
                })
                .map((user) => {
                  return (
                    <>
                      <tr>
                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.username}</td>
                        <td>{user.userType}</td>
                        <td>{user.licenseNumber ?? "not_a_doctor"}</td>
                        <td>
                          <button onClick={() => setUserToModify(user)}>
                            Modify
                          </button>
                          <button
                            onClick={() =>
                              cancelUser(
                                user,
                                setUserToModify,
                                refresh,
                                setRefresh
                              )
                            }
                          >
                            Deactivate
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
          </tbody>
        </table>
      </fieldset>

      <div className="add-modify-wrapper">
        <Link to={"./admin-add"}>
          <button className="primary-button wider-button">Add new user</button>
        </Link>
        <fieldset className="modify-user admin-fieldset">
          <legend>Modify user</legend>
          <UserForm user={userToModify} setUser={setUserToModify}></UserForm>
          <div className="modify-user-button-wrapper">
            <button
              className="primary-button"
              onClick={() => {
                modifyUser(userToModify, setUserToModify, refresh, setRefresh);
              }}
            >
              Save
            </button>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
