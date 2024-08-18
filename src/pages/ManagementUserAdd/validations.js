const rules = {
  username: {
    required: { value: true, message: "username tidak boleh kosong." },
    maxLength: {
      value: 100,
      message: "username maksimal 100 karakter",
    },
    minLength: {
      value: 3,
      message: "username minimal 3 karakter",
    },
  },
  name: {
    required: { value: true, message: "nama tidak boleh kosong." },
    maxLength: {
      value: 100,
      message: "nama maksimal 100 karakter",
    },
    minLength: {
      value: 3,
      message: "nama minimal 3 karakter",
    },
  },
  email: {
    optional: { value: true, message: "email boleh kosong." },
    maxLength: {
      value: 100,
      message: "Panjang maksimal 100 karakter",
    },
    minLength: {
      value: 3,
      message: "Panjang 0 karakter",
    },
  },
  phone: {
    optional: { value: true, message: "no telepon tidak boleh kosong." },
    maxLength: {
      value: 12,
      message: "no telepon maksimal 12 karakter",
    },
    minLength: {
      value: 3,
      message: "Panjang 3 karakter",
    },
  },
  role: {
    required: { value: true, message: "role tidak boleh kosong." },
    maxLength: {
      value: 12,
      message: "role maksimal 12 karakter",
    },
    minLength: {
      value: 3,
      message: "Panjang 3 karakter",
    },
  },
  status: {
    optional: { value: true, message: "status tidak boleh kosong." },
    maxLength: {
      value: 1,
      message: "role maksimal 11 karakter",
    },
    minLength: {
      value: 1,
      message: "Panjang 1 karakter",
    },
  },
  password: {
    required: { value: true, message: "password tidak boleh kosong." },
    maxLength: {
      value: 100,
      message: "password maksimal 100 karakter",
    },
    minLength: {
      value: 5,
      message: "Panjang 5 karakter",
    },
  },
};
export { rules };
