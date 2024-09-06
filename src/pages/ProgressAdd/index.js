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
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { rules } from "./validations";
import { createProgress } from "../../api/progress";
import { useDispatch, useSelector } from "react-redux";
import {
  addImage,
  clearImage,
  removeImage,
} from "../../features/Progress/actions";
import { useRouteMatch } from "react-router-dom";
import TiDeleteOutline from "@meronex/icons/ti/TiDeleteOutline";

const ProgressAdd = () => {
  let history = useHistory();
  const { params } = useRouteMatch();
  const dispatch = useDispatch();
  const progressReducer = useSelector((store) => store.progress);
  const imageList = progressReducer.imageList;

  let { handleSubmit, register, errors, watch, getValues } = useForm();

  watch();

  React.useEffect(() => {
    register({ name: "title" }, rules.title);
    register({ name: "desc" }, rules.desc);
    register({ name: "images" }, rules.images);
  }, [register]);

  const notifError = () =>
    toast.success("Terjadi Kesalahan!", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const onChangeHandler = (e) => {
    if (e.target.files.length) {
      const imeageFile = e.target.files[0];
      const payload = {
        imeageFile,
      };

      dispatch(addImage(payload));
    }
  };

  const handleDelete = (id) => {
    console.log(id);
    dispatch(removeImage(id));
  };

  const onSubmit = async (formHook) => {
    const imageFiles = [];
    let payload = new FormData();

    imageList.map((image) => imageFiles.push(image.imeageFile));
    console.log("image progress:", imageFiles);

    imageFiles.forEach((image) => {
      payload.append("images", image);
    });

    payload.append("desc", formHook.desc);
    payload.append("title", formHook.title);
    payload.append("usernameClient", params.username);

    const { data } = await createProgress(payload);

    if (data.error) {
      notifError();
      return;
    }

    dispatch(clearImage(""));
    history.goBack();
  };

  return (
    <LayoutOne size="large">
      <TopBar />
      <br />
      <Text as="h3">{`Tambah Data Progress ${params.projectName}`}</Text>
      <br />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            label="Judul Progress"
            errorMessage={errors.title?.message}
            color="black"
          >
            <InputText
              placeholder="Judul Progress"
              fitContainer
              name="title"
              ref={register(rules.title)}
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

          <FormControl
            label="Upload Gambar"
            errorMessage={errors.image?.message}
            color="black"
          >
            <input
              type="file"
              name="images"
              multiple
              required
              ref={register(rules.images)}
              onChange={onChangeHandler}
            />
          </FormControl>

          <label htmlFor="upload-button">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              {imageList.length > 0 &&
                imageList.map((image, index) => (
                  <div
                    key={index}
                    style={{
                      margin: "10px",
                      borderWidth: 1,
                      borderColor: "green",
                      borderRadius: 6,
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-5px",
                        background: "red",
                        color: "white",
                        border: "none",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(image.imageId)}
                    >
                      <TiDeleteOutline />
                    </div>
                    <img
                      src={URL.createObjectURL(image.imeageFile)}
                      alt={image.imeageFile.nmae}
                      style={{ width: "100px", height: "100px", margin: 10 }}
                    />
                  </div>
                ))}
            </div>
          </label>
          <br />

          <Button fitContainer>Simpan</Button>
          <br />
          <br />
        </form>
      </div>
    </LayoutOne>
  );
};

export default ProgressAdd;
