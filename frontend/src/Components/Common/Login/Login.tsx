import React, { useState } from "react";

type User = {
  username: string | undefined;
  role: string;
};

type LoginPageProps = {
  userDispatcher: React.Dispatch<React.SetStateAction<User | undefined>>;
};

export function LoginPage(props: LoginPageProps) {
    const [login, setLogin] = useState<string | undefined>()
    const [password, setPassword] = useState<string | undefined>()
    const [role, setRole] = useState<string>("receptionist")

  return (
    <div>
      <form>
        <label htmlFor="login">Username: </label>
        <input name="login" type="text" value={login} onChange={(event) => {setLogin(event.target.value)}}/>
        <label htmlFor="password">Password: </label>
        <input name="password" type="password" value={password} onChange={(event) => {setPassword(event.target.value)}}/>
        <label htmlFor="role">role</label>
        <select name="role" id="role" onChange={(event) => {setRole(event.target.value)}}>
            <option value="receptionist" selected>receptionist</option>
            <option value="doctor">doctor</option>
            <option value="supervisor">supervisor</option>
            <option value="technician">technician</option>
            <option value="admin">admin</option>
        </select>
        <button onClick={() =>{props.userDispatcher({username:login, role:role})}}>Log in</button>
      </form>
    </div>
  );
}
