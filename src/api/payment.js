import axios from "axios";
import { config } from "../config";

export async function updatePayment(payload) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios
    .put(`${config.api_host}/api/payment/${payload.id}`, payload, {
      headers: {
        authorization: `${token}`,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      if (error.response) {
        console.log("error response: ", error.response);
      } else if (error.request) {
        console.log("error request: ", error.request);
      } else {
        console.log("Error message", error.message);
      }
      console.log(error.config);
    });
}

export async function getPayment(params) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios
    .get(`${config.api_host}/api/payment`, {
      params,
      headers: {
        authorization: `${token}`,
      },
    })
    .then((response) => {
      return response;
    });
}

export async function getPaymentDetail(paymentId) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios
    .get(`${config.api_host}/api/payment/${paymentId}`, {
      headers: {
        authorization: `${token}`,
      },
    })
    .then((response) => {
      return response;
    });
}

export async function deleteProject(project_id) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios
    .delete(`${config.api_host}/api/project/${project_id}`, {
      headers: {
        authorization: `${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res;
    });
}
