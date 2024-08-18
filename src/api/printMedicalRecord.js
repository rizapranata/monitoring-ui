import axios from "axios";
import { config } from "../config";

export async function getPrintMedicalRecord(params) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  console.log("params:", params);

  return await axios
    .get(`${config.api_host}/api/print-medical-records`, {
      params,
      headers: {
        authorization: `${token}`,
      },
    })
    .then((response) => {
        console.log("response api:", response);
      return response;
    });
}

export async function getDetailPrintMedicalRecord(medicalRecordId) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios
    .get(`${config.api_host}/api/print-medical-records/${medicalRecordId}`, {
      headers: {
        authorization: `${token}`,
      },
    })
    .then((response) => {
      return response;
    });
}

export async function deletePrintMedicalRec(medicalRecordId) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

    console.log("medical record id:", medicalRecordId);

  return await axios
    .delete(`${config.api_host}/api/print-medical-records/${medicalRecordId}`, {
      headers: {
        authorization: `${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response;
    });
}
