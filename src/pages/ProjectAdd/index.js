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
import { userManagementData } from "../../hooks/userManagement";
import { createProject } from "../../api/project";
import { useRouteMatch } from "react-router-dom";
import { toast } from "react-toastify";

const ProjectAdd = () => {
  let history = useHistory();
  const { params } = useRouteMatch();
  const { data, status } = userManagementData();
  const dataClient = data.filter((item) => item.role === "client");

  let { handleSubmit, register, errors, setValue, watch, getValues } =
    useForm();

  watch();

  React.useEffect(() => {
    register({ name: "name" }, rules.name);
    register({ name: "desc" }, rules.desc);
    // register({ name: "usernameClient" }, rules.usernameClient);
  }, [register]);

  const notifSuccessCreate = () =>
    toast.success("Project baru berhasi dibuat!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const updateValue = (field, value) =>
    setValue(field, value, { shouldValidate: true, shouldDirty: true });

  const onSubmit = async (formHook) => {
    const payload = {
      name: formHook.name,
      desc: formHook.desc,
      usernameClient: params.username,
    };
    console.log("formhook:", payload);
    const { data } = await createProject(payload);

    if (data.error) {
      return;
    } else {
      notifSuccessCreate();
    }

    history.goBack();
  };

  return (
    <LayoutOne size="large">
      <TopBar />
      <br />
      <Text as="h3">Tambah Data Project</Text>
      <br />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            label="Nama Project"
            errorMessage={errors.name?.message}
            color="black"
          >
            <InputText
              placeholder="Nama Project"
              fitContainer
              name="name"
              value={getValues().name}
              ref={register(rules.name)}
            />
          </FormControl>

          <FormControl label="Deskripsi" errorMessage={""} color="black">
            <Textarea
              placeholder="Deskripsi"
              fitContainer
              name="desc"
              value={getValues().desc}
              ref={register(rules.desc)}
            />
          </FormControl>

          {/* <FormControl
            label="Pilih Client"
            errorMessage={errors.usernameClient?.message}
            color="black"
          >
            <Select
              options={dataClient.map((client) => ({
                label: client.name,
                value: client.username,
              }))}
              value={getValues().usernameClient}
              onChange={(option) => updateValue("usernameClient", option)}
              isLoading={status}
              sDisabled={status || !dataClient.length}
              name="usernameClient"
            />
          </FormControl> */}
          <br />

          <Button fitContainer>Simpan</Button>
          <br />
          <br />
        </form>
      </div>
    </LayoutOne>
  );
};

export default ProjectAdd;
