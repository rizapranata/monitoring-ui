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
import { ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { rules } from "./validations";
import { config } from "../../config";
import {
  deleteImageProgress,
  getProgressDetail,
  addProgressImage,
  updateProgress,
} from "../../api/progress";
import { useRouteMatch } from "react-router-dom";
import TiDeleteOutline from "@meronex/icons/ti/TiDeleteOutline";
import { BounceLoader } from "react-spinners";
import ToastComponent from "../../components/ToastComponent";

const ProgressEdit = () => {
  let history = useHistory();
  const { params } = useRouteMatch();
  const [status, setStatus] = React.useState("process");
  const [images, setImages] = React.useState([]);
  const [delstatus, setDelstatus] = React.useState(0);
  const [addImageStatus, setAddImageStatus] = React.useState(0);

  let { handleSubmit, register, errors, watch, getValues, setValue } =
    useForm();

  watch();

  React.useEffect(() => {
    setStatus("process");
    getProgressDetail(params?.progressId)
      .then(({ data }) => {
        setValue("title", data.data.title);
        setValue("desc", data.data.desc);
      })
      .finally(() => setStatus("idle"));

    register({ name: "title" }, rules.title);
    register({ name: "desc" }, rules.desc);
  }, [params.progressId, register, setValue]);

  React.useEffect(() => {
    setDelstatus(0);
    setAddImageStatus(0);
    getProgressDetail(params?.progressId)
      .then(({ data }) => {
        setImages(data.data.images);
      })
      .finally(() => setStatus("idle"));
  }, [delstatus, addImageStatus, params?.progressId]);

  const onChangeHandler = async (e) => {
    const progressId = params?.progressId;
    if (e.target.files.length) {
      const image = e.target.files[0];

      let payload = new FormData();
      payload.append("images", image);
      payload.append("progressId", progressId);

      await addProgressImage(payload).then(({ data }) => {
        console.log("add img:", data);
        if (data.success === true) {
          ToastComponent("success", "Tambah Gambar Success !");
          setAddImageStatus(1);
        }
      });
    }
  };

  const handleDeleteImage = async (id) => {
    if (images.length <= 1) {
      ToastComponent("error", "Ooops..! minimal ada satu gambar.");
    } else {
      if (window.confirm("Delete this Image?")) {
        await deleteImageProgress(parseInt(id)).then(({ data }) => {
          console.log("delete img:", data);
          if (data.success === true) {
            setDelstatus(1);
            ToastComponent("success", "Delete Success!");
          }
        });
      }
    }
  };

  const onSubmit = async (formHook) => {
    const progressId = params?.progressId;
    const payload = {
      id: progressId,
      title: formHook.title,
      desc: formHook.desc,
    };

    const { data } = await updateProgress(payload);
    if (data.error) {
      return;
    } else {
      ToastComponent("success", "Edit Progress Success !");
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
              defaultValue={getValues().title}
              ref={register(rules.title)}
            />
          </FormControl>

          <FormControl label="Deskripsi" errorMessage={""} color="black">
            <Textarea
              placeholder="Deskripsi"
              fitContainer
              name="desc"
              defaultValue={getValues().desc}
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
              {images.length > 0 &&
                images.map((image, index) => (
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
                      onClick={() => {
                        handleDeleteImage(image.id);
                      }}
                    >
                      <TiDeleteOutline />
                    </div>
                    <img
                      src={`${config.api_host}/public/upload/${image.imageUrl}`}
                      alt={image.imeageFile}
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

export default ProgressEdit;
