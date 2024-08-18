const rules = {
  username: {
    required: { value: true, message: "Username tidak boleh kosong." },
    maxLength: { value: 255, message: "Panjang username maksimal 255 karakter" },
  },

  password: {
    required: { value: true, message: "Password tidak boleh kosong." },
    maxLength: {
      value: 255,
      message: "Panjang password maksimal 255 karakter.",
    },
  },
};

export { rules };
