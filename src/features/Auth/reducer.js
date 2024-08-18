import { USER_LOGIN, USER_LOGOUT } from "./constants";

/**
 * Kita mengubah nilai state awal yaitu initialState dengan mengambil terlebih dahulu nilai auth yang tersimpan
 * di Local Storage dengan fungsi localStorage.getItem('auth'), kemudian kita lakukan JSON.parse() untuk mengubah
 * dari tipe string menjadi javascript object kembali. Dan terakhir jika ternyata di dalam Local Storage tidak
 * ada nilai alias masih kosong, alias tidak login, kita berikan nilai default sebelumnya yaitu {user: null,
 * token: null}.
 *
 */

let initialState = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : { user: null, token: null };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return { user: action.user, token: action.token };

    case USER_LOGOUT:
      return { user: null, token: null };

    default:
      return state;
  }
}
