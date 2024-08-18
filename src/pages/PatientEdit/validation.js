const rules = {
  noRm: {
    required: { value: true, message: "nik tidak boleh kosong." },
    maxLength: {
      value: 100,
      message: "Panjang nik maksimal 20 karakter",
    },
    minLength: {
      value: 3,
      message: "Panjang nik minimal 3 karakter",
    },
  },
  name: {
    required: { value: true, message: "nama pasien tidak boleh kosong." },
    maxLength: {
      value: 100,
      message: "Panjang nama nama pasien maksimal 100 karakter",
    },
    minLength: {
      value: 3,
      message: "Panjang nama nama pasien minimal 3 karakter",
    },
  },
  gender: {
    required: { value: true, message: "jenis kelamin tidak boleh kosong." },
  },
  age: {
    required: { value: true, message: "umur tidak boleh kosong" },
  },
  birth: {
    required: { value: true, message: "tanggal lahir tidak boleh kosong," },
  },
  email: {
    Option: { value: true, message: "email tidak boleh kosong," },
  },
  phone: {
    required: { value: true, message: "no telepon tidak boleh kosong." },
  },
  address: {
    required: { value: true, message: "image tidak boleh kosong." },
  },
  poly: {
    required: { value: true, message: "poliklinik tidak boleh kosong." },
  },
};
export { rules };
