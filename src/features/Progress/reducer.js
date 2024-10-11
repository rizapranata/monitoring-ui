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
  SET_PAGE,
  NEXT_PAGE,
  PREV_PAGE,
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
  perPage: 10,
  imageList: [],
  currentPage: 1,
  titleAndDesc: {},
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_PROGRESS:
      return {
        ...state,
        status: statuslist.process,
      };
    case SUCCESS_FETCHING_PROGRESS:
      return {
        ...state,
        data: action.data,
        status: statuslist.success,
      };
    case ERROR_FETCHING_PROGRESS:
      return {
        ...state,
        status: statuslist.error,
      };
    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };
    case ADD_IMAGE:
      return {
        ...state,
        imageList: [...state.imageList, action.item],
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

    case EDIT_IMAGE:
      return {
        ...state,
        imageList: state.imageList.map((item) =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.updatedData }
            : item
        ),
      };

    case CLEAR_IMAGE:
      return {
        ...state,
        imageList: action.item,
      };

    case REMOVE_IMAGE:
      return {
        ...state,
        imageList: state.imageList.filter(
          (image) => image.imageId !== action.item
        ),
      };

    case CLEAR_ITEMS:
      return [];

    case SET_ITEMS:
      return action.items;

    default:
      return state;
  }
}
