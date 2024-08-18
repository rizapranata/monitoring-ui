import axios from "axios";
import { config } from "../config";

export async function getPatients(params) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

    console.log("params api:", params);

  return await axios
    .get(`${config.api_host}/api/patients`, {
      params,
      headers: {
        authorization: `${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response;
    });
}

export async function getPatientId(patientId) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  console.log("params:", patientId);

  return await axios
    .get(`${config.api_host}/api/patients/${patientId}`, {
      headers: {
        authorization: `${token}`,
        // "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response;
    });
}

export async function createPatient(payload) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios
    .post(`${config.api_host}/api/patients/create`, payload, {
      headers: {
        authorization: `${token}`,
        // "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response;
    });
}

export async function updatePatient(payload, patientId, user) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  payload.id = patientId;
  payload.username = user.username;

  return await axios
    .put(`${config.api_host}/api/patients/${patientId}`, payload, {
      headers: {
        authorization: `${token}`,
      },
    })
    .then((response) => {
      console.log(response);
      return response;
    });
}

export async function deletePatient(patientId) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios
    .delete(`${config.api_host}/api/patients/${patientId}`, {
      headers: {
        authorization: `${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response;
    });
}
