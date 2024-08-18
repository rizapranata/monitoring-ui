import {
  ERROR_FETCHING_PASIEN,
  NEXT_PAGE,
  PREV_PAGE,
  SET_KEYWORD,
  SET_KEYWORD_NORM,
  SET_PAGE,
  START_FETCHING_PASIEN,
  SUCCESS_FETCHING_PASIEN,
} from "./constants";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  data: [],
  currentPage: 1,
  totalItems: -1,
  perPage: 6,
  keyword: "",
  keywordNoRm: "",
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_PASIEN:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_PASIEN:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_PASIEN:
      return {
        ...state,
        status: statuslist.success,
        data: action.data,
        totalItems: action.count,
      };

    case SET_PAGE:
      return { ...state, currentPage: action.currentPage };

    case SET_KEYWORD:
      return { ...state, keyword: action.keyword, category: "", tags: [] };

    case SET_KEYWORD_NORM:
      return { ...state, keywordNoRm: action.keywordNoRm };

    case NEXT_PAGE:
      return { ...state, currentPage: state.currentPage + 1 };

    case PREV_PAGE:
      return { ...state, currentPage: state.currentPage - 1 };

    default:
      return state;
  }
}
