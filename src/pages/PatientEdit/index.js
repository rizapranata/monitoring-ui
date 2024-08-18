import React from "react";
import BounceLoader from "react-spinners/BounceLoader";
import { LayoutOne, InputText, FormControl, Button, Text } from "upkit";
import TopBar from "../../components/TopBar";
import { useForm } from "react-hook-form";
import { useHistory, useRouteMatch } from "react-router-dom";
import { rules } from "./validation";

import { getPatientId, updatePatient } from "../../api/pasien";
import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";

const PatientEdit = () => {
  const [patient, setPatient] = React.useState(null);
  const [error, setError] = React.useState("");
  const [status, setStatus] = React.useState("process");
  const [gender, setGender] = React.useState(null);
  const [selectedOption, setSelectedOption] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(null);

  const user = useSelector((state) => state.auth);
  const { params } = useRouteMatch();

  let history = useHistory();
  const { handleSubmit, register, errors, setValue, watch, getValues } =
    useForm();

  watch();
  
  const options = [
    { value: "Poli Umum", label: "Poli Umum" },
    { value: "Poli Gigi", label: "Poli Gigi" },
  ];

  React.useEffect(() => {
    getPatientId(params?.patientId)
      .then(({ data }) => {
        if (data?.error) {
          setError(data.data.message || "Terjadi kesalahan yang tidak diketahui");
          history.push("/edit-patient");
          console.log("Terjadi kesalahan yang tidak diketahui");
        }
        console.log("Data :", data.data);
        setPatient(data.data);
        handleDateChange(data.data.birth.slice(0, 10));

        setValue("noRm", data.data.noRm);
        setValue("name", data.data.name);
        setValue("age", data.data.age);
        setValue("gender", data.data.gender);
        setValue("birth", data.data.birth);
        setValue("phone", data.data.phone);
        setValue("email", data.data.email);
        setValue("address", data.data.address);
        setValue("poly", data.data.poly);
      })
      .finally(() => setStatus("idle"));

    register({ name: "noRm" }, rules.noRm);
    register({ name: "name" }, rules.name);
    register({ name: "age" }, rules.age);
    register({ name: "gender" }, rules.gender);
    register({ name: "birth" }, rules.birth);
    register({ name: "phone" }, rules.phone);
    register({ name: "email" }, rules.email);
    register({ name: "address" }, rules.address);
    register({ name: "poly" }, rules.poly);
  }, [history, params, register, setValue]);

  const handleDateChange = (date) => {
    console.log("date:", date);

    setSelectedDate(date);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };
  
  const handleGenderChange = (e) => {
    console.log("gender:", e.target.value);
    setGender(e.target.value);
    setError("");
  };

  const onSubmit = async (formHook) => {
    if (!gender || !selectedDate || !selectedOption) {
      setError("Ini wajib diisi!");
    }

    formHook.poly = selectedOption;
    formHook.birth = selectedDate;
    // formHook.gender = gender;

    console.log("data update pasient:", formHook);

    let { data } = await updatePatient(formHook, patient.id, user.user);
    if (data.error) return;

    history.push("/manajemen-patient");
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
      <Text as="h3">Edit Pasien</Text>
      <br />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            label="No. Rekam Medis"
            errorMessage={errors.noRm?.message}
            color="black"
          >
            <InputText
              placeholder="No. RM"
              fitContainer
              name="noRm"
              disabled={true}
              value={getValues().noRm}
              ref={register(rules.noRm)}
            />
          </FormControl>

          <FormControl
            label="Nama Pasien"
            errorMessage={errors.name?.message}
            color="black"
          >
            <InputText
              placeholder="Nama Pasien"
              fitContainer
              name="name"
              value={getValues().name}
              ref={register(rules.name)}
            />
          </FormControl>

          <FormControl
            label="Jenis Kelamin"
            errorMessage={errors.gender?.message}
            color="black"
          >
            {/* <div className="mt-2">
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  value="pria"
                  checked={gender === "pria"}
                  onChange={handleGenderChange}
                  className="form-radio h-4 w-4 text-indigo-600"
                  name="pria"
                />
                <span className="ml-2">Pria</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="wanita"
                  checked={gender === "wanita"}
                  onChange={handleGenderChange}
                  className="form-radio h-4 w-4 text-indigo-600"
                  name="wanita"
                />
                <span className="ml-2">Wanita</span>
              </label>
            </div> */}
            <InputText
              fitContainer
              name="gender"
              value={getValues().gender}
              ref={register(rules.gender)}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </FormControl>

          <FormControl
            label="Umur"
            errorMessage={errors.age?.message}
            color="black"
          >
            <InputText
              placeholder="Umur"
              fitContainer
              name="age"
              value={getValues().age}
              ref={register(rules.age)}
            />
          </FormControl>

          <FormControl
            label="Tgl Lahir"
            errorMessage={errors.birth?.message}
            color="black"
          >
            {/* <div className="w-48 mt-4 border border-gray-300 bg-white shadow-md rounded-md">
              <DatePicker
                placeholderText="dd/MM/yyyy"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                isClearable
                showYearDropdown
                scrollableYearDropdown
              />
            </div> */}
             <InputText
              placeholder="Tgl lahir"
              fitContainer
              name="birth"
              value={selectedDate}
              ref={register(rules.birth)}
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
            label="Alamat"
            errorMessage={errors.address?.message}
            color="black"
          >
            <InputText
              placeholder="Alamat"
              fitContainer
              name="address"
              value={getValues().address}
              ref={register(rules.address)}
            />
          </FormControl>

          <FormControl
            label="Poli klinik"
            errorMessage={errors.poly?.message}
            color="black"
          >
            <select
              id="mySelect"
              value={selectedOption}
              onChange={handleSelectChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" className="text-gray-500">
                Pilih Poli Klinik
              </option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </FormControl>
          <Button fitContainer>Update</Button>
          <br />
          <br />
        </form>
      </div>
    </LayoutOne>
  );
};

export default PatientEdit;
