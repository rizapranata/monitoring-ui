import React, { useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BounceLoader from "react-spinners/BounceLoader";
import { CardAlert, LayoutOne, Text } from "upkit";
import TopBar from "../../components/TopBar";
import { useRouteMatch } from "react-router-dom";
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
import { config } from "../../config";
import "../../App.css";
import { getAllProgress } from "../../api/progress";
import { getAllProject } from "../../api/project";
import { getPayment } from "../../api/payment";

const PreviewProgressUser = () => {
  const { params } = useRouteMatch();
  const [status, setStatus] = React.useState("process");
  const [payments, setPayments] = React.useState([]);
  const [allProject, setAllProject] = React.useState([]);
  const [progressData, setProgressData] = React.useState([]);
  const [fullScreenImage, setFullScreenImage] = React.useState(null);
  const scrollRef = useRef(null);
  const resiNumber = params.projectId.split("0")[0];
  const project = allProject.find((data) => data.id === parseInt(resiNumber));

  let progressByProjectId = progressData?.filter(
    (item) => item.projectId === parseInt(resiNumber)
  );

  const findingByProjectId = payments?.data?.find(
    (data) => data.projectId === parseInt(resiNumber)
  );

  React.useEffect(() => {
    setStatus("process");
    getAllProject()
      .then(({ data }) => {
        setAllProject(data.data);
      })
      .finally(() => setStatus("success"));
  }, []);

  React.useEffect(() => {
    setStatus("process");
    getAllProgress()
      .then(({ data }) => {
        setProgressData(data.data);
      })
      .finally(() => setStatus("success"));
  }, []);

  React.useEffect(() => {
    setStatus("process");
    getPayment()
      .then(({ data }) => {
        setPayments(data);
      })
      .finally(() => setStatus("success"));
  }, []);

  const emptyData = [
    {
      label: "Step 1",
      subtitle: "10%",
      name: "step 1",
      content: `<h1>Step 1 Content</h1>`,
    },
  ];

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -700, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 700, behavior: "smooth" });
  };

  // Fungsi untuk menampilkan gambar dalam mode fullscreen
  const openFullScreen = (imageUrl) => {
    console.log("onClick full screen:", imageUrl);
    setFullScreenImage(imageUrl);
  };

  // Fungsi untuk menutup fullscreen
  const closeFullScreen = () => {
    setFullScreenImage(null);
  };

  function onFormSubmit() {}
  const stepValidator = () => true;
  const StepContent = ({ data }) => (
    <div>
      <div className="desc-wrapper">
        <p>{data.desc}</p>
      </div>
      <div className="scroll-wrapper">
        <button className="scroll-button left" onClick={scrollLeft}>
          {"<"}
        </button>
        <div className="scroll-container" ref={scrollRef}>
          {data.images.length > 0 &&
            data.images.map((image) => (
              <img
                key={image.id}
                src={`${config.api_host}/public/upload/${image.imageUrl}`}
                alt={`Progress ${image.progressId}`}
                style={{ width: "600px" }}
                className="scroll-image"
                onClick={() => openFullScreen(image.imageUrl)}
              />
            ))}
        </div>
        <button className="scroll-button right" onClick={scrollRight}>
          {">"}
        </button>

        {fullScreenImage && (
          <div className="fullscreen-overlay" onClick={closeFullScreen}>
            <img
              src={`${config.api_host}/public/upload/${fullScreenImage}`}
              alt="Fullscreen"
              className="fullscreen-image"
            />
          </div>
        )}
      </div>
    </div>
  );

  let steps =
    progressByProjectId.length > 0
      ? progressByProjectId.map((project, index) => ({
          label: project.title,
          content: <StepContent data={project} />,
          validator: stepValidator,
        }))
      : emptyData;

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
      <div>
        <TopBar />
        <Text as={"h5"}>
          {findingByProjectId?.resiNumber === params.projectId
            ? `Project ${project?.name}`
            : `Project Tidak Ditemukan`}
        </Text>
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
        {findingByProjectId === undefined ||
        findingByProjectId?.resiNumber !== params.projectId ? (
          <LayoutOne size="medium">
            <CardAlert
              title={`Oops...!`}
              message="Nomor resi yang Anda masukan salah! Pastikan Anda memasukan no resi dengan benar."
            />
          </LayoutOne>
        ) : progressByProjectId.length > 0 ? (
          <StepProgressBar
            startingStep={0}
            onSubmit={onFormSubmit}
            steps={steps}
            labelClass="step-class"
            secondaryBtnClass="sec-btn-class"
            primaryBtnClass="prim-btn-class"
          />
        ) : (
          <LayoutOne size="medium">
            <CardAlert
              title={`Data progress kosong!`}
              message={`Belum ada data progress project ${project?.name}.`}
            />
          </LayoutOne>
        )}
      </div>
    </LayoutOne>
  );
};

export default PreviewProgressUser;
