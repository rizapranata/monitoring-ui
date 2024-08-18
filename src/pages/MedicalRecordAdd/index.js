import React from "react";
import {
  LayoutOne,
  InputText,
  FormControl,
  Button,
  Text,
  Textarea,
} from "upkit";
import TopBar from "../../components/TopBar";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { rules } from "./validations";
import { useSelector } from "react-redux";
import { createMedicalRecords } from "../../api/medicalRecord";

const MedicalRecordAdd = () => {
  let { user } = useSelector((store) => store.auth);
  let patients = useSelector((store) => store.patients);
  let wherePoly = patients.data.filter((item) => item.poly === user.poliName);
  let history = useHistory();

  const [selectedOption, setSelectedOption] = React.useState("");
  const [error, setError] = React.useState("");

  let { handleSubmit, register, errors, setValue, watch, getValues } =
    useForm();
  watch();

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const onSubmit = async (formHook) => {
    if (!selectedOption) {
      setError("nama pasien wajib diisi!");
    }

    formHook.noRm = selectedOption;
    console.log("data formHook:", formHook);

    let { data } = await createMedicalRecords(formHook);
    if (data.error) return;

    history.push("/rekam-medis");
  };

  return (
    <LayoutOne size="large">
      <TopBar />
      <br />
      <Text as="h3">Tambah Rekam Medis</Text>
      <br />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            label="No Pasien"
            errorMessage={errors.name?.message}
            color="black"
          >
            <select
              id="mySelect"
              name="name"
              value={selectedOption}
              onChange={handleSelectChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" className="text-gray-500">
                Pilih No Pasien
              </option>
              {wherePoly.map((option) => (
                <option key={option.id} value={option.noRm}>
                  {option.noRm}
                </option>
              ))}
            </select>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </FormControl>

          <FormControl
            label="Keluhan"
            errorMessage={errors.problem?.message}
            color="black"
          >
            <InputText
              placeholder="Keluhan"
              fitContainer
              name="problem"
              ref={register(rules.problem)}
            />
          </FormControl>

          <FormControl
            label="Diagnosis"
            errorMessage={errors.diagnosis?.message}
            color="black"
          >
            <InputText
              placeholder="Diagnosis"
              fitContainer
              name="diagnosis"
              ref={register(rules.diagnosis)}
            />
          </FormControl>

          <FormControl
            label="Catatan"
            errorMessage={errors.note?.message}
            color="black"
          >
            <Textarea
              placeholder="Catatan"
              fitContainer
              name="note"
              ref={register(rules.note)}
            />
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

export default MedicalRecordAdd;
