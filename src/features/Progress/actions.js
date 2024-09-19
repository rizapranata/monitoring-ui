import debounce from "debounce-promise";
import {
  CLEAR_ITEMS,
  SET_ITEMS,
  ADD_IMAGE,
  REMOVE_IMAGE,
  START_FETCHING_PROGRESS,
  SUCCESS_FETCHING_PROGRESS,
  ERROR_FETCHING_PROGRESS,
  SET_KEYWORD,
  EDIT_IMAGE,
  CLEAR_IMAGE,
  NEXT_PAGE,
  PREV_PAGE,
  SET_PAGE,
} from "./constants";
import { getProgress } from "../../api/progress";

const debounceFetchProgress = debounce(getProgress, 1000);

export const fetchProgress = (projectId) => {
  return async (dispatch, getState) => {
    dispatch(startFetchingProgress());

    let keyword = getState().progress.keyword || "";
    let currentPage = getState().progress.currentPage || "";
    let params = {};

    if (keyword === "") {
      params = {
        page: currentPage,
      };
    } else {
      params = {
        title: keyword,
      };
    }

    params.projectId = projectId;
    params.page = currentPage;

    try {
      let {
        data: { data, count },
      } = await debounceFetchProgress(params);

      dispatch(successFetchingProgress({ data, count }));
    } catch (error) {
      dispatch(errorFetchingProgress());
    }
  };
};

export function startFetchingProgress() {
  return {
    type: START_FETCHING_PROGRESS,
  };
}

export function successFetchingProgress({ data, count }) {
  return {
    type: SUCCESS_FETCHING_PROGRESS,
    data,
    count,
  };
}

export function errorFetchingProgress() {
  return {
    type: ERROR_FETCHING_PROGRESS,
  };
}

export function setKeyword(keyword) {
  return {
    type: SET_KEYWORD,
    keyword,
  };
}

export function addImage(item) {
  return {
    type: ADD_IMAGE,
    item,
  };
}

export function editImage(item) {
  return {
    type: EDIT_IMAGE,
    item,
  };
}

export function clearImage(item) {
  return {
    type: CLEAR_IMAGE,
    item,
  };
}

export function removeImage(item) {
  return {
    type: REMOVE_IMAGE,
    item,
  };
}

export function clearItems() {
  return {
    type: CLEAR_ITEMS,
  };
}

export function setItems(items) {
  return {
    type: SET_ITEMS,
    items,
  };
}

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
