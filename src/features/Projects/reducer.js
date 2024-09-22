import {
  ERROR_FETCHING_PORJECT,
  NEXT_PAGE,
  PREV_PAGE,
  SET_KEYWORD,
  SET_PAGE,
  START_FETCHING_PROJECT,
  SUCCESS_FETCHING_PORJECT,
} from "./constants";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  data: [],
  keyword: "",
  currentPage: 1,
  perPage: 5,
  totalProject: 0,
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_PROJECT:
      return {
        ...state,
        status: statuslist.process,
      };

    case SUCCESS_FETCHING_PORJECT:
      return {
        ...state,
        data: action.data,
        totalProject: action.count,
        status: statuslist.success,
      };

    case ERROR_FETCHING_PORJECT:
      return {
        ...state,
        status: statuslist.error,
      };

    case SET_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };

    case NEXT_PAGE:
      return { ...state, currentPage: state.currentPage + 1 };

    case PREV_PAGE:
      return { ...state, currentPage: state.currentPage - 1 };

    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };

    default:
      return state;
  }
}
