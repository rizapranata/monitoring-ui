import React from "react";
import { LayoutOne, InputText, FormControl, Button, Text, Select } from "upkit";
import TopBar from "../../components/TopBar";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { rules } from "./validations";
import { createPatient } from "../../api/pasien";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PatientAdd = () => {
  let history = useHistory();
  const [gender, setGender] = React.useState(null);
  const [generateMRNumber, setGenerateMRNumber] = React.useState("");
  const [selectedOption, setSelectedOption] = React.useState("");
  const [error, setError] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(null);

  const options = [
    { value: "Poli Umum", label: "Poli Umum" },
    { value: "Poli Gigi", label: "Poli Gigi" },
  ];

  let { handleSubmit, register, errors, setValue, watch, getValues } =
    useForm();

  watch();

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    setError("");
  };

  React.useEffect(() => {
    setGenerateMRNumber(Math.floor(Math.random() * 10000).toString());
  }, []);

  const onSubmit = async (formHook) => {
    if (!gender || !selectedDate || !selectedOption) {
      setError("Ini wajib diisi!");
    }

    formHook.noRm = generateMRNumber;
    formHook.poly = selectedOption;
    formHook.birth = selectedDate;
    formHook.gender = gender;

    let { data } = await createPatient(formHook);
    if (data.error) return;
    history.push("/manajemen-patient");
    console.log("Data form:", formHook);
  };

  return (
    <LayoutOne size="large">
      <TopBar />
      <br />
      <Text as="h3">Tambah Pasien</Text>
      <br />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            label="No. RM"
            errorMessage={errors.nik?.message}
            color="black"
          >
            <InputText
              className="bg-slate-200"
              placeholder="No. RM"
              fitContainer
              name="noRm"
              value={generateMRNumber}
              disabled={true}
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
              ref={register(rules.name)}
            />
          </FormControl>

          <FormControl
            label="Jenis Kelamin"
            errorMessage={error && errors.gender?.message}
            color="black"
          >
            <div className="mt-2">
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
            </div>
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
              ref={register(rules.age)}
            />
          </FormControl>

          <FormControl
            label="Tgl Lahir"
            errorMessage={errors.birth?.message}
            color="black"
          >
            <div className="w-48 mt-4 border border-gray-300 bg-white shadow-md rounded-md">
              <DatePicker
                placeholderText="dd/MM/yyyy"
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                isClearable
                showYearDropdown
                scrollableYearDropdown
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
            label="Alamat"
            errorMessage={errors.address?.message}
            color="black"
          >
            <InputText
              placeholder="Alamat"
              fitContainer
              name="address"
              ref={register(rules.address)}
            />
          </FormControl>

          <FormControl
            label="Poli Klinik"
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

          <Button fitContainer>Simpan</Button>
          <br />
        </form>
        <br />
        <br />
      </div>
    </LayoutOne>
  );
};

export default PatientAdd;
