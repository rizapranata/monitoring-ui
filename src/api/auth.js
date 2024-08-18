import axios from "axios";
import { config } from "../config";

export async function registerUser(data) {
  return await axios.post(`${config.api_host}/auth/register`, data);
}

export async function login(username, password) {
  return await axios.post(`${config.api_host}/api/users/login`, { username, password });
}

export async function logout() {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios
    .post(`${config.api_host}/api/users/logout`, null, {
      headers: {
        authorization: `${token}`,
      },
    })
    .then((response) => {
      localStorage.removeItem("auth");
      return response;
    });
}
