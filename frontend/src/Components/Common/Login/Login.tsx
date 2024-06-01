import React, { useState } from "react";
import { login } from "../../../API/Service/AuthenticationService";
import { User } from "../../../API/Model/UserModel";

type LoginPageProps = {
  userDispatcher: React.Dispatch<React.SetStateAction<User | undefined>>;
};

export function LoginPage(props: LoginPageProps) {
    const [username, setUsername] = useState<string | undefined>()
    const [password, setPassword] = useState<string | undefined>()

  return (
    <div>
      <form>
        <label htmlFor="login">Username: </label>
        <input id="login" name="login" type="text" value={username} onChange={(event) => {setUsername(event.target.value)}}/>
        <label htmlFor="password">Password: </label>
        <input id="password" name="password" type="password" value={password} onChange={(event) => {setPassword(event.target.value)}}/>
      </form>
      <button onClick={() =>{
        if (localStorage.getItem("token") as string !== null) {
          localStorage.removeItem("token");
        }
        username && password && login(username, password, props.userDispatcher)
        }}>Log in</button>
    </div>
  );
}
