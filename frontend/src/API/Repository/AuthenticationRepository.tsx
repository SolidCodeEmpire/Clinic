import { postRequest } from "./FetchFromApi";

export function getToken(username: string, password: string) {
  return postRequest("/login", {username:username, password:password});
}
