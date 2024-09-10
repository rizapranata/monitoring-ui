import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BounceLoader from "react-spinners/BounceLoader";
import { LayoutOne, Text } from "upkit";
import TopBar from "../../components/TopBar";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { fetchProgress } from "../../features/Progress/actions";
import SurveyComponent from "../../components/SurveyComponent";
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";

const PreviewProgress = () => {
  let dispatch = useDispatch();
  const { params } = useRouteMatch();
  let [status, setStatus] = React.useState("process");
  let [delstatus, setDelstatus] = React.useState(0);
  let progress = useSelector((state) => state.progress);
  let progressByProjectId = progress?.data?.data?.filter(
    (item) => item.projectId === parseInt(params.projectId)
  );

  console.log("progress preview by id:", progressByProjectId);

  React.useEffect(() => {
    setStatus("process");
    dispatch(fetchProgress());
    setStatus("success");
    setDelstatus(0);
    console.log();
  }, [dispatch, delstatus, progress.currentPage, progress.keyword]);

  // const dataSurvey = (titlePreview) => {
  //   let data = progressByProjectId?.map((item) => {
  //     return {
  //       navigationTitle: item.title,
  //       elements: {
  //         type: "text",
  //         description: item.desc,
  //         elements: {
  //           type: "image",
  //           imageLink: item.images,
  //         },
  //       },
  //     };
  //   });

  //   return {
  //     showProgressBar: "belowHeader",
  //     progressBarType: "pages",
  //     progressBarShowPageNumbers: true,
  //     progressBarShowPageTitles: true,
  //     title: titlePreview,
  //     pages: data,
  //     showQuestionNumbers: false,
  //     widthMode: "static",
  //     width: 900,
  //   };
  // };

  // console.log(dataSurvey());

  const step1Content = <h1>Step 1 Content</h1>;
  const step2Content = <h1>Step 2 Content</h1>;
  const step3Content = <h1>Step 3 Content</h1>;

  function onFormSubmit() {
    // handle the submit logic here
    // This function will be executed at the last step
    // when the submit button (next button in the previous steps) is pressed
  }

  function step2Validator() {
    // return a boolean
  }

  function step3Validator() {
    // return a boolean
  }

  const contentData = () => {
    progressByProjectId.map((item) => {
      return {
        label: item.title,
        content: `
          <div class="project-card">
            <h1>${item.title}</h1>
            <p>${item.desc}</p>
            <button onclick="alert('Project clicked')">View Project</button>
          </div>
        `,
      };
    });
  };

  console.log(contentData);

  return (
    <LayoutOne size="large">
      <div>
        <TopBar />
        <Text as={"h3"}>{`Preview progress ${params.projectName}`}</Text>
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
        {/* {SurveyComponent(dataSurvey(`Preview progress ${params.projectName}`))} */}

        {/* <StepProgressBar
          startingStep={0}
          onSubmit={onFormSubmit}
          steps={contentData}
        /> */}
      </div>
    </LayoutOne>
  );
};

export default PreviewProgress;
