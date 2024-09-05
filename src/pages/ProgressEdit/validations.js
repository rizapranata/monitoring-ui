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
    option: { value: true, message: "" },
  },
  images: {
    option: { value: true, message: "" },
  },
};
export { rules };
