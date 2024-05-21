import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ClinicUser } from "../../../../API/Model/ClinicUserModel";
import { fetchClinicUsers } from "../../../../API/Service/ClinicUserService";

export default function ListUsers() {
  const [userList, setUserList] = useState<Array<ClinicUser>>();

  useEffect(() => {
    fetchClinicUsers(setUserList);
  }, []);

  return (
    <div>
      <Link to="/">
        <button className="primary-button">Back</button>
      </Link>
      {userList &&
        userList.map((user) => {
          return (
            <>
              {user.clinicUser.email}
              <br />
            </>
          );
        })}
    </div>
  );
}
