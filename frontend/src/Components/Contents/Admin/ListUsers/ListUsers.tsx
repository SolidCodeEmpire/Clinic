import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClinicUser } from "../../../../API/Model/ClinicUserModel";
import { fetchClinicUsers } from "../../../../API/Service/ClinicUserService";

import "./ListUsers.css";

export default function ListUsers() {
  const [userList, setUserList] = useState<Array<ClinicUser>>();
  const [userToModify, setUserToModify] = useState<ClinicUser>();
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    fetchClinicUsers(setUserList);
  }, [refresh]);

  return (
    <div className="users-list-content">
      <Link to="/">
        <button className="primary-button admin-back-button">Back</button>
      </Link>
      <div className="clinic-users-table">
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
              userList.map((user, id) => {
                return (
                  <>
                    <tr>
                      <td>{id}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.clinicUser.email}</td>
                      <td>{user.clinicUser.username}</td>
                      <td>{user.clinicUser.userType}</td>
                      <td>{user.licenseNumber ?? "not_a_doctor"}</td>
                      <td>
                        <button onClick={() => setUserToModify(user)}>
                          Modify
                        </button>
                        <button onClick={() => cancelUser(user)}>Cancel</button>
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>

      <div className="modify-user">
        <h3>Modify user</h3>
        <form action="">
          <div className="user-modification-entry">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="first name"
              disabled={userToModify === undefined}
              value={userToModify ? userToModify.firstName : ""}
              onChange={(event) =>
                userToModify &&
                setUserToModify({
                  ...userToModify,
                  firstName: event.target.value,
                })
              }
            />
          </div>
          <div className="user-modification-entry">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="last name"
              disabled={userToModify === undefined}
              value={userToModify ? userToModify.lastName : ""}
              onChange={(event) =>
                userToModify &&
                setUserToModify({
                  ...userToModify,
                  lastName: event.target.value,
                })
              }
            />
          </div>
          <div className="user-modification-entry">
            <label htmlFor="email">E-mail:</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="e-mail"
              disabled={userToModify === undefined}
              value={userToModify ? userToModify.clinicUser.email : ""}
              onChange={(event) =>
                userToModify &&
                setUserToModify({
                  ...userToModify,
                  clinicUser: {
                    ...userToModify.clinicUser,
                    email: event.target.value,
                  },
                })
              }
            />
          </div>
          <div className="user-modification-entry">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              disabled={userToModify === undefined}
              value={userToModify ? userToModify.clinicUser.username : ""}
              onChange={(event) =>
                userToModify &&
                setUserToModify({
                  ...userToModify,
                  clinicUser: {
                    ...userToModify.clinicUser,
                    username: event.target.value,
                  },
                })
              }
            />
          </div>
          <div className="user-modification-entry">
            <label htmlFor="userType">User Type:</label>
            <select
              name="userType"
              id="userType"
              disabled={userToModify === undefined}
              onChange={(event) =>
                userToModify &&
                setUserToModify({
                  ...userToModify,
                  clinicUser: {
                    ...userToModify.clinicUser,
                    userType: event.target.value,
                  },
                })
              }
            >
              {[
                "MEDICAL_REGISTRAR",
                "DOCTOR",
                "LAB_TECHNICIAN",
                "LAB_SUPERVISOR",
              ].map((role) => {
                return (
                  <option
                    value={role}
                    selected={
                      role ===
                      (userToModify
                        ? userToModify.clinicUser.userType
                        : "MEDICAL_REGISTRAR")
                    }
                  >
                    {role}
                  </option>
                );
              })}
            </select>
          </div>
          {userToModify?.licenseNumber && (
            <div className="user-modification-entry">
              <label htmlFor="licenseNumber">License Number:</label>
              <input
                type="text"
                name="licenseNumber"
                id="licenseNumber"
                disabled={userToModify === undefined}
                value={userToModify.licenseNumber}
                onChange={(event) =>
                  userToModify &&
                  setUserToModify({
                    ...userToModify,
                    licenseNumber: event.target.value,
                  })
                }
              />
            </div>
          )}
        </form>
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
      </div>
    </div>
  );
}

function cancelUser(user: ClinicUser) {
  if (
    window.confirm(
      `Are you sure you want to delete user: ${user.firstName} ${user.lastName}`
    )
  ) {
    //delete user
  } else {
    alert("User was not deleted!");
  }
}

function modifyUser(
  user: ClinicUser | undefined,
  setUser: React.Dispatch<React.SetStateAction<ClinicUser | undefined>>,
  refresh: boolean,
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
) {
  if (user) {
    if (
      window.confirm(
        `Are you sure you want to modify values of user: ${user.firstName} ${user.lastName}`
      )
    ) {
      //modify user
      setUser(undefined);
      setRefresh(!refresh);
    } else {
      alert("User was not modified!");
    }
  } else {
    alert("Select user first!");
  }
}
