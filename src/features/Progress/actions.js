import { CLEAR_ITEMS, SET_ITEMS, ADD_IMAGE, REMOVE_IMAGE } from "./constants";

export function addImage(item) {
  return {
    type: ADD_IMAGE,
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
