import store from "./store";
import { saveCart } from "../api/cart";

let currentAuth;
let currentCart;

function listener() {
  let previousAuth = currentAuth;
  let previousCart = currentCart;

  //update nilai current dari nilai state terbaru
  currentAuth = store.getState().auth;
  currentCart = store.getState().cart;

  let { token } = currentAuth;

  if (currentAuth !== previousAuth) {
    //JSON.stringify untuk mengubah type object jadi string
    localStorage.setItem("auth", JSON.stringify(currentAuth));
  }

  // if (currentCart !== previousCart) {
  //   localStorage.setItem("cart", JSON.stringify(currentCart));

  //   saveCart(token, currentCart);
  // }
}

function listen() {
  store.subscribe(listener);
}

export { listen };
