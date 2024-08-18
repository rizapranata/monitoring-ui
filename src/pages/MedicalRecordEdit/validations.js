const rules = {
  noRm: {
    required: { value: true, message: "no rekam medis tidak boleh kosong." },
    maxLength: {
      value: 10,
      message: "no rekam medis maksimal 100 karakter",
    },
    minLength: {
      value: 3,
      message: "no rekam medis minimal 3 karakter",
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
      message: "Panjang maksimal 200 karakter",
    },
    minLength: {
      value: 3,
      message: "Panjang 0 karakter",
    },
  },
  note: {
    optional: { value: true, message: "nama pasien tidak boleh kosong." },
    maxLength: {
      value: 100,
      message: "Panjang maksimal 2000 karakter",
    },
    minLength: {
      value: 3,
      message: "Panjang 100 karakter",
    },
  },
 
};
export { rules };
