import React, { useState } from "react";
import { login } from "../../../API/Service/AuthenticationService";
import { User } from "../../../API/Model/UserModel";
import "./Login.css";
import ToggleTheme from "../ToggleTheme/ToggleTheme";

type LoginPageProps = {
  userDispatcher: React.Dispatch<React.SetStateAction<User | undefined>>;
};

export function LoginPage(props: LoginPageProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-row">
          <label htmlFor="login">Username: </label>
          <input
            id="login"
            name="login"
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            />
        </div>
        <div className="login-row">
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            />
        </div>

        <button
          type="submit"
          className="primary-button"
          onClick={() => {
            if ((localStorage.getItem("token") as string) !== null) {
              localStorage.removeItem("token");
            }
            username !== "" &&
              password !== "" &&
              login(username, password, props.userDispatcher);
          }}
          >
          Log in
        </button>
        <div className="login-information">
          <p>Having troubles logging in?</p>
          <p>Contact our administration.</p>
        </div>
      </div>
      <div>
          <ToggleTheme></ToggleTheme>
      </div>
    </div>
  );
}
