import React from "react";
import {
  LayoutOne,
  InputText,
  FormControl,
  Button,
  Text,
} from "upkit";
import TopBar from "../../components/TopBar";

import { useForm } from "react-hook-form";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";
import { rules } from "./validations";
import { BounceLoader } from "react-spinners";
import { getDetailUser, updateUser } from "../../api/user";

const statusUser = [
  { status: "Aktif", value: true },
  { status: "Tidak Aktif", value: false },
];

const UserUpdate = () => {
  let history = useHistory();

  const { params } = useRouteMatch();
  const { roleUser } = useParams();

  const [status, setStatus] = React.useState("process");
  const [userData, setUserData] = React.useState(null);
  const [selectedOptionStatus, setSelectedOptionStatus] = React.useState("");
  const [error, setError] = React.useState("");

  let { handleSubmit, register, errors, setValue, watch, getValues } =
    useForm();
  watch();

  React.useEffect(() => {
    setStatus("process");
    getDetailUser(params?.username)
      .then(({ data }) => {
        if (data?.error) {
          setError(
            data.data.message || "Terjadi kesalahan yang tidak diketahui"
          );
          console.log("Terjadi kesalahan yang tidak diketahui");
        }
        setUserData(data.data);
        setValue("username", data.data.username);
        setValue("name", data.data.name);
        setValue("email", data.data.email);
        setValue("phone", data.data.phone);
        setValue("role", data.data.role);
      })
      .finally(() => setStatus("idle"));

    register({ name: "username" }, rules.username);
    register({ name: "name" }, rules.name);
    register({ name: "email" }, rules.email);
    register({ name: "phone" }, rules.phone);
    register({ name: "role" }, rules.role);
  }, [history, params?.username, register, setValue]);

  const handleSelectStatusChange = (e) => {
    setSelectedOptionStatus(e.target.value);
  };

  const onSubmit = async (formHook) => {
    setStatus("process");

    formHook.role = userData.role === "admin" ? "admin" : "client";
    formHook.status = selectedOptionStatus === "true" ? true : false;
    formHook.username = params.username;

    let { data } = await updateUser(params.username, formHook);
    if (data.error) return;

    history.push(`/user/${userData.role}`);
  };

  if (status === "process") {
    return (
      <LayoutOne>
        <div className="text-center py-10">
          <div className="inline-block">
            <BounceLoader color="red" />
          </div>
        </div>
      </LayoutOne>
    );
  }

  return (
    <LayoutOne size="large">
      <TopBar />
      <br />
      <Text as="h3">Edit User</Text>
      <br />
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
              disabled={true}
              name="username"
              value={getValues().username}
              ref={register(rules.username)}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
              value={getValues().name}
              ref={register(rules.name)}
            />
          </FormControl>

          <FormControl
            label="Email"
            errorMessage={errors.email?.message}
            color="black"
          >
            <InputText
              placeholder="Email"
              fitContainer
              name="email"
              value={getValues().email}
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
              value={getValues().phone}
              ref={register(rules.phone)}
            />
          </FormControl>
          <FormControl
            label="Role"
            errorMessage={errors.role?.message}
            color="black"
          >
            <InputText
              placeholder="Role"
              fitContainer
              name="role"
              value={getValues().role}
              ref={register(rules.role)}
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
              {statusUser.map((option) => (
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

export default UserUpdate;
