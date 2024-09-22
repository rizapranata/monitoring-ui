const rules = {
  name: {
    required: { value: true, message: "Nama project tidak boleh kosong." },
    maxLength: {
      value: 100,
      message: "Panjang nama project maksimal 100 karakter",
    },
    minLength: {
      value: 3,
      message: "Panjang nama project minimal 3 karakter",
    },
  },
  desc: {
    required: { value: true, message: "Deskripsi tidak boleh kosong!" },
    maxLength: {
      value: 500,
      message: "Panjang deskripsi maksimal 500 karakter",
    },
    minLength: {
      value: 3,
      message: "Panjang deskripsi minimal 3 karakter",
    },
  },
  // usernameClient: {
  //   required: { value: true, message: "Client tidak boleh kosong!" },
  // },
};
export { rules };
