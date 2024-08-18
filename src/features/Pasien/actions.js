import { getPatients } from "../../api/pasien";
import {
  SUCCESS_FETCHING_PASIEN,
  START_FETCHING_PASIEN,
  ERROR_FETCHING_PASIEN,
  SET_PAGE,
  SET_KEYWORD,
  NEXT_PAGE,
  PREV_PAGE,
  SET_KEYWORD_NORM,
} from "./constants";
import debounce from "debounce-promise";

let debouncheFetchPasiens = debounce(getPatients, 1000);

export const fetchPasiens = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingPasien());

    let keyword = getState().patients.keyword || "";
    console.log("get keyword:", keyword);

    let params = {};

    if (keyword === "") {
      params = {
        size: 50,
      };
    }else{
      params = {
        size: 50,
        name: keyword
      };
    }

    try {
      let {
        data: { data, count },
      } = await debouncheFetchPasiens(params);

      count = data.length;

      dispatch(successFetchingPasien({ data, count }));
    } catch (err) {
      dispatch(errorFetchingPasien());
    }
  };
};

export const startFetchingPasien = () => {
  return {
    type: START_FETCHING_PASIEN,
  };
};

export const errorFetchingPasien = () => {
  return {
    type: ERROR_FETCHING_PASIEN,
  };
};

export const successFetchingPasien = ({ data, count }) => {
  return {
    type: SUCCESS_FETCHING_PASIEN,
    data,
    count,
  };
};

export const setPage = (number = 1) => {
  return {
    type: SET_PAGE,
    currentPage: number,
  };
};

export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};

export const setKeywordNoRm = (keywordNoRm) => {
  return {
    type: SET_KEYWORD_NORM,
    keywordNoRm,
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
