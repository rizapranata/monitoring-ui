import React, { useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BounceLoader from "react-spinners/BounceLoader";
import { LayoutOne, Text } from "upkit";
import TopBar from "../../components/TopBar";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { fetchProgress } from "../../features/Progress/actions";
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
import { config } from "../../config";
import "../../App.css";

const PreviewProgress = () => {
  let dispatch = useDispatch();
  const { params } = useRouteMatch();
  console.log("params:", params);
  let [status, setStatus] = React.useState("process");
  let [delstatus, setDelstatus] = React.useState(0);
  const [fullScreenImage, setFullScreenImage] = React.useState(null);
  const scrollRef = useRef(null);

  let progress = useSelector((state) => state.progress);
  let progressByProjectId = progress?.data?.data?.filter(
    (item) => item.projectId === parseInt(params.projectId)
  );

  console.log("progress preview by id:", progress);

  React.useEffect(() => {
    setStatus("process");
    dispatch(fetchProgress());
    setStatus("success");
    setDelstatus(0);
  }, [dispatch, delstatus, progress.keyword]);

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

  console.log("seteps data: ", steps);

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
