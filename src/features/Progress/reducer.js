import { CLEAR_ITEMS, SET_ITEMS, ADD_IMAGE, REMOVE_IMAGE } from "./constants";

const initialState = {
  imageList: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_IMAGE:
        return {
          ...state,
          imageList: [...state.imageList, action.item]
        };

    case REMOVE_IMAGE:
      return {
        ...state,
        imageList: state.imageList.filter((image) => image.imageId !== action.item)
      }

    case CLEAR_ITEMS:
      return [];

    case SET_ITEMS:
      return action.items;

    default:
      return state;
  }
}
