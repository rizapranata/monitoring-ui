import {
  ERROR_FETCHING_PORJECT,
  SET_KEYWORD,
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
  status: statuslist.idle,
  totalProject: 0,
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
      };

    case ERROR_FETCHING_PORJECT:
      return {
        ...state,
        status: statuslist.error,
      };

    case SET_KEYWORD:
      return { 
        ...state, 
        keyword: action.keyword, 
      };

    default:
      return state;
  }
}
