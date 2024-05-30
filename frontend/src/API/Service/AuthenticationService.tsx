import { getToken } from "../Repository/AuthenticationRepository";
import { User } from "../Model/UserModel";

export function login(
  username: string,
  password: string,
  userDispatcher: React.Dispatch<React.SetStateAction<User | undefined>>
) {
  getToken(username, password).then((response) => {
    if (response?.status === 200) {
      response.text().then((text) => {
        const json = JSON.parse(text);

        localStorage.setItem("token", json.token);
        localStorage.setItem("username", username);
        localStorage.setItem("id", json.id);
        localStorage.setItem("role", json.userType);
        
        userDispatcher({id: json.id, username: username, role: json.userType});
      });
    } else {
      alert("Error occurred while trying to log in. \nTry again or contact admin.");
    }
  });
}
