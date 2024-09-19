import debounce from "debounce-promise";
import {
  ERROR_FETCHING_PORJECT,
  NEXT_PAGE,
  PREV_PAGE,
  SET_KEYWORD,
  SET_PAGE,
  START_FETCHING_PROJECT,
  SUCCESS_FETCHING_PORJECT,
} from "./constants";
import { getProjects } from "../../api/project";

const debounceFetchProject = debounce(getProjects, 1000);

export const fetchProject = (usernameClient) => {
  return async (dispatch, getState) => {
    dispatch(startFetchingProject());

    let keyword = getState().projects.keyword || "";
    let currentPage = getState().projects.currentPage || "";
    let params = {};

    if (keyword === "") {
      params = {
        page: currentPage,
      };
    } else {
      params = {
        name: keyword,
      };
    }

    params.usernameClient = usernameClient;
    params.page = currentPage;

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

export function successFetchingProject({ data, count }) {
  return {
    type: SUCCESS_FETCHING_PORJECT,
    data,
    count,
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

export const setPage = (number = 1) => {
  return {
    type: SET_PAGE,
    currentPage: number,
  };
};

export const goToNextPage = () => {
  return {
    type: NEXT_PAGE,
  };
};

export const goToPrevPage = () => {
  return {
    type: PREV_PAGE,
  };
};
