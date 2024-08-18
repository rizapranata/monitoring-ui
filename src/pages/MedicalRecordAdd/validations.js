const rules = {
  name: {
    required: { value: true, message: "nama pasien tidak boleh kosong." },
    maxLength: {
      value: 10,
      message: "nama pasien maksimal 100 karakter",
    },
    minLength: {
      value: 3,
      message: "nama pasien minimal 3 karakter",
    },
  },
  problem: {
    required: { value: true, message: "Keluhan tidak boleh kosong." },
    maxLength: {
      value: 100,
      message: "keluhan pasien maksimal 100 karakter",
    },
    minLength: {
      value: 3,
      message: "keluhan pasien minimal 3 karakter",
    },
  },
  diagnosis: {
    required: { value: true, message: "diagnosis pasien tidak boleh kosong." },
    maxLength: {
      value: 100,
      message: "Panjang maksimal 100 karakter",
    },
    minLength: {
      value: 3,
      message: "Panjang 0 karakter",
    },
  },
  note: {
    required: { value: true, message: "catatan pasien tidak boleh kosong." },
    maxLength: {
      value: 255,
      message: "Panjang maksimal 255 karakter",
    },
    minLength: {
      value: 3,
      message: "Panjang 3 karakter",
    },
  },
 
};
export { rules };
