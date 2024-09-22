import axios from "axios";
import { config } from "../config";

export async function getAllUser(params) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  console.log("params:", params);

  return await axios
    .get(`${config.api_host}/api/users`, {
      params,
      headers: {
        authorization: `${token}`,
      },
    })
    .then((response) => {
      return response;
    });
}

export async function getDetailUser(username) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios
    .get(`${config.api_host}/api/users/current/${username}`, {
      headers: {
        authorization: `${token}`,
      },
    })
    .then((response) => {
      return response;
    });
}

export async function createUser(payload) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  console.log("payload username:", payload);

  return await axios
    .post(`${config.api_host}/api/users/create`, payload, {
      headers: {
        authorization: `${token}`,
      },
    })
    .then((response) => {
      return response;
    });
}

export async function deleteUser(username) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  console.log("params username:", username);

  return await axios
    .delete(`${config.api_host}/api/users/delete/${username}`, {
      headers: {
        authorization: `${token}`,
      },
    })
    .then((response) => {
      return response;
    });
}

export async function updateUser(username, payload) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios
    .patch(`${config.api_host}/api/users/${username}`, payload, {
      headers: {
        authorization: `${token}`,
      },
    })
    .then((response) => {
      return response;
    });
}
