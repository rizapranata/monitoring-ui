import axios from "axios";
import { config } from "../config";

export async function getMedicalRecords(params) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  console.log("params:", params);

  return await axios
    .get(`${config.api_host}/api/medical-records`, {
      params,
      headers: {
        authorization: `${token}`,
      },
    })
    .then((response) => {
      return response;
    });
}

export async function createMedicalRecords(payload) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  console.log("payload:", payload);

  return await axios
    .post(`${config.api_host}/api/medical-records`, payload, {
      headers: {
        authorization: `${token}`,
      },
    })
    .then((response) => {
      return response;
    });
}

export async function getDetailMedicalRecord(medicalRecordId) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios
    .get(`${config.api_host}/api/medical-records/${medicalRecordId}`, {
      headers: {
        authorization: `${token}`,
      },
    })
    .then((response) => {
      return response;
    });
}

export async function updateMedicalRecord(payload, medicalRecordId, user) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  payload.id = medicalRecordId;
  payload.username = user.username;
  console.log("payload update:", payload);

  return await axios
    .put(`${config.api_host}/api/medical-records/${medicalRecordId}`, payload, {
      headers: {
        authorization: `${token}`,
      },
    })
    .then((response) => {
      return response;
    });
}

export async function deleteMedicalRec(medicalRecordId) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.delete(
    `${config.api_host}/api/medical-records/${medicalRecordId}`,
    {
      headers: {
        authorization: `${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
}
