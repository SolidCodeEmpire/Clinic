import React, { useState } from "react";
import { login } from "../../../API/Service/AuthenticationService";

type User = {
  username: string | undefined;
  role: string;
};

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
        <input name="login" type="text" value={username} onChange={(event) => {setUsername(event.target.value)}}/>
        <label htmlFor="password">Password: </label>
        <input name="password" type="password" value={password} onChange={(event) => {setPassword(event.target.value)}}/>
      </form>
      <button onClick={() =>{
        username && password && login(username, password, props.userDispatcher)
        }}>Log in</button>
    </div>
  );
}
