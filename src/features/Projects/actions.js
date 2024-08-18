import debounce from "debounce-promise";
import {
  ERROR_FETCHING_PORJECT,
  SET_KEYWORD,
  START_FETCHING_PROJECT,
  SUCCESS_FETCHING_PORJECT,
} from "./constants";
import { getProjects } from "../../api/project";

const debounceFetchProject = debounce(getProjects, 1000);

export const fetchProject = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingProject());

    let keyword = getState().projects.keyword || "";
    let params = {};

    if (keyword === "") {
      params = {};
    } else {
      params = {
        name: keyword,
      };
    }

    try {
      let {
        data: { data, count },
      } = await debounceFetchProject(params);

      dispatch(successFetchingProject({ data, count }));
    } catch (err) {
      dispatch(errorFetchingProject());
    }
  };
};

export function startFetchingProject() {
  return {
    type: START_FETCHING_PROJECT,
  };
}

export function successFetchingProject({data, count}) {
  return {
    type: SUCCESS_FETCHING_PORJECT,
    data,
    count
  };
}

export function errorFetchingProject() {
  return {
    type: ERROR_FETCHING_PORJECT,
  };
}

export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};

