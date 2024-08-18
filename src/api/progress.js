import axios from "axios";
import { config } from "../config";

export async function getProgress(params) {
  return await axios.get(`${config.api_host}/api/progress`, {
    params,
  });
}

export async function getProgressId(progress_id) {
  return await axios.get(`${config.api_host}/api/progress/${progress_id}`);
}

export async function createProgress(payload) {
 let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.post(`${config.api_host}/api/progress`, payload, {
      headers: {
        authorization: `${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      return response;
    }).catch((error) => {
      if (error.response) {
        console.log("error response: ",error.response);
      } else if (error.request) {
        console.log("error request: ",error.request);
      } else {
        console.log('Error message', error.message);
      }
      console.log(error.config);
    })
}

export async function updateProduct(payload, product_id) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.put(
    `${config.api_host}/api/products/${product_id}`,
    payload,
    {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

export async function deleteProduct(product_id) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.delete(`${config.api_host}/api/products/${product_id}`, {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
}
