import axios from "axios";
import { config } from "../config";

export async function getProgress(params) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  console.log("params:", params);

  return await axios
    .get(`${config.api_host}/api/progress`, {
      params,
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
      }
    });
}

export async function getAllProgress() {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  console.log("getAllProgress dipanggil");
  const params = {};

  return await axios
    .get(`${config.api_host}/api/progresses`, {
      params,
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
      }
    });
}

export async function getProgressDetail(progressId) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios
    .get(`${config.api_host}/api/progress/${progressId}`, {
      headers: {
        authorization: `${token}`,
      },
    })
    .then((response) => {
      return response;
    });
}

export async function createProgress(payload) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios
    .post(`${config.api_host}/api/progress`, payload, {
      headers: {
        authorization: `${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        console.log("error response: ", error.response);
      }
    });
}

export async function updateProgress(payload) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios
    .put(`${config.api_host}/api/progress/${payload.id}`, payload, {
      headers: {
        authorization: `${token}`,
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        console.log("error response: ", error.response);
      }
    });
}

export async function deleteProgress(progressId) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios
    .delete(`${config.api_host}/api/progress/${progressId}`, {
      headers: {
        authorization: `${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      return res;
    });
}

export async function addProgressImage(payload) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios
    .post(`${config.api_host}/api/progress/add-image`, payload, {
      headers: {
        authorization: `${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      if (error.response) {
        console.log("error response: ", error.response);
      }
    });
}

export async function deleteImageProgress(imageId) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  console.log("image id:", imageId);

  return await axios
    .delete(`${config.api_host}/api/progress/image/${imageId}`, {
      headers: {
        authorization: `${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      console.log("res delete:", res);
      return res;
    });
}
