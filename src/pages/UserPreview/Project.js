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
import { setPage } from "../../features/Products/actions";
import { deleteProject } from "../../api/project";
import { fetchProject, setKeyword } from "../../features/Projects/actions";
import { useRouteMatch } from "react-router-dom";
import BiCommentDetail from "@meronex/icons/bi/BiCommentDetail";
import ZoViewShow from "@meronex/icons/zo/ZoViewShow";
import ZoViewHide from "@meronex/icons/zo/ZoViewHide";
import { getPayment, updatePayment } from "../../api/payment";
import { confirmAlert } from "react-confirm-alert";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Project = () => {
  const dispatch = useDispatch();
  const { params } = useRouteMatch();
  const [status, setStatus] = React.useState("process");
  const [delstatus, setDelstatus] = React.useState(0);
  const [enabled, setEnabled] = React.useState(false);
  const [payments, setPayments] = React.useState([]);
  const [settled, setSettled] = React.useState([]);
  const [updatePage, setUpdatePage] = React.useState(0);
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();

  const projects = useSelector((state) => state.projects);
  const spesificProject =
    projects?.data.length > 0 &&
    projects?.data.filter((data) => data.usernameClient === user.username);

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

  const handlePreview = (customer, projectId, projectName, paymentStatus) => {
    if (!paymentStatus) {
      confirmAlert({
        title: "Oops..!",
        message: `Anda belum melakukan pembayaran untuk project "${projectName}". Silahkan melakukan pembayaran dan kembali melihat progress project ini lagi. Terima kasih`,
        closeOnEscape: true,
        closeOnClickOutside: false,
        buttons: [
          {
            label: "Oke",
            onClick: () => {},
          },
        ],
      });
    } else {
      history.push(`/preview/${customer}/${projectName}/${projectId}`);
    }
  };

  const notifDelete = () =>
    toast.success("Delete project berhasil!", {
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
            <ButtonCircle
              onClick={() =>
                handlePreview(
                  items.usernameClient,
                  items.id,
                  items.name,
                  checkPayment?.isSettle
                )
              }
              icon={checkPayment?.isSettle ? <ZoViewShow /> : <ZoViewHide />}
            />
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
        <Text as="h3">{`Project ${user.name}`}</Text>
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

export default Project;
