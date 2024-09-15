import React, { useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BounceLoader from "react-spinners/BounceLoader";
import { LayoutOne, Text } from "upkit";
import TopBar from "../../components/TopBar";
import { useRouteMatch } from "react-router-dom";
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
import { config } from "../../config";
import "../../App.css";
import { getProgress } from "../../api/progress";

const PreviewProgress = () => {
  const { params } = useRouteMatch();
  console.log("params:", params);
  const [status, setStatus] = React.useState("process");
  const [progressData, setProgressData] = React.useState([]);
  const [fullScreenImage, setFullScreenImage] = React.useState(null);
  const scrollRef = useRef(null);

  let progressByProjectId = progressData?.filter(
    (item) => item.projectId === parseInt(params.projectId)
  );

  React.useEffect(() => {
    setStatus("process");
    getProgress()
      .then(({ data }) => {
        setProgressData(data.data.data);
      })
      .finally(() => setStatus("success"));
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
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
                style={{ width: "800px" }}
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

  let steps = progressByProjectId.map((project, index) => ({
    label: project.title,
    content: <StepContent data={project} />,
    validator: stepValidator,
  }));

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
        <Text as={"h5"}>{`Preview progress ${params.projectName}`}</Text>
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
        <StepProgressBar
          startingStep={0}
          onSubmit={onFormSubmit}
          steps={steps}
          labelClass="step-class"
          secondaryBtnClass="sec-btn-class"
          primaryBtnClass="prim-btn-class"
        />
      </div>
    </LayoutOne>
  );
};

export default PreviewProgress;
