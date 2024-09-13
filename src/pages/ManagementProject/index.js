import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BounceLoader from "react-spinners/BounceLoader";
import {
  LayoutOne,
  Text,
  Button,
  Table,
  InputText,
  ButtonCircle,
  CardAlert,
} from "upkit";
import FaFilter from "@meronex/icons/fa/FaFilter";
import FaEdit from "@meronex/icons/fa/FaEdit";
import FaTrash from "@meronex/icons/fa/FaTrash";
import { Link } from "react-router-dom";
import TopBar from "../../components/TopBar";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../features/Products/actions";
import { deleteProject } from "../../api/project";
import { fetchProject, setKeyword } from "../../features/Projects/actions";
import { useRouteMatch } from "react-router-dom";
import BiCommentDetail from "@meronex/icons/bi/BiCommentDetail";
import { getPayment, updatePayment } from "../../api/payment";
import ToastComponent from "../../components/ToastComponent";

const ManagementProject = () => {
  const dispatch = useDispatch();
  const { params } = useRouteMatch();
  const [status, setStatus] = React.useState("process");
  const [delstatus, setDelstatus] = React.useState(0);
  const [enabled, setEnabled] = React.useState(false);
  const [payments, setPayments] = React.useState([]);
  const [settled, setSettled] = React.useState([]);
  const [updatePage, setUpdatePage] = React.useState(0);
  const projects = useSelector((state) => state.projects);
  const spesificProject =
    projects?.data.length > 0 &&
    projects?.data.filter((data) => data.usernameClient === params.username);

  React.useEffect(() => {
    setStatus("process");
    dispatch(fetchProject());
    setStatus("success");
    setDelstatus(0);
  }, [dispatch, delstatus, projects.keyword]);

  React.useEffect(() => {
    setStatus("process");
    getPayment()
      .then(({ data }) => {
        setPayments(data);
        checkPaymentIsSettled(data);
        setUpdatePage(0);
      })
      .finally(() => setStatus("success"));
  }, [enabled, updatePage]);

  const checkPaymentIsSettled = (data) => {
    const settledData = data.data.filter((data) => data.isSettle === true);
    setSettled(settledData);
  };

  const updatePaymentData = (projectId, payment) => {
    try {
      const findingByProjectId = payments?.data.find(
        (data) => data.projectId === projectId
      );
      const payload = {
        id: findingByProjectId.id,
        isSettle: !payment,
      };
      
      updatePayment(payload)
      .then(({ data }) => {
        console.log("edit result:", data);
        if (data.status === "success") {
            setEnabled(!payment);
            setUpdatePage(1);
          }
        })
        .finally(() => setStatus("idle"));
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleUpdatePayment = (projectId, payment) => {
    updatePaymentData(projectId, payment);
  };

  const notifDelete = () =>
    toast.success("Delete Success !", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const columns = [
    { Header: "Nama Project", accessor: "name" },
    { Header: "Deskripsi", accessor: "desc" },
    { Header: "Nama Client", accessor: "usernameClient" },
    {
      Header: "Action",
      accessor: (items) => {
        const checkPayment = settled.find(
          (data) => data.projectId === items.id
        );
        return (
          <div>
            <Link to={`/project/edit/${params?.username}/${items.id}`}>
              <ButtonCircle icon={<FaEdit />} />
            </Link>
            <Link
              to={`/manajement-progress/${params?.username}/${items.id}/${items.name}`}
            >
              <ButtonCircle icon={<BiCommentDetail />} />
            </Link>
            <ButtonCircle
              onClick={() => {
                if (window.confirm("Delete this product ?")) {
                  deleteProject(parseInt(items.id));
                  setDelstatus(1);
                  notifDelete();
                }
              }}
              icon={<FaTrash />}
            />
            <div className="mt-5 items-center">
              <button
                type="button"
                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 ${
                  checkPayment?.isSettle ? "bg-green-400" : "bg-gray-300"
                }`}
                onClick={() =>
                  handleUpdatePayment(items.id, checkPayment?.isSettle)
                }
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                    checkPayment?.isSettle ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className="ml-3 text-gray-500">
                {checkPayment?.isSettle ? "Sudah Lunas" : "Belum Lunas"}
              </span>
            </div>
          </div>
        );
      },
    },
  ];

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
        <Text as="h3">{`Project ${params.username}`}</Text>
        <br />
        <Link to={`/project/tambah/${params.username}`}>
          <Button>Tambah Project</Button>
        </Link>
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
        <div className="w-full text-center mb-10 mt-5">
          <InputText
            fullRound
            value={spesificProject.keyword}
            placeholder="cari nama project..."
            fitContainer
            iconAfter={<ButtonCircle icon={<FaFilter />} />}
            onChange={(e) => {
              dispatch(setKeyword(e.target.value));
            }}
          />
        </div>
        {spesificProject.length ? (
          <Table
            items={spesificProject}
            columns={columns}
            // totalItems={projects.totalItems + 15}
            // page={projects.currentPage}
            // isLoading={projects.status === "process"}
            // perPage={projects.perpage}
            onPageChange={(page) => dispatch(setPage(page))}
            primaryKey={"_id"}
          />
        ) : (
          <LayoutOne size="medium">
            <CardAlert
              title={`Data Project kosong`}
              message="Belum ada data project."
            />
          </LayoutOne>
        )}
      </div>
    </LayoutOne>
  );
};

export default ManagementProject;
