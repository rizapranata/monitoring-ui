import React from "react";
import { ToastContainer, toast } from "react-toastify";
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
} from "upkit";
import FaFilter from "@meronex/icons/fa/FaFilter";
import FaEdit from "@meronex/icons/fa/FaEdit";
import FaTrash from "@meronex/icons/fa/FaTrash";
import { Link } from "react-router-dom";
import TopBar from "../../components/TopBar";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject } from "../../api/project";
import {
  fetchProject,
  setKeyword,
  setPage,
} from "../../features/Projects/actions";
import { useRouteMatch } from "react-router-dom";
import BiCommentDetail from "@meronex/icons/bi/BiCommentDetail";
import { getPayment, updatePayment } from "../../api/payment";
import { confirmAlert } from "react-confirm-alert";

const ManagementProject = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);
  const { params } = useRouteMatch();
  const [status, setStatus] = React.useState("process");
  const [delstatus, setDelstatus] = React.useState(0);
  const [enabled, setEnabled] = React.useState(false);
  const [payments, setPayments] = React.useState([]);
  const [settled, setSettled] = React.useState([]);
  const [updatePage, setUpdatePage] = React.useState(0);

  React.useEffect(() => {
    setStatus("process");
    dispatch(fetchProject(params.username));
    setStatus("success");
    setDelstatus(0);
  }, [dispatch, delstatus, projects.currentPage, projects.keyword]);

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

  const handleDelete = (projectId, title) => {
    confirmAlert({
      title: "KONFIRMASI HAPUS..!",
      message: `Apakah project "${title}" ingin dihapus?`,
      closeOnEscape: true,
      closeOnClickOutside: false,
      keyCodeForClose: [8, 32],
      buttons: [
        {
          label: "Ya",
          onClick: () => {
            deleteProject(parseInt(projectId));
            setDelstatus(1);
            notifDelete();
          },
        },
        {
          label: "Tidak",
          onClick: () => {},
        },
      ],
    });
  };

  const handleUpdatePayment = (projectId, payment, projName) => {
    confirmAlert({
      title: "KONFIRMASI PEMBAYARAN..!",
      message: !payment
        ? `Apakah project "${projName}" sudah lunas?`
        : `Apakah project "${projName}" belum lunas?`,
      closeOnEscape: true,
      closeOnClickOutside: false,
      keyCodeForClose: [8, 32],
      buttons: [
        {
          label: "Ya",
          onClick: () => updatePaymentData(projectId, payment),
        },
        {
          label: "Tidak",
          onClick: () => {},
        },
      ],
    });
  };

  const notifDelete = () =>
    toast.success("Hapus project berhasil!", {
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
              onClick={() => handleDelete(items.id, items.name)}
              icon={<FaTrash />}
            />
            <div className="mt-5 items-center">
              <button
                type="button"
                className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors duration-300 ${
                  checkPayment?.isSettle ? "bg-green-400" : "bg-gray-300"
                }`}
                onClick={() =>
                  handleUpdatePayment(
                    items.id,
                    checkPayment?.isSettle,
                    items.name
                  )
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

  const totalData =
    projects?.data?.data?.length >= 5
      ? projects?.data?.data?.length + 15
      : projects?.data?.data?.length + 5;

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
            value={projects.keyword}
            placeholder="cari nama project..."
            fitContainer
            iconAfter={<ButtonCircle icon={<FaFilter />} />}
            onChange={(e) => {
              dispatch(setKeyword(e.target.value));
            }}
          />
        </div>
        {projects?.data?.data?.length ? (
          <Table
            items={projects?.data?.data}
            columns={columns}
            totalItems={totalData}
            page={projects?.data?.paging.page}
            isLoading={projects.status === "process"}
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
