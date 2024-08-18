import React from "react";
import { LayoutOne, InputText, FormControl, Button, Text, CardAlert } from "upkit";
import TopBar from "../../components/TopBar";

import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { rules } from "./validations";
import { createUser } from "../../api/user";

const status = [
  { status: "Aktif", value: true },
  { status: "Tidak Aktif", value: false },
];

const ManagementUserAdd = () => {
  let { roleUser } = useParams();
  let history = useHistory();

  const [selectedOptionStatus, setSelectedOptionStatus] = React.useState("");
  const [error, setError] = React.useState(false);

  let { handleSubmit, register, errors, setValue, watch, getValues } =
    useForm();
  watch();

  const handleSelectStatusChange = (e) => {
    setSelectedOptionStatus(e.target.value);
  };

  const onSubmit = async (formHook) => {
    if (roleUser === "admin") {
      formHook.role = roleUser;
    } else {
      formHook.role = roleUser;
    }
    formHook.status = selectedOptionStatus === "true" ? true : false;
    console.log("data formHook:", formHook);

    let { data } = await createUser(formHook);
    if (data.error) {
      setError(true);
      return;
    };

    history.push(`/user/${roleUser}`);
  };

  const isRole = (value) => {
    if (value === "admin") {
      return "Admin";
    } else {
      return "Client";
    }
  };

  return (
    <LayoutOne size="large">
      <TopBar />

      <br />
      <Text as="h3">Tambah {isRole(roleUser)}</Text>
      <br />
      {error ? (
        <LayoutOne size="medium">
          <CardAlert
            title="Perhatian!"
            message="Username sudah terdaftar. Mohon untuk menggunakan username lain."
          />
        </LayoutOne>
      ) : (
        ""
      )}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            label="Username"
            errorMessage={errors.username?.message}
            color="black"
          >
            <InputText
              placeholder="Username"
              fitContainer
              name="username"
              ref={register(rules.username)}
            />
          </FormControl>

          <FormControl
            label="Nama"
            errorMessage={errors.name?.message}
            color="black"
          >
            <InputText
              placeholder="Nama"
              fitContainer
              name="name"
              ref={register(rules.name)}
            />
          </FormControl>

          <FormControl
            label="Email"
            errorMessage={errors.email?.message}
            color="black"
          >
            <InputText
              placeholder="Nama"
              fitContainer
              name="email"
              ref={register(rules.email)}
            />
          </FormControl>

          <FormControl
            label="No. Telp"
            errorMessage={errors.phone?.message}
            color="black"
          >
            <InputText
              placeholder="No. Telp"
              fitContainer
              name="phone"
              ref={register(rules.phone)}
            />
          </FormControl>
          <FormControl
            label="Password"
            errorMessage={errors.password?.message}
            color="black"
          >
            <InputText
              placeholder="Password"
              fitContainer
              name="password"
              ref={register(rules.password)}
            />
          </FormControl>

          <FormControl
            label={roleUser === "admin" ? "Status Admin" : "Status Dokter"}
            errorMessage={errors.role?.message}
            color="black"
          >
            <select
              id="mySelect"
              name="status"
              value={selectedOptionStatus}
              onChange={handleSelectStatusChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" className="text-gray-500">
                Pilih Status
              </option>
              {status.map((option) => (
                <option key={option.status} value={option.value}>
                  {option.status}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </FormControl>

          <Button fitContainer>Simpan</Button>
          <br />
        </form>
        <br />
        <br />
      </div>
    </LayoutOne>
  );
};

export default ManagementUserAdd;
