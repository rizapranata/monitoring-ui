const rules = {
  title: {
    required: { value: true, message: "Judul progress tidak boleh kosong." },
    maxLength: {
      value: 100,
      message: "Panjang Judul maksimal 100 karakter",
    },
    minLength: {
      value: 3,
      message: "Panjang judul minimal 3 karakter",
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
  images: {
    option: { value: true, message: "" },
  },
};
export { rules };
