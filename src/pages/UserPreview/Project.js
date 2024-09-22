import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import BounceLoader from "react-spinners/BounceLoader";
import { LayoutOne, Text, Table, InputText, ButtonCircle } from "upkit";
import FaFilter from "@meronex/icons/fa/FaFilter";
import TopBar from "../../components/TopBar";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProject,
  setKeyword,
  setPage,
} from "../../features/Projects/actions";
import { useRouteMatch } from "react-router-dom";
import ZoViewShow from "@meronex/icons/zo/ZoViewShow";
import ZoViewHide from "@meronex/icons/zo/ZoViewHide";
import { getPayment } from "../../api/payment";
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

  React.useEffect(() => {
    setStatus("process");
    dispatch(fetchProject(user.username));
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
        <div className="text-center py-20 my-20">
          <div className="inline-block">
            <BounceLoader color="red" />
          </div>
        </div>
      </LayoutOne>
    );
  }

  const totalData =
    projects?.data?.data?.length > 5
      ? projects?.data?.data?.length + 15
      : projects?.data?.data?.length

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
            value={projects.keyword}
            placeholder="cari nama project..."
            fitContainer
            iconAfter={<ButtonCircle icon={<FaFilter />} />}
            onChange={(e) => {
              dispatch(setKeyword(e.target.value));
            }}
          />
        </div>
        {projects?.status === "success" ? (
          <Table
            primaryKey={"id"}
            items={projects?.data?.data}
            columns={columns}
            totalItems={totalData}
            page={projects?.currentPage}
            perPage={projects?.perPage}
            isLoading={projects?.status === "process"}
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
    </LayoutOne>
  );
};

export default Project;
