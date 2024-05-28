import { getToken } from "../Repository/AuthenticationRepository";

type User = {
  username: string | undefined;
  role: string;
};

export function login(
  username: string,
  password: string,
  userDispatcher: React.Dispatch<React.SetStateAction<User | undefined>>
) {
  getToken(username, password).then((response) => {
    if (response?.status === 200) {
      response.text().then((text) => {
        let token = JSON.parse(text).token;
        localStorage.setItem("token", token);
        userDispatcher({username: username, role: JSON.parse(text).userType})
      });
    } else {
      alert("Error occuried while trying to log in. \nTry again or contact admin.");
    }
  });
}
