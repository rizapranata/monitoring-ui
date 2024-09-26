import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import BounceLoader from "react-spinners/BounceLoader";
import {
  LayoutOne,
  Text,
  Button,
  Table,
  InputText,
  ButtonCircle,
  CardAlert,
  Responsive,
} from "upkit";
import FaFilter from "@meronex/icons/fa/FaFilter";
import FaEdit from "@meronex/icons/fa/FaEdit";
import FaTrash from "@meronex/icons/fa/FaTrash";
import TopBar from "../../components/TopBar";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { config } from "../../config";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import {
  fetchProgress,
  setKeyword,
  setPage,
} from "../../features/Progress/actions";
import { deleteProgress } from "../../api/progress";
import { confirmAlert } from "react-confirm-alert";
import ToastComponent from "../../components/ToastComponent";

const ManagementProgress = () => {
  let dispatch = useDispatch();
  const { params } = useRouteMatch();
  const progress = useSelector((state) => state.progress);
  const [status, setStatus] = React.useState("process");
  const [delstatus, setDelstatus] = React.useState(0);
  const history = useHistory();

  React.useEffect(() => {
    setStatus("process");
    dispatch(fetchProgress(parseInt(params.projectId)));
    setStatus("success");
    setDelstatus(0);
  }, [dispatch, delstatus, progress.currentPage, progress.keyword]);

  const handleClick = () => {
    const username = params.username;
    const projectId = params.projectId;
    const projectName = params.projectName;
    history.push(`/progress/tambah/${username}/${projectId}/${projectName}`);
  };

  const handleEdit = (progressId) => {
    const username = params.username;
    const projectName = params.projectName;
    history.push(`/progress/edit/${username}/${projectName}/${progressId}`);
  };

  const handlePreview = () => {
    // const username = params.username;
    // const projectName = params.projectName;
    const projectId = params.projectId;
    history.push(`/progress/preview/${projectId}`);
  };

  const handleDelete = (progressId, title) => {
    confirmAlert({
      title: "KONFIRMASI HAPUS..!",
      message: `Apakah progress "${title}" ingin dihapus?`,
      closeOnEscape: true,
      closeOnClickOutside: false,
      keyCodeForClose: [8, 32],
      buttons: [
        {
          label: "Ya",
          onClick: () => {
            ToastComponent("success", "Delete progress berhasil!");
            deleteProgress(progressId);
            setDelstatus(1);
          },
        },
        {
          label: "Tidak",
          onClick: () => {},
        },
      ],
    });
  };

  const columns = [
    {
      Header: "Gambar",
      accessor: (items) => {
        const images = items.images;
        return (
          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={`${config.api_host}/public/upload/${image.imageUrl}`}
                alt={`${index + 1}`}
                style={{ width: "50px", height: "auto", marginRight: "5px" }}
              />
            ))}
          </div>
        );
      },
    },
    { Header: "Nama", accessor: "title" },
    { Header: "Descripsi", accessor: "desc" },
    {
      Header: "Action",
      accessor: (items) => {
        return (
          <div>
            <ButtonCircle
              icon={<FaEdit />}
              onClick={() => handleEdit(items.id)}
            />
            <ButtonCircle
              icon={<FaTrash />}
              onClick={() => handleDelete(items.id, items.title)}
            />
          </div>
        );
      },
    },
  ];

  if (status === "process") {
    return (
      <LayoutOne>
        <div className="text-center py-20 my-20">
          <div className="inline-block">
            <BounceLoader color="red" />
          </div>
        </div>
      </LayoutOne>
    );
  }

  const totalData =
    progress?.data?.data?.length > 5
      ? progress?.data?.data?.length + 15
      : progress?.data?.data?.length + 5;

  return (
    <LayoutOne size="large">
      <div>
        <TopBar />
        <Text as="h3">{`Data Progress ${params.projectName}`}</Text>
        <br />
        <Responsive desktop={2} justify="between" items="center">
          <Button onClick={handleClick}>Tambah Progress</Button>
          {progress?.data?.data?.length > 0 && (
            <div className="mr-5 text-right">
              <Button
                className="inline-block text-red-600 font-bold"
                onClick={handlePreview}
                color={"orange"}
              >
                Preview
              </Button>
            </div>
          )}
        </Responsive>

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
        <br />
        <div className="w-full text-center mb-10 mt-5">
          <InputText
            fullRound
            value={progress.keyword}
            placeholder="cari progress"
            fitContainer
            iconAfter={<ButtonCircle icon={<FaFilter />} />}
            onChange={(e) => {
              dispatch(setKeyword(e.target.value));
            }}
          />
        </div>
        {progress?.status === "success" ? (
          <Table
            primaryKey={"id"}
            items={progress?.data?.data}
            columns={columns}
            totalItems={totalData}
            page={progress?.currentPage}
            perPage={progress?.perPage}
            isLoading={progress?.status === "process"}
            onPageChange={(page) => dispatch(setPage(page))}
          />
        ) : (
          <LayoutOne>
            <div className="text-center py-20 my-20">
              <div className="inline-block">
                <BounceLoader color="red" />
              </div>
            </div>
          </LayoutOne>
        )}
      </div>
      <br />
      <br />
    </LayoutOne>
  );
};

export default ManagementProgress;
