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
import { getProjectsDetails, updateProject } from "../../api/project";
import { useRouteMatch } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import ToastComponent from "../../components/ToastComponent";

const ProjectEdit = () => {
  let history = useHistory();
  const [status, setStatus] = React.useState("process");
  const { params } = useRouteMatch();

  let { handleSubmit, register, errors, setValue, watch, getValues } =
    useForm();

  watch();

  React.useEffect(() => {
    setStatus("prosess");
    getProjectsDetails(params?.projectId)
      .then(({ data }) => {
        setValue("name", data.data.name);
        setValue("desc", data.data.desc);
      })
      .finally(() => setStatus("idle"));

    register({ name: "name" }, rules.name);
    register({ name: "desc" }, rules.desc);
  }, [params?.projectId, register, setValue]);

  const onSubmit = async (formHook) => {
    const payload = {
      id: parseInt(params?.projectId),
      name: formHook.name,
      desc: formHook.desc,
      usernameClient: params.username,
    };
    const { data } = await updateProject(payload);

    if (data.error) {
      return;
    } else {
      ToastComponent("success", "Update Project Success!");
    }

    history.goBack();
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
              defaultValue={getValues().name}
              ref={register(rules.name)}
            />
          </FormControl>

          <FormControl
            label="Deskripsi"
            errorMessage={errors.desc?.message}
            color="black"
          >
            <Textarea
              placeholder="Deskripsi"
              fitContainer
              name="desc"
              defaultValue={getValues().desc}
              ref={register(rules.desc)}
            />
          </FormControl>
          <br />

          <Button fitContainer>Simpan</Button>
          <br />
          <br />
        </form>
      </div>
    </LayoutOne>
  );
};

export default ProjectEdit;
