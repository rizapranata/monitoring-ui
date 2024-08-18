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
import { useHistory, useRouteMatch } from "react-router-dom";
import { rules } from "./validations";
import {
  getDetailMedicalRecord,
  updateMedicalRecord,
} from "../../api/medicalRecord";
import { BounceLoader } from "react-spinners";
import { useSelector } from "react-redux";

const MedicalRecordEdit = () => {
  let history = useHistory();
  const user = useSelector((state) => state.auth);

  const { params } = useRouteMatch();

  const [status, setStatus] = React.useState("process");
  const [medicalRecData, setMedicalRecData] = React.useState(null);
  const [medicalRecNumber, setMedicalRecNumber] = React.useState("");
  const [error, setError] = React.useState("");

  let { handleSubmit, register, errors, setValue, watch, getValues } =
    useForm();
  watch();

  React.useEffect(() => {
    setStatus("process");
    getDetailMedicalRecord(params?.medicalRecordId)
      .then(({ data }) => {
        if (data?.error) {
          setError(
            data.data.message || "Terjadi kesalahan yang tidak diketahui"
          );
          console.log("Terjadi kesalahan yang tidak diketahui");
        }
        setMedicalRecData(data.data);
        setMedicalRecNumber(data.data.noRm);
        setValue("noRm", data.data.noRm);
        setValue("problem", data.data.problem);
        setValue("diagnosis", data.data.diagnosis);
        setValue("note", data.data.note);
      })
      .finally(() => setStatus("idle"));

    register({ name: "noRm" }, rules.noRm);
    register({ name: "problem" }, rules.problem);
    register({ name: "diagnosis" }, rules.diagnosis);
    register({ name: "note" }, rules.note);
  }, [history, params?.medicalRecordId, register, setValue]);

  const onSubmit = async (formHook) => {
    setStatus("process");
    formHook.noRm = medicalRecNumber;

    let { data } = await updateMedicalRecord(formHook, medicalRecData.id, user.user);
    if (data.error) return;

    history.push("/rekam-medis");
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
      <Text as="h3">Edit Rekam Medis</Text>
      <br />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            label="No. Rekam Medis"
            errorMessage={errors.noRm?.message}
            color="black"
          >
            <InputText
              placeholder="No. Rekam Medis"
              fitContainer
              disabled={true}
              name="noRm"
              value={getValues().noRm}
              ref={register(rules.noRm)}
            />
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
              value={getValues().problem}
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
              value={getValues().diagnosis}
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
              value={getValues().note}
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

export default MedicalRecordEdit;
