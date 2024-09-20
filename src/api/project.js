import axios from "axios";
import { config } from "../config";

export async function createProject(payload) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  console.log("Payload api:", payload);

  return await axios
    .post(`${config.api_host}/api/project`, payload, {
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

export async function getProjects(params) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  console.log("params:", params);

  return await axios
    .get(`${config.api_host}/api/projects`, {
      params,
      headers: {
        authorization: `${token}`,
      },
    })
    .then((response) => {
      return response;
    });
}

export async function getAllProject() {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};
  
  return await axios
    .get(`${config.api_host}/api/projects/all`, {
      headers: {
        authorization: `${token}`,
      },
    })
    .then((response) => {
      return response;
    });
}

export async function getProjectsDetails(projectId) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios
    .get(`${config.api_host}/api/project/${projectId}`, {
      headers: {
        authorization: `${token}`,
      },
    })
    .then((response) => {
      return response;
    });
}

export async function updateProject(payload) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios
    .put(`${config.api_host}/api/project/${payload.id}`, payload, {
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
